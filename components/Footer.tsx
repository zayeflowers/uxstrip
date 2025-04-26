import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-8 mt-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-comic mb-4">UX Strip</h3>
            <p className="text-gray-300">
              A comic archive for UX-related comics. Bringing humor to the world of user experience design.
            </p>
          </div>
          <div>
            <h3 className="text-xl mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/comics" className="text-gray-300 hover:text-white transition-colors">
                  Comics
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-gray-300 hover:text-white transition-colors">
                  Submit
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl mb-4">Connect</h3>
            <p className="text-gray-300 mb-2">
              Follow us on social media for the latest comics and updates.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Facebook
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} UX Strip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
