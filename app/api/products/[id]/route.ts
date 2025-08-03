import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const res = await fetch(
      `https://api-for-ecommerce-website.onrender.com/products/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const data = await res.json();
    const fixedData = {
      ...data,
      image: data.image.startsWith("http")
        ? data.image
        : `https://api-for-ecommerce-website.onrender.com${data.image}`,
    };

    return NextResponse.json(fixedData);
  } catch (error) {
    console.error("❌ Error fetching product by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
