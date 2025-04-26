import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-comic font-bold text-primary">
            UX Strip
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/comics" className="hover:text-primary transition-colors">
                  Comics
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-primary transition-colors">
                  Submit
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
