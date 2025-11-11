// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";

// interface Product {
//   id: number;
//   productName: string;
//   price: number;
//   image: string;
//   category: string;
// }

// interface RelatedProductsProps {
//   category: string;
//   currentProductId: number;
// }

// export default function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
//   const [related, setRelated] = useState<Product[]>([]);

//   useEffect(() => {
//     const fetchRelated = async () => {
//       try {
//         const res = await fetch("https://api-for-ecommerce-website.onrender.com/products");
//         const data: Product[] = await res.json();

//         // ✅ Filter only same category & exclude current product
//         const filtered = data
//           .filter(
//             (p) =>
//               p.category.toLowerCase() === category.toLowerCase() &&
//               p.id !== currentProductId
//           )
//           .map((p) => ({
//             ...p,
//             image: p.image.startsWith("http")
//               ? p.image
//               : `https://api-for-ecommerce-website.onrender.com${p.image}`,
//           }));

//         setRelated(filtered);
//       } catch (error) {
//         console.error("Error fetching related products:", error);
//       }
//     };

//     fetchRelated();
//   }, [category, currentProductId]);

//   if (related.length === 0) {
//     return null; // agar related products na ho to section hide
//   }

//   return (
//     <div className="mt-10">
//       <h2 className="mb-6 text-2xl font-semibold">Related Products</h2>
//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {related.map((product) => (
//           <div
//             key={product.id}
//             className="p-4 transition border shadow-md rounded-xl hover:shadow-lg"
//           >
//             <div className="relative w-full h-40">
//               <Image
//                 src={product.image}
//                 alt={product.productName}
//                 fill
//                 className="object-contain rounded-md"
//               />
//             </div>
//             <h3 className="mt-3 font-medium">{product.productName}</h3>
//             <p className="text-gray-600">Rs. {product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
