import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#131921] text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold mb-3">
              ጉሊት
            </h2>

            <p className="text-gray-300 text-sm">
              Your trusted online marketplace.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3">
              Company
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#about" className="hover:text-white">
                  About Us
                </a>
              </li>

              <li>
                <a href="tel:+251900000000" className="hover:text-white">
                  Contact Us
                </a>
              </li>

              <li>
                <a href="mailto:support@gulit.com" className="hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3">
              Legal
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer">
                Privacy Policy
              </li>

              <li className="hover:text-white cursor-pointer">
                Terms & Conditions
              </li>

              <li className="hover:text-white cursor-pointer">
                Returns & Refunds
              </li>

              <li className="hover:text-white cursor-pointer">
                FAQ
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} ጉሊት. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;