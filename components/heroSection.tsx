import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/bg.png"
        alt="Hero Background"
        fill
        className="object-cover object-center opacity-40"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF5FF]/50 via-[#FAF5FF]/30 to-white/10 backdrop-blur-sm z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 text-center md:text-left">
        <p className="text-[#9333EA] font-medium mb-3 text-base flex justify-center md:justify-start items-center gap-2">
          <span>🌱</span> 100% Healthy & Affordable
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold text-[#1F2937] mb-6 leading-tight">
          Delicious And <span className="text-[#581C87]">Nutritious</span> Food
        </h1>

        {/* Icons */}
        <div className="flex justify-center gap-4 mb-6 text-3xl md:justify-start">
          <span>🥗</span>
          <span>🍱</span>
          <span>🍜</span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
          <Link href="/products">
            <Button className="bg-[#581C87] hover:bg-[#9333EA] text-white text-sm px-6 py-3 rounded-full transition">
              View Products →
            </Button>
          </Link>

          <Link href="/shop">
            <Button
              variant="outline"
              className="border-[#581C87] text-[#581C87] hover:bg-[#F3E8FF] text-sm px-6 py-3 rounded-full transition"
            >
              About Shop →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
