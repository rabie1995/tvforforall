import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {

    // Fetch all orders
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        region: true,
        productId: true,
        adultChannels: true,
        paymentStatus: true,
        deliveryStatus: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
