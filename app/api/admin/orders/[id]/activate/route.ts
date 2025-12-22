import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin_token')?.value;
    const payload = await verifyAdminToken(token || '');

    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Update order delivery status
    const order = await prisma.order.update({
      where: { id: params.id },
      data: {
        deliveryStatus: 'completed',
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        deliveryStatus: true,
      },
    });

    // TODO: Send email confirmation to customer with subscription details

    return NextResponse.json(
      {
        message: 'Order marked as delivered',
        order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Order activation error:', error);
    return NextResponse.json(
      { error: 'Failed to activate order' },
      { status: 500 }
    );
  }
}
