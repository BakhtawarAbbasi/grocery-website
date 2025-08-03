'use client';
import React from 'react';
import Image from 'next/image';

const ProductBanner: React.FC = () => {
  return (
    <section className="w-full bg-[#fff5f5] bg-[url('/coffee-beans.jpeg')] bg-repeat px-6 py-2 md:py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/*  Left: Product Image */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <Image
            src="/images/cofee.png" // 🧠 Place this image in /public/products/
            alt="Nescafe Premium Coffee"
            width={400}
            height={400}
            className="object-contain"
            priority
          />
        </div>

        {/*  Right: Text Content */}
        <div className="w-full md:w-1/2">
          <p className="text-sm text-gray-500 mb-2">☕ Product Preview</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-green-900 mb-3">
            NESCAFE PREMIUM <br />
            <span className="text-green-600">GOLD COFFEE</span>
          </h2>

          <p className="text-gray-700 mb-3 leading-relaxed">
            Premium Blend. Nescafé Gold Coffee is made from a premium blend of Arabica
            and Robusta coffee beans. These beans are carefully selected and roasted to
            deliver a well-balanced and aromatic coffee experience. Premium Packaging.
          </p>

          {/* Pricing */}
          <div className="flex items-center gap-4 mb-3">
            <span className="text-2xl font-bold text-green-800">$65.00</span>
            <span className="text-gray-400 line-through text-lg">$70.00</span>
          </div>

          {/*  Quantity Selector & Button */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200">−</button>
              <span className="px-4 text-sm">1</span>
              <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200">+</button>
            </div>

            <button className="bg-green-700 hover:bg-green-800 text-white text-sm px-6 py-3 rounded-md font-medium">
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductBanner;
