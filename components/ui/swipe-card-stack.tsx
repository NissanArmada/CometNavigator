"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";

export interface SwipeCard {
  id: string;
  question: string;
  clubName: string;
  match: number;
  reason: string;
  events: { day: string; name: string; time: string }[];
  color: string;
}

interface Props {
  cards: SwipeCard[];
  onAnswer: (id: string, answer: "yes" | "no") => void;
  onComplete: () => void;
}

const SWIPE_THRESHOLD = 80;

export function SwipeCardStack({ cards, onAnswer, onComplete }: Props) {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  // Use a ref so AnimatePresence always reads the latest direction
  const exitDirRef = useRef<"left" | "right">("right");
  // Key that changes to trigger AnimatePresence exit
  const [cardKey, setCardKey] = useState(0);

  const done = current >= cards.length;

  const advance = useCallback((dir: "left" | "right") => {
    if (current >= cards.length) return;
    const card = cards[current];
    exitDirRef.current = dir;
    onAnswer(card.id, dir === "right" ? "yes" : "no");
    setDragX(0);
    setCardKey(k => k + 1);
    setTimeout(() => {
      setCurrent(p => {
        const next = p + 1;
        if (next >= cards.length) onComplete();
        return next;
      });
    }, 300);
  }, [current, cards, onAnswer, onComplete]);

  const advanceRef = useRef(advance);
  useEffect(() => { advanceRef.current = advance; }, [advance]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") advanceRef.current("right");
      else if (e.key === "ArrowLeft") advanceRef.current("left");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);
    setDragX(0);
    if (info.offset.x < -SWIPE_THRESHOLD) advance("left");
    else if (info.offset.x > SWIPE_THRESHOLD) advance("right");
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-[rgba(175,90,60,0.2)] border border-[rgba(175,90,60,0.4)] flex items-center justify-center text-3xl">
          🚀
        </div>
        <h2 className="text-white font-extrabold text-2xl tracking-tight">All done!</h2>
        <p className="text-[#9ca3af] text-sm max-w-[280px]">
          Your preferences have been saved. We'll tailor your recommendations.
        </p>
      </div>
    );
  }

  const card = cards[current];
  const remaining = cards.slice(current);

  // yesOpacity drives the YES badge; noOpacity drives the NO badge
  const yesOpacity = Math.max(0, Math.min(1, dragX / SWIPE_THRESHOLD));
  const noOpacity  = Math.max(0, Math.min(1, -dragX / SWIPE_THRESHOLD));

  // Variants with custom prop for correct exit direction
  const cardVariants = {
    initial: { scale: 0.95, opacity: 0 },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? 450 : -450,
      opacity: 0,
      rotate: dir === "right" ? 20 : -20,
      transition: { duration: 0.28 },
    }),
  };

  return (
    <div className="relative flex flex-col items-center gap-6 select-none">
      {/* Progress */}
      <div className="flex items-center gap-2 w-full max-w-[360px]">
        {cards.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i < current ? "bg-[#af5a3c]" : i === current ? "bg-white/40" : "bg-white/10"
            }`}
          />
        ))}
      </div>

      {/* Card stack area */}
      <div className="relative w-full max-w-[360px] h-[480px]">
        {/* Background depth cards */}
        {remaining.slice(1, 4).map((c, i) => (
          <div
            key={c.id}
            className="absolute inset-0 rounded-3xl border border-[rgba(176,91,61,0.15)] bg-[rgba(44,40,38,0.5)]"
            style={{
              transform: `scale(${1 - (i + 1) * 0.04}) translateY(${(i + 1) * 10}px)`,
              zIndex: 10 - i,
              opacity: 1 - (i + 1) * 0.2,
            }}
          />
        ))}

        {/* Active top card - custom prop passed at exit time by AnimatePresence */}
        <AnimatePresence custom={exitDirRef.current}>
          <motion.div
            key={cardKey}
            custom={exitDirRef.current}
            variants={cardVariants}
            initial="initial"
            animate={{ scale: 1, opacity: 1, rotate: dragX * 0.02 }}
            exit="exit"
            className="absolute inset-0 rounded-3xl backdrop-blur-md bg-[rgba(44,40,38,0.65)] border border-[rgba(176,91,61,0.25)] shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden cursor-grab active:cursor-grabbing z-20"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragStart={() => setIsDragging(true)}
            onDrag={(_, info) => setDragX(info.offset.x)}
            onDragEnd={handleDragEnd}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* YES badge */}
            <div
              className="absolute top-8 left-6 border-2 border-[#22c55e] rounded-xl px-4 py-1.5 z-30 pointer-events-none"
              style={{ opacity: yesOpacity, transform: "rotate(-12deg)" }}
            >
              <span className="text-[#22c55e] font-extrabold text-xl tracking-widest uppercase">YES</span>
            </div>
            {/* NO badge */}
            <div
              className="absolute top-8 right-6 border-2 border-[#ef4444] rounded-xl px-4 py-1.5 z-30 pointer-events-none"
              style={{ opacity: noOpacity, transform: "rotate(12deg)" }}
            >
              <span className="text-[#ef4444] font-extrabold text-xl tracking-widest uppercase">NO</span>
            </div>

            {/* Card content */}
            <div className="h-full flex flex-col p-7 gap-5">
              {/* Match badge */}
              <div className="flex items-center justify-between">
                <div className="bg-[rgba(175,90,60,0.15)] border border-[rgba(175,90,60,0.3)] rounded-full px-3 py-1">
                  <span className="text-[#d98c5f] text-[11px] font-extrabold tracking-[1.2px] uppercase">
                    {card.match}% Match
                  </span>
                </div>
                <span className="text-[#6b7280] text-xs font-bold">
                  {current + 1} / {cards.length}
                </span>
              </div>

              {/* Club name */}
              <div>
                <p className="text-[#d98c5f] text-[11px] font-extrabold tracking-[2px] uppercase mb-1">Club</p>
                <h2 className="text-white font-extrabold text-[22px] leading-tight tracking-[-0.5px]">
                  {card.clubName}
                </h2>
              </div>

              {/* Question */}
              <div className="bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-2xl p-4">
                <p className="text-white text-base font-bold leading-snug">
                  {card.question}
                </p>
              </div>

              {/* Reason */}
              <p className="text-[#9ca3af] text-sm leading-relaxed flex-1">
                {card.reason}
              </p>

              {/* Events */}
              <div className="flex flex-col gap-2">
                <p className="text-[#6b7280] text-[10px] font-extrabold tracking-[1.5px] uppercase">Meetings</p>
                {card.events.map((ev, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d98c5f] shrink-0" />
                    <span className="text-[#d1d5db] text-xs font-medium">
                      {ev.day} · {ev.name} · {ev.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Swipe hint */}
              <div className="flex items-center justify-center gap-6 pt-1">
                <span className="text-[#ef4444]/60 text-[11px] font-bold tracking-wide">← NO</span>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-white/20" />
                  ))}
                </div>
                <span className="text-[#22c55e]/60 text-[11px] font-bold tracking-wide">YES →</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tap buttons fallback */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => advance("left")}
          className="w-14 h-14 rounded-full border border-[rgba(239,68,68,0.4)] flex items-center justify-center hover:bg-[rgba(239,68,68,0.1)] transition-colors cursor-pointer"
        >
          <span className="text-[#ef4444] text-2xl leading-none">✕</span>
        </button>
        <button
          onClick={() => advance("right")}
          className="w-14 h-14 rounded-full bg-[#b05b3d] border border-[rgba(176,91,61,0.6)] flex items-center justify-center shadow-[0_8px_24px_rgba(176,91,61,0.35)] hover:bg-[#9a4f35] transition-colors cursor-pointer"
        >
          <span className="text-white text-2xl leading-none">✓</span>
        </button>
      </div>
    </div>
  );
}
