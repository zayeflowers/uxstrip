import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event to make header sticky
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`w-full z-50 transition-all duration-300 py-6 ${
        isScrolled ? 'sticky top-0 bg-white/95 backdrop-blur-sm shadow-sm' : ''
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl uppercase font-bold tracking-wider text-textDark hover:opacity-80 transition-opacity font-menu">
            UX STRIP
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-textDark focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link
                  href="/"
                  className="uppercase font-menu text-2xl tracking-tighter hover:opacity-80 transition-opacity font-normal"
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  href="/comics"
                  className="uppercase font-menu text-2xl tracking-tighter hover:opacity-80 transition-opacity font-normal"
                >
                  COMICS
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="uppercase font-menu text-2xl tracking-tighter hover:opacity-80 transition-opacity font-normal"
                >
                  ABOUT
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="uppercase font-menu text-2xl tracking-tighter hover:opacity-80 transition-opacity font-normal"
                >
                  SUBMIT
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-2">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  href="/"
                  className="block uppercase font-menu text-2xl tracking-tighter hover:opacity-80 transition-opacity font-normal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  href="/comics"
                  className="block uppercase font-menu text-2xl tracking-tighter hover:opacity-80 transition-opacity font-normal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  COMICS
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block uppercase font-menu text-2xl tracking-tighter hover:opacity-80 transition-opacity font-normal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ABOUT
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="block uppercase font-menu text-2xl tracking-tighter hover:opacity-80 transition-opacity font-normal"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  SUBMIT
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
