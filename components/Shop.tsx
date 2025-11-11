'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

type Product = {
  id: number;
  productName: string;
  image: string;
  price: number;
  category: string;
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { addToCart } = useCart();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = activeCategory
    ? products.filter((product) =>
        product.category?.toLowerCase() === activeCategory.toLowerCase()
      )
    : products;

  const categories = [
    { name: 'Tea', img: '/categories/b-card1.jpeg', value: 'Tea' },
    { name: 'Masala', img: '/categories/b-card2.jpeg', value: 'Masala' },
    { name: 'DRINKS', img: '/categories/b-card3.jpeg', value: 'drinks' },
    { name: 'FRESH NUTS', img: '/categories/b-card4.jpeg', value: 'nuts' },
    { name: 'FRESH FISH', img: '/categories/b-card5.jpeg', value: 'fish' },
    { name: 'Footwear', img: '/categories/b-card6.jpeg', value: 'meat' },
  ];

  return (
    <main className="pb-16 space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white bg-gradient-to-r from-[#581C87] to-[#9333EA]">
        <div className="container flex flex-col items-center justify-between gap-10 px-6 py-16 mx-auto md:py-24 md:flex-row">
          <div className="z-10 flex-1 space-y-6">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              HEALTHY AND FRESH <span className="text-yellow-300">GROCERY</span>
            </h1>
            <p className="max-w-lg text-lg text-purple-100">
              We pride ourselves on providing a curated selection of the finest, nutrient-rich products that cater to your health-conscious lifestyle.
            </p>
            <button className="px-6 py-3 mt-4 font-bold text-[#581C87] transition duration-300 transform bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-300 hover:scale-105">
              Shop Now
            </button>
          </div>
          <div className="relative z-10 flex-1">
            <Image
              src="/images/product-bg.png"
              alt="Grocery Banner"
              width={600}
              height={500}
              className="object-contain w-full h-auto rounded-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="container px-6 mx-auto space-y-8 text-center md:px-20">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-[#1F2937]">Shop By Category</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Discover our wide range of fresh and healthy products
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 md:gap-6 justify-items-center">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() =>
                setActiveCategory(cat.value === activeCategory ? null : cat.value)
              }
              className={`flex flex-col items-center p-4 rounded-xl w-full transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-[#F3E8FF] border-2 border-[#9333EA]'
                  : 'bg-white hover:bg-[#FAF5FF] border border-gray-200'
              }`}
            >
              <div className="p-3 mb-3 bg-[#F3E8FF] rounded-full">
                <Image
                  src={cat.img}
                  alt="image"
                  width={60}
                  height={60}
                  className="object-cover w-12 h-12 rounded-full md:w-14 md:h-14"
                />
              </div>
              <p className="font-semibold text-[#1F2937]">{cat.name}</p>
            </button>
          ))}
        </div>

        {activeCategory && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setActiveCategory(null)}
              className="text-sm text-[#581C87] underline transition hover:text-[#4B1B7C]"
            >
              Clear Filter
            </button>
          </div>
        )}
      </section>

      {/* Featured Products Section */}
      <section className="container px-6 mx-auto md:px-20">
        <div className="mb-10 space-y-4 text-center">
          <h2 className="text-3xl font-bold text-[#1F2937]">Featured Products</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Fresh and organic products delivered to your doorstep
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden bg-white shadow-md rounded-xl animate-pulse"
              >
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                  <div className="h-8 mt-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts
                .slice(0, showAll ? filteredProducts.length : 8)
                .map((product) => (
                  <Link
                    href={`/product/${product.id}`}
                    key={product.id}
                    className="block overflow-hidden transition duration-300 transform bg-white shadow-md rounded-xl hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative w-full h-48">
                      <Image
                        src={`https://api-for-ecommerce-website.onrender.com${product.image}`}
                        alt="product image"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-bold text-[#1F2937]">{product.productName}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-[#581C87]">
                          ${product.price}
                        </span>
                        <span className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart({
                            id: product.id,
                            name: product.productName,
                            price: product.price,
                            quantity: 1,
                            image: product.image,
                          });
                          setShowMessage(true);
                          setTimeout(() => setShowMessage(false), 3000);
                        }}
                        className="flex items-center justify-center w-full px-4 py-2 mt-4 space-x-2 font-semibold text-white transition duration-300 bg-[#9333EA] rounded-lg hover:bg-[#7E22CE]"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </Link>
                ))}
            </div>

            {!showAll && filteredProducts.length > 8 && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowAll(true)}
                  className="px-6 py-2 font-semibold text-white transition bg-[#581C87] rounded hover:bg-[#4B1B7C]"
                >
                  View All Products
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ✅ Toast Message */}
      {showMessage && (
        <div className="fixed z-50 px-4 py-2 text-white transition-opacity duration-300 bg-[#581C87] rounded-lg shadow-lg bottom-5 right-5">
          ✅ Your item has been added to cart!
        </div>
      )}
    </main>
  );
}
