import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-100 w-full">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} UX Strip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
