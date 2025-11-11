'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const tabs = ['Trending'] as const;
type Tab = (typeof tabs)[number];

interface Product {
  id: number;
  productName: string;
  image: string;
  price: string;
  oldPrice: string;
  rating: number;
}

const TrendingSection = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Trending');
  const [startIndex, setStartIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleNext = () => {
    if (startIndex + 3 < products.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.productName,
      price: parseFloat(product.price),
      quantity: 1,
      image: product.image,
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const goToDetailPage = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  return (
    <section className="py-12 px-4 md:px-20 lg:px-40 relative bg-[#FAF5FF]">
      {showSuccess && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-[#581C87] text-white px-4 py-2 rounded shadow-lg z-50 transition-all">
          ✅ Product added to cart successfully!
        </div>
      )}

      <div className="mb-10 text-center">
        <p className="text-[#9333EA] text-sm font-semibold">🍀 Our Products</p>
        <h2 className="text-3xl font-bold text-[#1F2937]">Trending Products</h2>
      </div>

      <div className="grid items-start grid-cols-1 gap-6 md:grid-cols-4">
        {/* Promo Card */}
        <div className="bg-[#581C87] text-white p-6 rounded-xl min-h-[350px] relative overflow-hidden flex flex-col">
          <div>
            <p className="mb-2 text-sm text-yellow-300">Get 20% Discount</p>
            <h3 className="mb-4 text-lg font-bold leading-tight">
              Online grocery <br /> shopping is thriving
            </h3>
            <button className="px-2 py-1 mx-auto text-center text-black bg-yellow-400 rounded-md font-sm hover:bg-yellow-500">
              View All
            </button>
          </div>
          <Image
            src="/images/promo-veg.jpeg"
            alt="Promo"
            width={400}
            height={400}
            className="absolute bottom-0 right-0 object-cover w-full h-full opacity-20 rounded-xl"
          />
        </div>

        {/* Product Tabs and Cards */}
        <div className="space-y-6 md:col-span-3">
          {/* Tabs and Arrows */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setStartIndex(0);
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    activeTab === tab
                      ? 'bg-[#581C87] text-white'
                      : 'bg-white border border-[#581C87] text-[#581C87]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                <span>⬅️</span>
              </button>
              <button
                onClick={handleNext}
                className="p-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                <span>➡️</span>
              </button>
            </div>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {products.slice(startIndex, startIndex + 3).map((product) => (
              <div
                key={product.id}
                className="p-4 transition bg-white border border-purple-100 shadow rounded-xl hover:shadow-md"
              >
                <span className="bg-purple-100 text-[#581C87] text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
                  Sale
                </span>

                {/* Image */}
                <div
                  className="flex items-center justify-center h-32 mb-4 cursor-pointer"
                  onClick={() => goToDetailPage(product.id)}
                >
                  <Image
                    src={`https://api-for-ecommerce-website.onrender.com${product.image}`}
                    alt={product.productName}
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div>

                <h4 className="text-md font-semibold mb-1 text-[#1F2937]">
                  {product.productName}
                </h4>

                {/* Price */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#581C87] font-bold">{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">
                    {product.oldPrice}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < product.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.567-.955L10 0l2.945 5.955 6.567.955-4.756 4.635 1.122 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-2 w-full bg-[#581C87] text-white py-2 rounded hover:bg-purple-800 transition"
                >
                  🛒 Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
