'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Star, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

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

  if (!product) return <div className="text-center py-10">Loading...</div>;

  const ratingValue = parseFloat(product.rating);
  const fullStars = Math.floor(ratingValue);
  const hasHalfStar = ratingValue % 1 >= 0.5;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ✅ Animated Success Message */}
      <div className="h-10 relative">
        <div
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out
            ${showSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'}
            bg-green-100 border border-green-300 text-green-800 text-sm font-medium px-4 py-2 rounded shadow text-center`}
        >
          ✅ Item added to cart successfully!
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden p-6">
            <div className="aspect-square w-full bg-gray-50 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-full object-contain max-h-[450px] rounded-xl transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div>
            <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full uppercase tracking-wide">
              {product.category}
            </span>
            <h1 className="mt-3 text-4xl font-bold text-gray-900">
              {product.productName}
            </h1>
          </div>

          <p className="text-gray-600 text-base leading-relaxed">
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
            <span className="text-sm text-gray-500 ml-2">
              {ratingValue.toFixed(1)}
            </span>
          </div>

          {/* Quantity + Cart */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-md">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-gray-600 hover:text-green-700 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-2 text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-gray-600 hover:text-green-700 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
