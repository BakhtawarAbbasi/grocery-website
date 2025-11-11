// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useCart } from '@/context/CartContext';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';

// type Category =
//   | 'Tea'
//   | 'Butter Eggs'
//   | 'Herbal Tea'
//   | 'Vegetables'
//   | 'Fresh Meat'
//   | 'Footwear'
//   | 'Fruits & Veggies';

// interface Product {
//   id: number;
//   productName: string;
//   price: string;
//   oldPrice: string;
//   image: string;
//   category: Category;
//   rating: number;
// }

// const categories: { name: Category; image: string }[] = [
//   { name: 'Tea', image: '/categories/b-card1.jpeg' },
//   { name: 'Butter Eggs', image: '/categories/b-card1.jpeg' },
//   { name: 'Herbal Tea', image: '/categories/b-card2.jpeg' },
//   { name: 'Vegetables', image: '/categories/b-card3.jpeg' },
//   { name: 'Fresh Meat', image: '/categories/b-card4.jpeg' },
//   { name: 'Footwear', image: '/categories/b-card5.jpeg' },
//   { name: 'Fruits & Veggies', image: '/categories/b-card6.jpeg' },
// ];

// const FeaturedProducts: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState<Category>('Tea');
//   const [allProducts, setAllProducts] = useState<Product[]>([]);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const { addToCart } = useCart();
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch('/api/products');
//         const data = await res.json();

//         const fixedImageProducts = data.map((p: Product) => ({
//           ...p,
//           image: p.image.startsWith('http')
//             ? p.image
//             : `https://api-for-ecommerce-website.onrender.com${p.image}`,
//         }));

//         setAllProducts(fixedImageProducts);
//       } catch (err) {
//         console.error('Failed to fetch products:', err);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const filteredProducts = allProducts.filter(
//     (product) => product.category === selectedCategory
//   );

//   const handleAddToCart = (product: Product) => {
//     addToCart({
//       id: product.id,
//       name: product.productName,
//       price: parseFloat(product.price),
//       quantity: 1,
//       image: product.image,
//     });

//     setShowSuccess(true);

//     if (window.successTimer) {
//       clearTimeout(window.successTimer);
//     }

//     window.successTimer = setTimeout(() => setShowSuccess(false), 3000);

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="px-6 py-12 lg:px-40">
//       {showSuccess && (
//         <div className="px-4 py-2 mb-6 text-sm font-medium text-center text-green-800 bg-green-100 border border-green-300 rounded shadow-sm animate-fade-in">
//           Item added to cart successfully!
//         </div>
//       )}

//       {/* Category Filter */}
//       <div className="flex flex-wrap justify-center gap-6 p-6 mb-10 bg-black rounded-lg">
//         {categories.map((cat, index) => (
//           <div
//             key={index}
//             onClick={() => setSelectedCategory(cat.name)}
//             className={`flex flex-col items-center cursor-pointer transition ${
//               selectedCategory === cat.name ? 'scale-105' : 'opacity-80'
//             }`}
//           >
//             <div className="flex items-center justify-center w-16 h-16 p-2 bg-white rounded-full shadow-md">
//               <Image
//                 src={cat.image}
//                 alt={cat.name}
//                 width={40}
//                 height={40}
//                 className="object-contain w-10 h-10"
//               />
//             </div>
//             <span className="mt-2 text-sm text-center text-white">{cat.name}</span>
//           </div>
//         ))}
//       </div>

//       {/* Section Headings */}
//       <h4 className="text-lg font-bold text-center text-green-600">Our Products</h4>
//       <h2 className="mb-8 text-3xl font-bold text-center">Featured Products</h2>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {filteredProducts.map((product) => (
//           <div
//             key={product.id}
//             className="relative p-4 transition duration-300 bg-white border shadow-md rounded-xl hover:shadow-lg"
//           >
//             <div
//               onClick={() => router.push(`/product/${product.id}`)}
//               className="cursor-pointer"
//             >
//               <div className="absolute px-2 py-1 text-xs font-bold text-white bg-green-600 rounded top-2 left-2">
//                 Sale
//               </div>

//               <Image
//                 src={product.image}
//                 alt={product.productName}
//                 width={400}
//                 height={160}
//                 className="object-cover w-full h-40 mb-4 rounded-lg"
//               />

//               <h3 className="mb-1 font-semibold text-md">{product.productName}</h3>

//               <div className="flex items-center mb-2">
//                 {[...Array(5)].map((_, i) => (
//                   <svg
//                     key={i}
//                     className={`w-4 h-4 ${
//                       i < product.rating ? 'text-yellow-400' : 'text-gray-300'
//                     } fill-current`}
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.567-.955L10 0l2.945 5.955 6.567.955-4.756 4.635 1.122 6.545z" />
//                   </svg>
//                 ))}
//               </div>

//               <div className="flex items-center gap-2 mb-4">
//                 <span className="font-bold text-green-600">{product.price}</span>
//                 <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>
//               </div>
//             </div>

//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleAddToCart(product);
//               }}
//               className="w-full py-2 text-white transition bg-green-700 rounded hover:bg-green-800"
//             >
//               🛒 Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeaturedProducts;

'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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

    if (window.successTimer) {
      clearTimeout(window.successTimer);
    }

    window.successTimer = setTimeout(() => setShowSuccess(false), 3000);

    //window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-12 px-6 lg:px-40 bg-[#FAF5FF] min-h-screen">
      {showSuccess && (
        <div className="px-4 py-2 mb-6 text-sm font-medium text-center text-green-800 bg-green-100 border border-green-300 rounded shadow-sm animate-fade-in">
          Item added to cart successfully!
        </div>
      )}

      {/* Category Filter */}
      <div className="bg-[#581C87] rounded-lg p-6 flex justify-center gap-6 mb-10 flex-wrap">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex flex-col items-center cursor-pointer transition ${
              selectedCategory === cat.name ? 'scale-105' : 'opacity-80'
            }`}
          >
            <div className="flex items-center justify-center w-16 h-16 p-2 bg-white rounded-full shadow-md">
              <Image
                src={cat.image}
                alt={cat.name}
                width={40}
                height={40}
                className="object-contain w-10 h-10"
              />
            </div>
            <span className="mt-2 text-sm text-center text-white">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Section Headings */}
      <h4 className="text-center text-lg font-bold text-[#581C87]">Our Products</h4>
      <h2 className="text-center text-3xl font-bold mb-8 text-[#1F2937]">
        Featured Products
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="relative p-4 transition duration-300 bg-white border shadow-md rounded-xl hover:shadow-lg"
          >
            <div
              onClick={() => router.push(`/product/${product.id}`)}
              className="cursor-pointer"
            >
              <div className="absolute top-2 left-2 bg-[#9333EA] text-white text-xs font-bold px-2 py-1 rounded">
                Sale
              </div>

              <Image
                src={product.image}
                alt={product.productName}
                width={400}
                height={160}
                className="object-cover w-full h-40 mb-4 rounded-lg"
              />

              <h3 className="text-md font-semibold mb-1 text-[#1F2937]">
                {product.productName}
              </h3>

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

              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#581C87] font-bold">{product.price}</span>
                <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
              className="w-full bg-[#581C87] text-white py-2 rounded hover:bg-[#9333EA] transition"
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
