'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const router = useRouter();

  return (
    <header className="bg-white shadow-md">
      {/* 🌿 Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 text-sm text-white bg-green-900">
        <div className="flex flex-wrap gap-4">
          <span>📧 gharkasaman001@gmail.com</span>
          <span>📍 Landhi, Karachi</span>
          <span>📞 +92 345 3380 161</span>
        </div>
      </div>

      {/* 🛒 Main Navbar */}
      <nav className="relative flex items-center justify-between px-4 py-3">
        {/* 🧿 Logo */}
        <div className="flex items-center gap-2">
          <div className="text-lg font-bold text-green-800">
            <Image
              src="/images/gharkasaamancrrop.png"
              alt="Organo Logo"
              width={190}
              height={40}
            />
          </div>
        </div>

        {/* 📄 Desktop Menu */}
        <ul className="items-center hidden gap-6 font-medium text-gray-700 md:flex">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/shop">Shop</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/pages">Pages</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        {/* 🧰 Right Icons */}
        <div className="items-center hidden gap-4 md:flex">
          <input
            type="text"
            placeholder="Find Products"
            className="px-3 py-1 text-sm border rounded-md"
          />
          <button className="p-2 text-white bg-green-700 rounded">🔍</button>

          {/* ✅ Cart Icon (Desktop) */}
          <Link href="/cart" className="relative" scroll={false}>
            <span className="text-xl text-green-700 cursor-pointer">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <button className="text-xl text-yellow-500">💛</button>
          <button className="px-3 py-1 text-white bg-green-800 rounded">Sign Up</button>
        </div>

        {/* 📱 Mobile Menu Toggle */}
        <button
          className="text-green-700 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        {/* 📱 Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute left-0 z-50 w-full bg-white shadow-md top-full md:hidden">
            <ul className="flex flex-col gap-3 p-4 font-medium text-gray-700">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/pages">Pages</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li>
                <input
                  type="text"
                  placeholder="Find Products"
                  className="w-full px-2 py-1 border rounded"
                />
              </li> 

              {/* ✅ Cart Icon (Mobile) */}
              <li className="flex items-center gap-4">
                <Link href="/cart" className="relative" scroll={false}>
                  <span className="text-xl text-green-700 cursor-pointer">🛒</span>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 rounded-full">
                      {totalItems}
                    </span>
                  )} 
                </Link>
                <button className="text-yellow-500">💛</button>
                <button className="px-3 py-1 text-white bg-green-800 rounded">Sign Up</button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}; 

export default Navbar;
