import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed min-w-screen bg-black/10 text-white top-0 z-50 border-b border-white/10 shadow-2xl backdrop-blur-sm">
      <Link href="/">
        <div className="max-w-7xl mx-auto px-6 py-4 text-white">
          <h1 className="text-3xl font-bold">News Hub</h1>
          <p className="mt-2 text-md">Stay updated with the latest news</p>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
