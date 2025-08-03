import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/image1.jpeg" 
        alt="Hero Background"
        fill
        className="object-cover opacity-50"
        priority
      />

      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />

      {/*  Left Text*/}
      <div className="relative z-10 max-w-3xl px-6 text-left">
        <p className="text-green-700 font-semibold mb-3 flex items-center gap-2 text-lg">
          <span>🌱</span> 100% Healthy & Affordable
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Delicious And <br />
          Nutritious Food
        </h1>

        {/* Icons */}
        <div className="flex items-center gap-3 mb-6 text-2xl">
          <span>🥗</span>
          <span>🍱</span>
          <span>🍜</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link href="/products">
            <button className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-md text-sm font-semibold">
              View Products →
            </button>
          </Link>
          <Link href="/shop">
            <button className="bg-white border border-green-600 hover:bg-green-100 text-green-700 px-5 py-3 rounded-md text-sm font-semibold">
              About Shop →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
