import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api-for-ecommerce-website.onrender.com/products', {
      cache: 'no-store',
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
