import Link from "next/link";

const Navbar = () => {
  return (
    <div className="sticky min-w-screen bg-black/10 text-white top-0 z-50 border-b border-white/10 shadow-2xl backdrop-blur-sm md:h-26">
      <div className="max-w-7xl mx-auto px-6 py-4 text-white">
        <Link href="/" passHref legacyBehavior>
          <a className="block">
            <h1 className="text-indigo-400 text-2xl md:text-3xl font-bold">
              News Hub
            </h1>
            <p className="mt-2 text-md hidden md:block">
              Stay updated with the latest news
            </p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
