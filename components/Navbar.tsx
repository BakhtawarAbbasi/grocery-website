'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ShoppingCart, Heart } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF5FF]/80 backdrop-blur-md shadow-sm">
      
      {/* Top Info Bar */}
      <div className="bg-[#581C87] text-white text-sm py-2 px-4 flex flex-wrap justify-center md:justify-between items-center gap-2">
        <span>📧 gharkasaman001@gmail.com</span>
        <span>📍 Landhi, Karachi</span>
        <span>📞 +92 345 3380 161</span>
      </div>

      {/* Main Navbar */}
      <nav className="relative flex items-center justify-between px-4 py-3">
      
        {/* 🛒 Cart Icon (Mobile Front) */}
        <div className="relative md:hidden">
          <Link href="/cart">
            <ShoppingCart size={24} className="text-[#9333EA]" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/gharkasaamancrrop1.png"
            alt="Ghar Ka Saaman Logo"
            width={170}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-[#1F2937] text-sm">
          <li><Link href="/" className="hover:text-[#9333EA] transition">Home</Link></li>
          <li><Link href="/shop" className="hover:text-[#9333EA] transition">Shop</Link></li>
          <li><Link href="/blog" className="hover:text-[#9333EA] transition">Blog</Link></li>
          <li><Link href="/pages" className="hover:text-[#9333EA] transition">Pages</Link></li>
          <li><Link href="/contact" className="hover:text-[#9333EA] transition">Contact</Link></li>
        </ul>

        {/* Right Actions - Desktop */}
        <div className="items-center hidden gap-4 md:flex">
          
          {/* 🔍 Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Find Products"
              className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-[#9333EA]"
            />
            <span className="absolute left-3 top-1.5 text-gray-400">🔍</span>
          </div>

          {/*  Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart size={20} className="text-[#9333EA] hover:scale-110 transition" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/*  Wishlist */}
          <button className="text-[#581C87] text-xl hover:scale-110 transition">
            <Heart size={20} />
          </button>

          {/*  Auth */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="bg-[#581C87] text-white hover:bg-[#9333EA] px-4 py-1.5 text-sm rounded-full">
                Sign Up
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* 📱 Mobile Menu (Sheet) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#581C87]">
                <Menu size={30} />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64 bg-white">
              <ul className="flex flex-col gap-8 mt-22 text-xl font-medium text-[#1F2937] text-center">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/shop">Shop</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/pages">Pages</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-3 py-2 border rounded text-sm focus:ring-1 focus:ring-[#9333EA] text-center"
                  />
                </li>
                <li className="flex items-center gap-4 mt-4">
                  

                  {/* 👤 Auth - Mobile */}
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button className="bg-[#581C87] text-white hover:bg-[#9333EA] px-4 py-1.5 text-sm rounded-full w-full">
                        Sign Up
                      </Button>
                    </SignInButton>
                  </SignedOut>

                  <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
