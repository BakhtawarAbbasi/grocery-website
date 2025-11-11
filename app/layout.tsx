import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import { CartProvider } from "@/context/CartContext"; 
import { ClerkProvider } from '@clerk/nextjs'
import WhatsAppButton from "@/components/WhatsappButton";
import Navbar from "@/components/Navbar";
import ChatbotButton from "@/components/chatButton";

export const metadata: Metadata = {
  title: "Grocerry Store",
  description: "Grocerry E-commerce Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <CartProvider> 
          <Navbar />
          {children}
          <ChatbotButton/>
          <WhatsAppButton/>
          <Footer />
        </CartProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
