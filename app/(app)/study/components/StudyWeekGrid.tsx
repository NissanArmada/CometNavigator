"use client";

import { useState } from "react";

const days = [
  { short: "MON", num: "2" },
  { short: "TUE", num: "3" },
  { short: "WED", num: "4" },
  { short: "THU", num: "5" },
  { short: "FRI", num: "6" },
  { short: "SAT", num: "7", today: true },
  { short: "SUN", num: "8" },
];

const hours = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM",  "2:00 PM",  "3:00 PM",  "4:00 PM",
  "5:00 PM",  "6:00 PM",  "7:00 PM",  "8:00 PM",  "9:00 PM",
];

type Event = {
  day: number;
  startRow: number;
  span: number;
  label: string;
  sublabel?: string;
  type: "theory" | "workshop" | "practical" | "family" | "safety" | "maint" | "field" | "personal" | "other";
  badge?: string;
  host: string;
  participants: number;
  topic: string;
};

const typeColors: Record<Event["type"], string> = {
  theory:    "border-[#af5a3c] bg-[rgba(175,90,60,0.15)] text-[#af5a3c]",
  workshop:  "border-[#d98c5f] bg-[rgba(217,140,95,0.15)] text-[#d98c5f]",
  practical: "border-[#64748b] bg-[rgba(100,116,139,0.15)] text-[#94a3b8]",
  family:    "border-[#4b5563] bg-[rgba(75,85,99,0.15)] text-[#9ca3af]",
  safety:    "border-[#ef4444] bg-[rgba(239,68,68,0.1)] text-[#ef4444]",
  maint:     "border-[#6b7280] bg-[rgba(107,114,128,0.15)] text-[#d1d5db]",
  field:     "border-[#10b981] bg-[rgba(16,185,129,0.1)] text-[#10b981]",
  personal:  "border-[#64748b] bg-[rgba(100,116,139,0.1)] text-[#64748b]",
  other:     "border-white/10 bg-white/5 text-[#9ca3af]",
};

// Row index: 9 AM = 0, 10 AM = 1, ... 9 PM = 12
const events: Event[] = [
  // MON 2026-03-02
  { day: 0, startRow: 6,  span: 2, label: "CS 3345 Midterm Prep",     sublabel: "JSOM 1.118",            type: "theory",    host: "Peer Group", participants: 4, topic: "Graphs and Trees" },
  { day: 0, startRow: 9,  span: 2, label: "PHYS 2325 Homework Help",  sublabel: "McDermott Library",     type: "workshop",  host: "Peer Group", participants: 2, topic: "Newton's Laws and Kinematics" },
  // TUE 2026-03-03
  { day: 1, startRow: 4,  span: 2, label: "MATH 2418 Study Group",    sublabel: "JSOM 2.803",            type: "theory",    host: "Peer Group", participants: 3, topic: "Eigenvalues and Eigenvectors" },
  { day: 1, startRow: 7,  span: 2, label: "CS 4349 Algorithm Review", sublabel: "ECSS 2.203",            type: "workshop",  host: "Peer Group", participants: 5, topic: "Dynamic Programming" },
  // WED 2026-03-04
  { day: 2, startRow: 5,  span: 2, label: "EE 3301 Signals Review",   sublabel: "ECSS 3.910",            type: "practical", host: "Peer Group", participants: 3, topic: "Fourier Transform" },
  // THU 2026-03-05
  { day: 3, startRow: 1,  span: 3, label: "CS 3345 Final Exam Prep",  sublabel: "GR 3.302",              type: "theory",    host: "Peer Group", participants: 6, topic: "Sorting Algorithms and Complexity" },
  { day: 3, startRow: 8,  span: 1, label: "PHYS 2325 Lab Report",     sublabel: "SOM 1.110",             type: "workshop",  host: "Peer Group", participants: 2, topic: "Projectile Motion Lab" },
  { day: 3, startRow: 10, span: 2, label: "MATH 2418 Practice",       sublabel: "JSOM 2.803",            type: "theory",    host: "Peer Group", participants: 4, topic: "Matrix Decomposition" },
  // FRI 2026-03-06
  { day: 4, startRow: 7,  span: 2, label: "CS 4349 Homework Session", sublabel: "ECSS 2.203",            type: "workshop",  host: "Peer Group", participants: 3, topic: "Greedy Algorithms" },
];

const GUTTER = 80;
const ROW_H = 72;

type PopoverState = { event: Event; x: number; y: number } | null;

export default function StudyWeekGrid() {
  const [popover, setPopover] = useState<PopoverState>(null);

  const handleMouseMove = (e: React.MouseEvent, event: Event) => {
    setPopover({ event, x: e.clientX - 120, y: e.clientY - 80 });
  };

  const handleMouseLeave = () => setPopover(null);

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Day headers */}
        <div className="bg-black/20 border-b border-white/10 flex w-full shrink-0">
          <div className="shrink-0" style={{ width: GUTTER }} />
          {days.map((d) => (
            <div
              key={d.num}
              className="flex-1 border-r border-white/5 last:border-r-0 py-2 flex flex-col items-center gap-0.5"
            >
              <span className="text-[#6b7280] text-[10px] font-extrabold tracking-[1px] uppercase">
                {d.short}
              </span>
              <span
                className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold ${
                  d.today ? "bg-white text-[#1a1817]" : "text-[#d1d5db]"
                }`}
              >
                {d.num}
              </span>
            </div>
          ))}
        </div>

        {/* Scrollable time rows */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
          {hours.map((hour, hIdx) => (
            <div
              key={hour}
              className="flex w-full border-b border-white/5"
              style={{ minHeight: ROW_H }}
            >
              {/* Time label */}
              <div
                className="shrink-0 flex items-end justify-end pb-[5px] px-2 border-r border-white/5"
                style={{ width: GUTTER }}
              >
                <span className="text-[#6b7280] text-[10px] font-bold uppercase whitespace-nowrap">
                  {hour}
                </span>
              </div>

              {/* Day cells */}
              {days.map((d, dIdx) => {
                const event = events.find(e => e.day === dIdx && e.startRow === hIdx);
                return (
                  <div key={d.num} className="flex-1 border-r border-white/5 last:border-r-0 relative p-1">
                    {event && (
                      <div
                        className={`relative border-l-2 rounded-lg p-2 text-[10px] leading-tight cursor-pointer transition-opacity hover:opacity-90 ${typeColors[event.type]}`}
                        style={{ minHeight: `${event.span * ROW_H - 8}px` }}
                        onMouseMove={(e) => handleMouseMove(e, event)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <p className="font-bold uppercase tracking-wide text-[9px] opacity-80">{event.type}</p>
                        <p className="font-semibold text-white text-[11px] mt-0.5">{event.label}</p>
                        {event.sublabel && <p className="opacity-60 text-[10px]">{event.sublabel}</p>}
                        {event.badge && (
                          <span className="inline-block mt-1 bg-white/20 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                            {event.badge}
                          </span>
                        )}
                        <span className="absolute bottom-1.5 right-1.5 bg-black/30 text-white/60 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                          {event.participants}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Fixed popover */}
      {popover && (
        <div
          className="fixed z-50 w-[240px] backdrop-blur-md bg-[rgba(26,24,23,0.95)] border border-[rgba(176,91,61,0.3)] rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.5)] p-4 flex flex-col gap-3 pointer-events-none"
          style={{ left: popover.x, top: popover.y }}
        >
          <div>
            <span className={`text-[9px] font-extrabold tracking-[1.2px] uppercase ${typeColors[popover.event.type].split(" ").find(c => c.startsWith("text-"))}`}>
              {popover.event.type}
            </span>
            <p className="text-white font-bold text-sm mt-0.5 leading-snug">{popover.event.label}</p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-[#6b7280] text-[9px] font-extrabold tracking-[0.9px] uppercase">Host</span>
              <span className="text-white text-xs font-semibold">{popover.event.host}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[#6b7280] text-[9px] font-extrabold tracking-[0.9px] uppercase">Participants</span>
              <span className="text-white text-xs font-semibold">{popover.event.participants}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[#6b7280] text-[9px] font-extrabold tracking-[0.9px] uppercase">Topic</span>
              <span className="text-[#94a3b8] text-[11px] leading-[1.5]">{popover.event.topic}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
