export const runtime = "nodejs";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { collectClientData } from '@/lib/clientData';
import { plans } from '@/lib/plans';

// Static NOWPayments invoice links - Production Ready
// These are pre-created invoice IDs that work without API configuration
const NOWPAYMENTS_INVOICE_LINKS: Record<string, string> = {
  'plan_3m': 'https://nowpayments.io/payment/?iid=6334134208',
  'plan_6m': 'https://nowpayments.io/payment/?iid=6035616621',
  'plan_12m': 'https://nowpayments.io/payment/?iid=5981936582',
};

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

    // Get static invoice link for this plan
    const invoiceUrl = NOWPAYMENTS_INVOICE_LINKS[plan];
    
    if (!invoiceUrl) {
      console.error('❌ [CHECKOUT] No invoice link configured for plan:', plan);
      return NextResponse.json(
        { error: 'Payment link not available for this plan' },
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

    console.log('✅ [CHECKOUT] Order created:', {
      orderId: order.id,
      plan: plan,
      email: email,
      invoiceUrl: invoiceUrl,
    });

    return NextResponse.json(
      {
        orderId: order.id,
        paymentLink: invoiceUrl,
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
