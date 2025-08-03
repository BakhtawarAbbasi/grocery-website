'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

type Category =
  | 'Tea'
  | 'Butter Eggs'
  | 'Herbal Tea'
  | 'Vegetables'
  | 'Fresh Meat'
  | 'Footwear'
  | 'Fruits & Veggies';

interface Product {
  id: number;
  productName: string;
  price: string;
  oldPrice: string;
  image: string;
  category: Category;
  rating: number;
}

const categories: { name: Category; image: string }[] = [
  { name: 'Tea', image: '/categories/b-card1.jpeg' },
  { name: 'Butter Eggs', image: '/categories/b-card1.jpeg' },
  { name: 'Herbal Tea', image: '/categories/b-card2.jpeg' },
  { name: 'Vegetables', image: '/categories/b-card3.jpeg' },
  { name: 'Fresh Meat', image: '/categories/b-card4.jpeg' },
  { name: 'Footwear', image: '/categories/b-card5.jpeg' },
  { name: 'Fruits & Veggies', image: '/categories/b-card6.jpeg' },
];

const FeaturedProducts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Tea');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();

        const fixedImageProducts = data.map((p: Product) => ({
          ...p,
          image: p.image.startsWith('http')
            ? p.image
            : `https://api-for-ecommerce-website.onrender.com${p.image}`,
        }));

        setAllProducts(fixedImageProducts);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = allProducts.filter(
    (product) => product.category === selectedCategory
  );

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.productName,
      price: parseFloat(product.price),
      quantity: 1,
      image: product.image,
    });

    setShowSuccess(true);

    //  Reset timer if already exists
    if ((window as any).successTimer) {
      clearTimeout((window as any).successTimer);
    }

    //  Set new timer
    (window as any).successTimer = setTimeout(() => setShowSuccess(false), 3000);

    //  Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-12 px-6 lg:px-40">
      {/*  Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-100 border border-green-300 text-green-800 text-sm font-medium px-4 py-2 rounded shadow-sm text-center animate-fade-in">
           Item added to cart successfully!
        </div>
      )}

      {/*  Category Filter */}
      <div className="bg-black rounded-lg p-6 flex justify-center gap-6 mb-10 flex-wrap">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex flex-col items-center cursor-pointer transition ${
              selectedCategory === cat.name ? 'scale-105' : 'opacity-80'
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-white p-2 flex items-center justify-center shadow-md">
              <img src={cat.image} alt={cat.name} className="w-10 h-10 object-contain" />
            </div>
            <span className="text-white text-sm mt-2 text-center">{cat.name}</span>
          </div>
        ))}
      </div>

      {/*  Section Headings */}
      <h4 className="text-center text-lg font-bold text-green-600">Our Products</h4>
      <h2 className="text-center text-3xl font-bold mb-8">Featured Products</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300 bg-white relative"
          >
            <div
              onClick={() => router.push(`/product/${product.id}`)}
              className="cursor-pointer"
            >
              <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                Sale
              </div>

              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              <h3 className="text-md font-semibold mb-1">{product.productName}</h3>

              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < product.rating ? 'text-yellow-400' : 'text-gray-300'
                    } fill-current`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.567-.955L10 0l2.945 5.955 6.567.955-4.756 4.635 1.122 6.545z" />
                  </svg>
                ))}
              </div>

              <div className="flex gap-2 items-center mb-4">
                <span className="text-green-600 font-bold">{product.price}</span>
                <span className="line-through text-gray-400 text-sm">{product.oldPrice}</span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
            >
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
