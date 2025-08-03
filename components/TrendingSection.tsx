'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation'; 

const tabs = ['Trending', 'Fish & Meat', 'Organic'] as const;
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
    <section className="py-12 px-4 md:px-20 lg:px-40 relative">
      {showSuccess && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 transition-all">
          ✅ Product added to cart successfully!
        </div>
      )}

      <div className="text-center mb-10">
        <p className="text-green-600 text-sm font-semibold">🍀 Our Products</p>
        <h2 className="text-3xl font-bold text-gray-800">Trending Products</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        <div className="bg-black text-white p-6 rounded-xl min-h-[350px] relative overflow-hidden flex flex-col">
          <div>
            <p className="text-sm mb-2 text-yellow-500">Get 20% Discount</p>
            <h3 className="text-lg font-bold mb-4 leading-tight">
              Online grocery <br /> shopping is thriving
            </h3>
            <button className="bg-yellow-500 mx-auto text-center text-black font-sm px-2 py-1 rounded-md hover:bg-yellow-500">
              View All
            </button>
          </div>
          <Image
            src="/images/promo-veg.jpeg"
            alt="Promo"
            width={400}
            height={400}
            className="absolute bottom-0 right-0 w-full h-full object-cover opacity-25 rounded-xl"
          />
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setStartIndex(0);
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    activeTab === tab
                      ? 'bg-green-800 text-white'
                      : 'bg-white border text-gray-700'
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.slice(startIndex, startIndex + 3).map((product) => (
              <div
                key={product.id}
                className="bg-white border border-yellow-100 shadow rounded-xl p-4 hover:shadow-md transition"
              >
                <span className="bg-yellow-100 text-green-800 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
                  Sale
                </span>

                {/*  Image */}
                <div
                  className="h-32 flex justify-center items-center mb-4 cursor-pointer"
                  onClick={() => goToDetailPage(product.id)}
                >
                  <Image
                    src={`https://api-for-ecommerce-website.onrender.com${product.image}`}
                    alt="product imgae"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>


                <h4 className="text-md font-semibold mb-1">{product.productName}</h4>
                
                {/* price */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-700 font-bold">{product.price}</span>
                  <span className="line-through text-sm text-gray-400">{product.oldPrice}</span>
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

                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-2 w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
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
