export const runtime = "nodejs";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { collectClientData } from '@/lib/clientData';
import { plans } from '@/lib/plans';

const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY;
const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const PAY_CURRENCY = process.env.NOWPAYMENTS_PAY_CURRENCY || 'usdt';
const PRICE_CURRENCY = process.env.NOWPAYMENTS_PRICE_CURRENCY || 'usd';
const INVOICE_ENDPOINT = 'https://api.nowpayments.io/v1/invoice';

const legacyPlanMap: Record<string, string> = {
  '3m': 'plan_3m',
  '6m': 'plan_6m',
  '1y': 'plan_12m',
};

interface CheckoutRequest {
  fullName: string;
  email: string;
  region: string;
  adultChannels: boolean;
  plan: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();

    // Validate required fields
    const { fullName, email, region, adultChannels, plan: rawPlan } = body;
    const plan = legacyPlanMap[rawPlan] || rawPlan;

    if (!fullName?.trim()) {
      return NextResponse.json(
        { error: 'Full name is required' },
        { status: 400 }
      );
    }

    if (!email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    if (!region?.trim()) {
      return NextResponse.json(
        { error: 'Region is required' },
        { status: 400 }
      );
    }

    const planMeta = plans.find(p => p.id === plan);

    if (!planMeta) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    if (!NOWPAYMENTS_API_KEY) {
      console.error('Checkout error: NOWPAYMENTS_API_KEY missing');
      return NextResponse.json(
        { error: 'Payment provider is not configured. Please try again later.' },
        { status: 500 }
      );
    }

    const productId = plan;

    // Ensure product exists to avoid foreign key errors (auto-heal if seed was missed)
    await prisma.product.upsert({
      where: { id: productId },
      update: {
        name: planMeta.name,
        priceUsd: planMeta.priceUsd,
        durationDays: planMeta.durationMonths * 30,
        active: true,
      },
      create: {
        id: productId,
        name: planMeta.name,
        description: planMeta.perks.join(', '),
        priceUsd: planMeta.priceUsd,
        durationDays: planMeta.durationMonths * 30,
        active: true,
      },
    });

    // Collect client data (fail gracefully if validation fails)
    const collected = await collectClientData({
      fullName,
      email,
      region,
      source: 'checkout',
    });

    if (!collected.success) {
      return NextResponse.json(
        { error: collected.error || 'Could not save your details. Please try again.' },
        { status: 400 }
      );
    }

    // Create order in database
    const order = await prisma.order.create({
      data: {
        fullName,
        email,
        region,
        adultChannels,
        productId,
        paymentStatus: 'pending',
        deliveryStatus: 'pending',
      },
    });

    // Build invoice payload for NOWPayments
    const payload = {
      price_amount: planMeta.priceUsd,
      price_currency: PRICE_CURRENCY,
      pay_currency: PAY_CURRENCY,
      order_id: order.id,
      order_description: `${planMeta.name} subscription`,
      ipn_callback_url: `${SITE_URL}/api/webhooks/nowpayments`,
      success_url: `${SITE_URL}/checkout/success?orderId=${order.id}`,
      cancel_url: `${SITE_URL}/checkout/cancel?orderId=${order.id}`,
    };

    console.log('🔵 [CHECKOUT] Creating NOWPayments invoice...');
    console.log('🔵 [CHECKOUT] Payload:', JSON.stringify(payload, null, 2));
    console.log('🔵 [CHECKOUT] API Key present:', !!NOWPAYMENTS_API_KEY);
    console.log('🔵 [CHECKOUT] Endpoint:', INVOICE_ENDPOINT);

    const invoiceRes = await fetch(INVOICE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': NOWPAYMENTS_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const invoiceBody = await invoiceRes.json().catch(() => ({}));
    
    console.log('🔵 [CHECKOUT] NOWPayments Response Status:', invoiceRes.status);
    console.log('🔵 [CHECKOUT] Response OK:', invoiceRes.ok);
    console.log('🔵 [CHECKOUT] Response Body:', JSON.stringify(invoiceBody, null, 2));

    if (!invoiceRes.ok) {
      console.error('❌ [CHECKOUT] NOWPayments API Error:', {
        status: invoiceRes.status,
        statusText: invoiceRes.statusText,
        body: invoiceBody,
      });
      const message = invoiceBody.message || invoiceBody.error || 'Failed to create invoice';
      return NextResponse.json(
        { error: `Payment provider error: ${message}` },
        { status: 502 }
      );
    }

    if (!invoiceBody.invoice_url) {
      console.error('❌ [CHECKOUT] No invoice_url in response:', invoiceBody);
      return NextResponse.json(
        { error: 'Payment link unavailable - please contact support' },
        { status: 502 }
      );
    }

    // Persist NOWPayments invoice id on order
    const nowpaymentsId = String(invoiceBody.id || invoiceBody.invoice_id || order.id);
    await prisma.order.update({
      where: { id: order.id },
      data: { nowpaymentsId },
    });

    console.log('✅ [CHECKOUT] Order created successfully:', {
      orderId: order.id,
      nowpaymentsId,
      invoice_url: invoiceBody.invoice_url,
    });

    return NextResponse.json(
      {
        orderId: order.id,
        paymentLink: invoiceBody.invoice_url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Checkout failed. Please retry in a moment.' },
      { status: 500 }
    );
  }
}
