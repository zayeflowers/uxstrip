import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-textDark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-comic font-bold mb-4 text-secondary">UX Strip</h3>
            <p className="text-gray-300 leading-relaxed">
              A comic archive dedicated to the absurd, funny, and very real world of UX design.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white hover:underline transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/comics" className="text-gray-300 hover:text-white hover:underline transition-colors">
                  Comics
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white hover:underline transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-gray-300 hover:text-white hover:underline transition-colors">
                  Submit
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Follow us on social media for the latest comics and updates.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white hover:underline transition-colors"
                aria-label="Twitter"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white hover:underline transition-colors"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white hover:underline transition-colors"
                aria-label="Facebook"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} UX Strip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
