"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const imgLogo = "http://localhost:3845/assets/941b64066fe68786ba4f0c782c9cd092f2088c8a.svg";
const imgDashboardIcon = "http://localhost:3845/assets/586591ce1466139459bb3d3f942d103a6e8711f8.svg";
const imgStudyIcon = "http://localhost:3845/assets/93dcf443a9ca5f0618368ccc6288209946a2a041.svg";
const imgClubIcon = "http://localhost:3845/assets/71af83a173b60092cba30a379778cc088ff3cc44.svg";
const imgFriendsIcon = "http://localhost:3845/assets/8d2e4ad879039110c3b6348c714f5db39eed3219.svg";
const imgUserAvatar = "http://localhost:3845/assets/3f68eef93fc7f9fdb42e8dabfba14fcc2b1b960c.png";

const navItems = [
  { href: "/dashboard", label: "DASHBOARD", icon: imgDashboardIcon, iconSize: "w-[30px] h-[18px]" },
  { href: "/study",     label: "STUDY",     icon: imgStudyIcon,     iconSize: "w-[34px] h-[18px]" },
  { href: "/clubs",     label: "CLUB",      icon: imgClubIcon,      iconSize: "w-[36px] h-[12px]" },
  { href: "/friends",   label: "FRIENDS",   icon: imgFriendsIcon,   iconSize: "w-[28px] h-[16px]" },
];

export default function AppNavbar() {
  const pathname = usePathname();

  return (
    <header className="backdrop-blur-md bg-[rgba(26,24,23,0.4)] border-b border-[rgba(176,91,61,0.1)] h-16 flex items-center px-8 shrink-0 w-full z-50 sticky top-0">
      <div className="flex items-center w-full max-w-[1280px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 w-[220px] shrink-0 pl-3">
          <div className="bg-[#af5a3c] flex items-center justify-center p-1.5 rounded-2xl">
            <img src={imgLogo} alt="Comet" className="w-5 h-5 block" />
          </div>
          <span className="font-bold text-[#f1f5f9] text-xl tracking-[-0.5px]">Comet Navigation</span>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-0 flex-1 justify-center px-[150px]">
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

        {/* User */}
        <div className="border-l border-white/10 pl-8 flex items-center gap-3 shrink-0 w-[182px]">
          <Link href="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <span className="font-bold text-sm text-white">Cmdr. Watney</span>
            <div className="border-2 border-[#b05b3d] rounded-full w-10 h-10 overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0">
              <img src={imgUserAvatar} alt="User" className="w-full h-full object-cover" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
