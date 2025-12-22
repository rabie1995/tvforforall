import { NextRequest, NextResponse } from 'next/server';
import { getClientData } from '@/lib/clientData';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';

    // Fetch client data
    const result = await getClientData({
      page,
      limit,
      search,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Clients fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}
