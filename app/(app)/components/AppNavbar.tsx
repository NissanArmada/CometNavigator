"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const imgLogo = "/assets/941b64066fe68786ba4f0c782c9cd092f2088c8a.svg";
const imgDashboardIcon = "/assets/586591ce1466139459bb3d3f942d103a6e8711f8.svg";
const imgStudyIcon = "/assets/93dcf443a9ca5f0618368ccc6288209946a2a041.svg";
const imgClubIcon = "/assets/71af83a173b60092cba30a379778cc088ff3cc44.svg";
const imgFriendsIcon = "/assets/8d2e4ad879039110c3b6348c714f5db39eed3219.svg";
const imgUserAvatar = "/assets/3f68eef93fc7f9fdb42e8dabfba14fcc2b1b960c.png";

const navItems = [
  { href: "/dashboard", label: "DASHBOARD", icon: imgDashboardIcon, iconSize: "w-[30px] h-[18px]" },
  { href: "/study",     label: "STUDY",     icon: imgStudyIcon,     iconSize: "w-[34px] h-[18px]" },
  { href: "/clubs",     label: "CLUB",      icon: imgClubIcon,      iconSize: "w-[36px] h-[12px]" },
  { href: "/friends",   label: "FRIENDS",   icon: imgFriendsIcon,   iconSize: "w-[28px] h-[16px]" },
];

export default function AppNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="backdrop-blur-md bg-[rgba(26,24,23,0.4)] border-b border-[rgba(176,91,61,0.1)] h-16 flex items-center px-4 sm:px-8 shrink-0 w-full z-50 sticky top-0">
        <div className="flex items-center w-full max-w-[1280px] mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 hover:opacity-80 transition">
            <div className="bg-[#af5a3c] flex items-center justify-center p-1.5 rounded-2xl">
              <img src={imgLogo} alt="Comet" className="w-5 h-5 block" />
            </div>
            <span className="font-bold text-[#f1f5f9] text-base sm:text-xl tracking-[-0.5px]">
              Comet Navigation
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0 flex-1 justify-center">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-1 rounded-lg transition-colors ${
                    active ? "text-white" : "text-[#9ca3af] hover:text-white"
                  }`}
                >
                  <img src={item.icon} alt="" className={`${item.iconSize} block`} />
                  <span className="font-bold text-xs tracking-[1.2px] uppercase">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop user */}
          <div className="hidden md:flex border-l border-white/10 pl-8 items-center gap-3 shrink-0">
            <Link href="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <span className="font-bold text-sm text-white">Cmdr. Watney</span>
              <div className="border-2 border-[#b05b3d] rounded-full w-10 h-10 overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0">
                <img src={imgUserAvatar} alt="User" className="w-full h-full object-cover" />
              </div>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="ml-auto md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M0 1H18M0 7H18M0 13H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden sticky top-16 z-40 backdrop-blur-md bg-[rgba(26,24,23,0.97)] border-b border-[rgba(176,91,61,0.2)]">
          <nav className="flex flex-col p-3 gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    active
                      ? "bg-[rgba(175,90,60,0.2)] border border-[rgba(175,90,60,0.3)] text-white"
                      : "text-[#9ca3af] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <img src={item.icon} alt="" className={`${item.iconSize} block`} />
                  <span className="font-bold text-sm tracking-[1.2px] uppercase">{item.label}</span>
                </Link>
              );
            })}
            <div className="mt-1 pt-3 border-t border-white/5">
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="border-2 border-[#b05b3d] rounded-full w-8 h-8 overflow-hidden shrink-0">
                  <img src={imgUserAvatar} alt="User" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-sm text-white">Cmdr. Watney</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
