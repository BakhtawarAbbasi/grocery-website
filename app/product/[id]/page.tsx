'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Star, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

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
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        const fixedData: Product = {
          ...data,
          image: data.image.startsWith('http')
            ? data.image
            : `https://api-for-ecommerce-website.onrender.com${data.image}`,
        };

        setProduct(fixedData);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.productName,
      price: product.price,
      quantity,
      image: product.image,
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!product) return <div className="py-10 text-center">Loading...</div>;

  const ratingValue = parseFloat(product.rating);
  const fullStars = Math.floor(ratingValue);
  const hasHalfStar = ratingValue % 1 >= 0.5;

  return (
    <section className="container px-4 py-12 mx-auto sm:px-6 lg:px-8">
      {/* ✅ Animated Success Message */}
      <div className="relative h-10">
        <div
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out
            ${showSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'}
            bg-green-100 border border-green-300 text-green-800 text-sm font-medium px-4 py-2 rounded shadow text-center`}
        >
          ✅ Item added to cart successfully!
        </div>
      </div>

      <div className="flex flex-col gap-12 lg:flex-row">
        {/* ✅ Product Image */}
        <div className="w-full lg:w-1/2">
          <div className="p-6 overflow-hidden bg-white shadow-md rounded-2xl">
            <div className="flex items-center justify-center w-full aspect-square bg-gray-50">
              <Image
                src={product.image}
                alt={product.productName}
                width={500}
                height={500}
                className="w-full h-full object-contain max-h-[450px] rounded-xl transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>

        {/* ✅ Product Details */}
        <div className="w-full space-y-6 lg:w-1/2">
          <div>
            <span className="px-3 py-1 text-sm font-semibold tracking-wide text-green-700 uppercase bg-green-100 rounded-full">
              {product.category}
            </span>
            <h1 className="mt-3 text-4xl font-bold text-gray-900">
              {product.productName}
            </h1>
          </div>

          <p className="text-base leading-relaxed text-gray-600">
            {product.description}
          </p>

          <div className="text-3xl font-bold text-green-700">
            Rs. {product.price.toLocaleString()}
          </div>

          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < fullStars || (i === fullStars && hasHalfStar)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {ratingValue.toFixed(1)}
            </span>
          </div>

          {/* ✅ Quantity + Cart */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-gray-600 transition hover:text-green-700"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-2 text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-gray-600 transition hover:text-green-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition bg-green-600 rounded-md hover:bg-green-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
