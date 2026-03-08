const imgLogo =
  "/assets/941b64066fe68786ba4f0c782c9cd092f2088c8a.svg";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(42,36,34,0.6)] border-b border-[rgba(175,90,60,0.1)]">
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-[#af5a3c] flex items-center justify-center p-1.5 rounded-2xl">
            <img src={imgLogo} alt="Comet logo" className="w-5 h-5 block" />
          </div>
          <span className="font-bold text-[#f1f5f9] text-xl tracking-[-0.5px]">
            Comet Navigation
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-[#f1f5f9] text-sm font-medium hover:text-[#af5a3c] transition-colors cursor-pointer"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-[#f1f5f9] text-sm font-medium hover:text-[#af5a3c] transition-colors cursor-pointer"
          >
            How It Works
          </a>
        </div>

        {/* Login Button */}
        <div className="flex items-center shrink-0">
          <Link
            href="/login"
            className="bg-[#af5a3c] text-white text-sm font-bold px-5 py-2 rounded-full shadow-[0_10px_15px_-3px_rgba(175,90,60,0.2),0_4px_6px_-4px_rgba(175,90,60,0.2)] hover:bg-[#9a4f35] transition-colors cursor-pointer"
          >
            Login
          </Link>
        </div>

      </div>
    </nav>
  );
}