"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring, type MotionValue } from "motion/react";

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

function NavItem({
  item,
  index,
  activeIndex,
  mouseX,
  onClick,
  onKeyDown,
  updateEffectPosition,
}: {
  item: typeof navItems[0];
  index: number;
  activeIndex: number;
  mouseX: MotionValue<number>;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, index: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => void;
  updateEffectPosition: (el: HTMLElement) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const distance = 200;
  
  const [baseWidth, setBaseWidth] = useState<number | "auto">("auto");

  useEffect(() => {
    if (innerRef.current) {
      setBaseWidth(innerRef.current.offsetWidth);
    }
  }, []);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = wrapperRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - rect.x - rect.width / 2;
  });

  const targetScale = useTransform(mouseDistance, [-distance, 0, distance], [1, 1.4, 1]);
  const scale = useSpring(targetScale, { mass: 0.1, stiffness: 150, damping: 12 });
  
  // Calculate dynamic width based directly on the smooth scale interpolation 
  // to physically push adjacent elements apart matching the visual growth scale exactly
  const width = useTransform(scale, (s) => (baseWidth === "auto" ? "auto" : baseWidth * s));

  // Hook into the scale to dynamically expand the gooey navbar background
  useEffect(() => {
    if (activeIndex === index) {
      return scale.on("change", () => {
        const li = innerRef.current?.querySelector("li");
        if (li) updateEffectPosition(li as HTMLElement);
      });
    }
  }, [activeIndex, index, scale, updateEffectPosition]);

  return (
    <motion.div
      ref={wrapperRef}
      style={{ width, display: "flex", justifyContent: "center" }}
      className="shrink-0"
    >
      <motion.div
        ref={innerRef}
        style={{ scale, transformOrigin: "top center" }}
        className="flex items-center shrink-0"
      >
        <li
          className={`rounded-full relative cursor-pointer transition-[background-color_color_box-shadow] duration-300 ease shadow-[0_0_0.5px_1.5px_transparent] ${
            activeIndex === index ? 'active' : ''
          }`}
          style={{ listStyle: "none" }}
        >
          <Link
            href={item.href}
            onClick={(e) => onClick(e as any, index)}
            onKeyDown={(e) => onKeyDown(e as any, index)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors outline-none ${
              activeIndex === index ? "text-[#060010]" : "text-[#9ca3af] hover:text-white"
            }`}
          >
            <img src={item.icon} alt="" className={`${item.iconSize} block ${activeIndex === index ? "filter invert" : ""}`} />
            <span className="font-bold text-xs tracking-[1.2px] uppercase">{item.label}</span>
          </Link>
        </li>
      </motion.div>
    </motion.div>
  );
}

export default function AppNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const mouseX = useMotionValue(Infinity);

  // GooeyNav State
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  
  const initialActive = Math.max(0, navItems.findIndex(i => pathname === i.href || pathname.startsWith(i.href + "/")));
  const [activeIndex, setActiveIndex] = useState<number>(initialActive);

  // Gooey defaults
  const animationTime = 600;
  const particleCount = 5;
  const particleDistances: [number, number] = [90, 10];
  const particleR = 100;
  const timeVariance = 300;
  const colors = [1, 2]; // For CSS vars tracking orange colors

  const noise = (n = 1) => n / 2 - Math.random() * n;
  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };
  
  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const makeParticles = (element: HTMLElement) => {
    const d: [number, number] = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');
      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', `var(--color-${p.color}, #f97316)`);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);
        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {}
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = useCallback((element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const liEl = (e.currentTarget.parentElement || e.currentTarget) as HTMLElement;
    if (activeIndex === index) return;
    setActiveIndex(index);
    updateEffectPosition(liEl);
    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach(p => filterRef.current!.removeChild(p));
    }
    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }
    if (filterRef.current) {
      makeParticles(filterRef.current);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const liEl = e.currentTarget.parentElement;
      if (liEl) {
        handleClick({ currentTarget: liEl } as unknown as React.MouseEvent<HTMLAnchorElement>, index);
      }
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex] as HTMLElement;
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add('active');
    }
    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex] as HTMLElement;
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex, updateEffectPosition]);

  return (
    <>
      <style>
        {`
          :root {
            --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);
            --color-1: #f97316;
            --color-2: #ea580c;
          }
          .effect {
            position: absolute;
            opacity: 1;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 1;
          }
          .effect.text {
            color: white;
            transition: color 0.3s ease;
          }
          .effect.text.active {
            color: #060010;
          }
          .effect.filter {
            filter: blur(7px) contrast(100) blur(0);
            mix-blend-mode: lighten;
          }
          .effect.filter::before {
            content: "";
            position: absolute;
            inset: -75px;
            z-index: -2;
            background: transparent;
          }
          .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            background: #f97316;
            transform: scale(0);
            opacity: 0;
            z-index: -1;
            border-radius: 9999px;
          }
          .effect.active::after {
            animation: pill 0.3s ease both;
          }
          @keyframes pill {
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .particle,
          .point {
            display: block;
            opacity: 0;
            width: 20px;
            height: 20px;
            border-radius: 9999px;
            transform-origin: center;
          }
          .particle {
            --time: 5s;
            position: absolute;
            top: calc(50% - 8px);
            left: calc(50% - 8px);
            animation: particle calc(var(--time)) ease 1 -350ms;
          }
          .point {
            background: var(--color);
            opacity: 1;
            animation: point calc(var(--time)) ease 1 -350ms;
          }
          @keyframes particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
              opacity: 1;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 1;
            }
          }
          @keyframes point {
            0% {
              transform: scale(0);
              opacity: 0;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            25% {
              transform: scale(calc(var(--scale) * 0.25));
            }
            38% {
              opacity: 1;
            }
            65% {
              transform: scale(var(--scale));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
          li.active {
            color: #060010;
            text-shadow: none;
          }
          li.active::after {
            opacity: 1;
            transform: scale(1);
          }
          li::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 8px;
            background: #f97316;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            z-index: -1;
          }
        `}
      </style>
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
          <div className="hidden md:flex flex-1 justify-center relative" ref={containerRef}>
            <nav 
              className="flex items-center gap-0 relative"
              onMouseMove={(e) => mouseX.set(e.pageX)}
              onMouseLeave={() => mouseX.set(Infinity)}
            >
              <ul
                 ref={navRef}
                 className="flex gap-2 list-none p-0 m-0 relative z-[3]"
              >
                {navItems.map((item, index) => {
                  return <NavItem 
                    key={item.href} 
                    item={item} 
                    index={index} 
                    activeIndex={activeIndex} 
                    mouseX={mouseX} 
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    updateEffectPosition={updateEffectPosition}
                  />;
                })}
              </ul>
            </nav>
            <span className="effect filter" ref={filterRef} />
            <span className="effect text" ref={textRef} />
          </div>

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
