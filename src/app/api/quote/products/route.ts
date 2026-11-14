import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase/admin';
import type { Product } from '@/lib/db/types';
import { isQuoteEnabled } from '@/lib/db/settings';

const PAGE_SIZE = 24;

export async function GET(request: NextRequest) {
  try {
    if (!(await isQuoteEnabled())) {
      return NextResponse.json({ error: 'Quotation builder is temporarily unavailable.' }, { status: 404 });
    }

    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ error: 'Product database is unavailable' }, { status: 503 });
    }

    const params = request.nextUrl.searchParams;
    const page = Math.max(1, Number(params.get('page') || 1));
    const pageSize = Math.min(48, Math.max(1, Number(params.get('pageSize') || PAGE_SIZE)));
    const category = params.get('category') || 'all';
    const stock = params.get('stock') || 'all';

    let query = db.collection('products').where('isActive', '==', true);
    if (category !== 'all') query = query.where('categoryId', '==', category) as typeof query;
    if (stock !== 'all') query = query.where('stock.status', '==', stock) as typeof query;

    const [countSnapshot, productsSnapshot] = await Promise.all([
      query.count().get(),
      query.offset((page - 1) * pageSize).limit(pageSize).get(),
    ]);

    const products: Product[] = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Product, 'id'>),
    }));
    const total = countSnapshot.data().count;

    return NextResponse.json({
      products,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      },
    });
  } catch (error) {
    const value = error as { code?: unknown; details?: unknown };
    const isQuotaError = value.code === 8 || value.details === 'Quota exceeded.';
    const message = isQuotaError
      ? 'The product catalog is temporarily unavailable because the Firestore read quota has been exceeded.'
      : 'The product catalog could not be loaded.';
    console.warn(`Quote product query failed: ${message}`);
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
