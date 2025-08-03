import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api-for-ecommerce-website.onrender.com/products', {
      cache: 'no-store',
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error fetching products:', error); // ✅ ESLint happy + helpful logs
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
