"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Star,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface Product {
  id: number;
  rating: string;
  image: string;
  price: number;
  description: string;
  category: string;
  productName: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const fixedData: Product = {
          ...data,
          image: data.image?.startsWith("http")
            ? data.image
            : `https://api-for-ecommerce-website.onrender.com${
                data.image.startsWith("/") ? data.image : "/" + data.image
              }`,
        };

        setProduct(fixedData);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="py-10 text-center">Loading...</div>;

  const ratingValue = parseFloat(product.rating);
  const fullStars = Math.floor(ratingValue);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.productName,
      price: product.price,
      quantity,
      image: product.image,
    });
  };

  return (
    <section className="container px-4 py-12 mx-auto lg:px-20">
      <div className="flex flex-col items-start gap-12 lg:flex-row">
        
        {/* ✅ Product Image */}
        <div className="w-full lg:w-1/2">
          <div className="flex items-center justify-center p-10 shadow bg-purple-50 rounded-2xl">
            <Image
              src={product.image}
              alt={product.productName}
              width={500}
              height={500}
              className="object-contain max-h-[350px]"
            />
          </div>
        </div>

        {/* ✅ Product Info */}
        <div className="w-full space-y-6 lg:w-1/2">
          <span className="px-3 py-1 mb-3 font-semibold tracking-wide text-purple-600 uppercase bg-purple-100 rounded-full tb-3ext-xs">
            {product.category}
          </span>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            {product.productName}
          </h1>

          {/* ⭐ Rating */}
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < fullStars
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-600">
              {ratingValue.toFixed(1)} | 100 reviews
            </span>
          </div>

          {/* 💰 Price */}
          <div className="text-3xl font-bold text-purple-600">
            Rs. {product.price}
          </div>

          {/* 📝 Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Description</h2>
            <p className="mt-1 text-gray-600">{product.description}</p>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-gray-600 hover:text-purple-600"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-gray-600 hover:text-purple-600"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-6 py-3 font-medium text-white transition rounded-lg shadow bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
          </div>

          {/* Delivery & Returns */}
          <div className="flex items-center gap-8 pt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-purple-500" />
              Delivery in 2 days
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-purple-500" />
              Easy returns
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
