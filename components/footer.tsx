
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#081621] text-white pt-12 pb-8 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Organo Info */}
        <div>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            🧺 Organo
          </h2>
          <p className="text-sm text-gray-300 mb-4">
            Welcome to our e-commerce company, where the future of shopping has arrived. Experience seamless browsing and effortless transactions.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="bg-white text-black rounded-full p-2 hover:bg-green-500">🌐</a>
            <a href="#" className="bg-white text-black rounded-full p-2 hover:bg-green-500">🐦</a>
            <a href="#" className="bg-white text-black rounded-full p-2 hover:bg-green-500">💼</a>
            <a href="#" className="bg-white text-black rounded-full p-2 hover:bg-green-500">📸</a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
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
          <h3 className="text-lg font-semibold mb-3">Help Center</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="#">FAQ</Link></li>
            <li><Link href="#">Terms & Conditions</Link></li>
            <li><Link href="#">Reporting</Link></li>
            <li><Link href="#">Documentation</Link></li>
            <li><Link href="#">Support Policy</Link></li>
            <li><Link href="#">Privacy</Link></li>
          </ul>
        </div>

        {/* Subscribe & Address */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Subscribe</h3>
          <form className="flex items-center mb-4">
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full px-3 py-2 rounded-l bg-white text-black text-sm"
            />
            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded-r text-sm"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-gray-300 mb-3">
            We are a team of designers and developers creating high quality Prestashop.
          </p>
          <p className="text-sm text-gray-300 mb-4">
            📍 185 Green City, Australia
          </p>

          <div className="flex gap-2">
            <span className="bg-white px-2 py-1 rounded text-black text-xs">💳 VISA</span>
            <span className="bg-white px-2 py-1 rounded text-black text-xs">💰 PayPal</span>
            <span className="bg-white px-2 py-1 rounded text-black text-xs">🧾 GPay</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Organo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
