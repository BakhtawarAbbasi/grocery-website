'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(+newTotal.toFixed(2));
  }, [cart]);

  return (
    <div className="container px-4 py-12 mx-auto max-w-7xl">
      <div className="flex items-center mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 mr-4 transition rounded-full hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Your Shopping Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="py-16 text-center">
          <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-medium text-gray-700">Your cart is empty</h2>
          <p className="mb-6 text-gray-500">Looks like you haven't added anything to your cart yet</p>
          <button
            onClick={() => router.push('/shop')}
            className="px-6 py-3 text-white transition bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Cart Items */}
          <div className="w-full overflow-hidden bg-white border border-gray-100 shadow-sm lg:w-2/3 rounded-xl">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Your Items ({cart.length})</h2>
                <button
                  onClick={() => router.push('/shop')}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Continue Shopping
                </button>
              </div>
            </div>

            <div className="hidden grid-cols-12 gap-4 p-6 text-sm font-medium tracking-wider text-gray-500 uppercase md:grid bg-gray-50">
              <div className="col-span-5">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
              <div className="col-span-2 text-right">Action</div>
            </div>

            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 gap-4 p-6 transition border-b border-gray-100 md:grid-cols-12 last:border-0 hover:bg-gray-50"
              >
                <div className="flex items-center col-span-5 gap-4">
                  <div className="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-lg">
                    <Image
                      src={item.image || '/fallback.png'}
                      alt={item.name || 'Product Image'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">Rs.{item.price.toFixed(2)} per item</p>
                  </div>
                </div>

                <div className="flex items-center col-span-3 md:justify-center">
                  <div className="flex items-center overflow-hidden border border-gray-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 transition bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
                    >
                      −
                    </button>
                    <span className="w-12 px-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 transition bg-gray-100 hover:bg-gray-200"
                    >
                      ＋
                    </button>
                  </div>
                </div>

                <div className="flex items-center col-span-2 md:justify-end">
                  <span className="font-medium">Rs.{(item.price * item.quantity).toFixed(2)}</span>
                </div>

                <div className="flex items-center col-span-2 md:justify-end">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-1 text-red-500 transition hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="hidden md:inline">Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="sticky p-6 bg-white border border-gray-100 shadow-sm rounded-xl top-6">
              <h2 className="mb-6 text-xl font-semibold text-gray-800">Order Summary</h2>

              <div className="mb-6 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-gray-700">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-medium text-right text-gray-800">
                      Rs.{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}

                <div className="flex justify-between pt-4 border-t border-gray-300">
                  <span className="font-semibold text-gray-800">Total</span>
                  <span className="text-lg font-bold text-gray-800">Rs.{total.toFixed(2)}</span>
                </div>
              </div> 
              
              {/* ✅ Checkout Button */}
              <button
                onClick={() => {
                  localStorage.setItem('cart', JSON.stringify(cart));
                  router.push('/checkout');
                }}
                className="w-full py-3 mb-4 font-medium text-white transition rounded-lg shadow-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 hover:shadow-lg"
              >
                Proceed to Checkout
              </button> 

              <div className="flex items-center justify-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
