import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#581C87] text-[#FAF5FF] pt-12 pb-8 px-6 md:px-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
        {/* Organo Info */}
        <div>
          <h2 className="flex items-center gap-2 mb-2 text-xl font-bold">
            🧺 Organo
          </h2>
          <p className="text-sm text-[#EDE9FE] mb-4">
            Welcome to our e-commerce company, where the future of shopping has arrived. Experience seamless browsing and effortless transactions.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="bg-white text-black rounded-full p-2 hover:bg-[#9333EA] transition">🌐</a>
            <a href="#" className="bg-white text-black rounded-full p-2 hover:bg-[#9333EA] transition">🐦</a>
            <a href="#" className="bg-white text-black rounded-full p-2 hover:bg-[#9333EA] transition">💼</a>
            <a href="#" className="bg-white text-black rounded-full p-2 hover:bg-[#9333EA] transition">📸</a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Useful Links</h3>
          <ul className="space-y-2 text-sm text-[#EDE9FE]">
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">News Report</Link></li>
            <li><Link href="#">Company Partners</Link></li>
            <li><Link href="#">Our Gallery</Link></li>
            <li><Link href="#">Our Team</Link></li>
            <li><Link href="#">Contact Us</Link></li>
          </ul>
        </div>

        {/* Help Center */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Help Center</h3>
          <ul className="space-y-2 text-sm text-[#EDE9FE]">
            <li><Link href="#">FAQ</Link></li>
            <li><Link href="#">Terms & Conditions</Link></li>
            <li><Link href="#">Documentation</Link></li>
            <li><Link href="#">Support Policy</Link></li>
            <li><Link href="#">Privacy</Link></li>
          </ul>
        </div>

        {/* Subscribe & Address */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Subscribe</h3>
          <form className="flex items-center mb-4">
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full px-3 py-2 text-sm text-black bg-white rounded-l"
            />
            <button
              type="submit"
              className="bg-[#9333EA] text-white px-4 py-2 rounded-r text-sm hover:bg-white hover:text-[#581C87] transition"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-[#EDE9FE] mb-3">
            We are a team of designers and developers creating high quality Prestashop.
          </p>
          <p className="text-sm text-[#EDE9FE] mb-4">
            📍 185 Green City, Australia
          </p>

          <div className="flex gap-2">
            <span className="px-2 py-1 text-xs text-black bg-white rounded">💳 VISA</span>
            <span className="px-2 py-1 text-xs text-black bg-white rounded">💰 PayPal</span>
            <span className="px-2 py-1 text-xs text-black bg-white rounded">🧾 GPay</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[#7E22CE] mt-10 pt-4 text-center text-sm text-[#EDE9FE]">
        © {new Date().getFullYear()} Organo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
