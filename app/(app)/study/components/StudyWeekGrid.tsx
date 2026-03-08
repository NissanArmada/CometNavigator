"use client";

import { useState, useRef } from "react";
import { useCalendar } from "../../CalendarContext";

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
  start: string;
  end: string;
};

type OverlayEvent = { day: number; startRow: number; span: number; label: string };

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

const events: Event[] = [
  { day: 0, startRow: 6,  span: 2, label: "CS 3345 Midterm Prep",     sublabel: "JSOM 1.118",        type: "theory",    host: "Peer Group", participants: 4, topic: "Graphs and Trees",               start: "15:00", end: "17:00" },
  { day: 0, startRow: 9,  span: 2, label: "PHYS 2325 Homework Help",  sublabel: "McDermott Library", type: "workshop",  host: "Peer Group", participants: 2, topic: "Newton's Laws and Kinematics",   start: "18:00", end: "19:30" },
  { day: 1, startRow: 4,  span: 2, label: "MATH 2418 Study Group",    sublabel: "JSOM 2.803",        type: "theory",    host: "Peer Group", participants: 3, topic: "Eigenvalues and Eigenvectors",   start: "13:00", end: "15:00" },
  { day: 1, startRow: 7,  span: 2, label: "CS 4349 Algorithm Review", sublabel: "ECSS 2.203",        type: "workshop",  host: "Peer Group", participants: 5, topic: "Dynamic Programming",            start: "16:00", end: "17:30" },
  { day: 2, startRow: 5,  span: 2, label: "EE 3301 Signals Review",   sublabel: "ECSS 3.910",        type: "practical", host: "Peer Group", participants: 3, topic: "Fourier Transform",              start: "14:00", end: "15:30" },
  { day: 3, startRow: 1,  span: 3, label: "CS 3345 Final Exam Prep",  sublabel: "GR 3.302",          type: "theory",    host: "Peer Group", participants: 6, topic: "Sorting Algorithms and Complexity", start: "10:00", end: "12:30" },
  { day: 3, startRow: 8,  span: 1, label: "PHYS 2325 Lab Report",     sublabel: "SOM 1.110",         type: "workshop",  host: "Peer Group", participants: 2, topic: "Projectile Motion Lab",           start: "17:00", end: "18:00" },
  { day: 3, startRow: 10, span: 2, label: "MATH 2418 Practice",       sublabel: "JSOM 2.803",        type: "theory",    host: "Peer Group", participants: 4, topic: "Matrix Decomposition",            start: "19:00", end: "20:30" },
  { day: 4, startRow: 7,  span: 2, label: "CS 4349 Homework Session", sublabel: "ECSS 2.203",        type: "workshop",  host: "Peer Group", participants: 3, topic: "Greedy Algorithms",              start: "16:30", end: "18:00" },
];

const calendarOverlay: OverlayEvent[] = [
  { day: 0, startRow: 0,  span: 1, label: "PHYS 2325"             },
  { day: 0, startRow: 1,  span: 2, label: "CS 3345"               },
  { day: 0, startRow: 5,  span: 2, label: "MATH 2418"             },
  { day: 1, startRow: 1,  span: 2, label: "CS 3345"               },
  { day: 1, startRow: 3,  span: 2, label: "CS 3345 Midterm Prep"  },
  { day: 1, startRow: 9,  span: 2, label: "AIS Weekly Meetup"     },
  { day: 2, startRow: 0,  span: 1, label: "PHYS 2325"             },
  { day: 2, startRow: 5,  span: 2, label: "MATH 2418"             },
  { day: 2, startRow: 7,  span: 1, label: "Gym"                   },
  { day: 3, startRow: 1,  span: 2, label: "CS 3345"               },
  { day: 3, startRow: 4,  span: 1, label: "PHYS 2325 Homework"    },
  { day: 3, startRow: 10, span: 2, label: "Robotics Build Night"  },
  { day: 4, startRow: 0,  span: 1, label: "PHYS 2325"             },
  { day: 4, startRow: 2,  span: 2, label: "CS 3345 Midterm Exam"  },
  { day: 4, startRow: 5,  span: 2, label: "MATH 2418"             },
];

const GUTTER = 80;
const ROW_H  = 72;

type PopoverState = { event: Event; x: number; y: number; locked: boolean } | null;

function isSameEvent(p: PopoverState, ev: Event) {
  return p?.event.day === ev.day && p?.event.start === ev.start;
}

export default function StudyWeekGrid() {
  const [popover, setPopover] = useState<PopoverState>(null);
  const hideTimeout           = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { addSession, removeSession, hasSession } = useCalendar();

  const cancelHide = () => { if (hideTimeout.current) clearTimeout(hideTimeout.current); };

  const scheduleHide = () => {
    hideTimeout.current = setTimeout(
      () => setPopover(prev => (prev?.locked ? prev : null)),
      150,
    );
  };

  const handleEventMouseMove = (e: React.MouseEvent, event: Event) => {
    // Don't override a locked popover with a hover one
    setPopover(prev => {
      if (prev?.locked) return prev;
      cancelHide();
      return { event, x: e.clientX + 16, y: e.clientY - 180, locked: false };
    });
  };

  const handleEventClick = (e: React.MouseEvent, event: Event) => {
    e.stopPropagation();
    cancelHide();
    setPopover(prev => {
      // Clicking the already-locked event → close
      if (prev?.locked && isSameEvent(prev, event)) return null;
      // Lock at click position
      return { event, x: e.clientX + 16, y: e.clientY - 180, locked: true };
    });
  };

  const handleToggle = (event: Event) => {
    if (hasSession(event.day, event.start)) removeSession(event.day, event.start);
    else addSession({ day: event.day, start: event.start, end: event.end, label: event.label, sublabel: event.sublabel });
  };

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Day headers */}
        <div className="bg-black/20 border-b border-white/10 flex w-full shrink-0">
          <div className="shrink-0" style={{ width: GUTTER }} />
          {days.map((d) => (
            <div key={d.num} className="flex-1 border-r border-white/5 last:border-r-0 py-2 flex flex-col items-center gap-0.5">
              <span className="text-[#6b7280] text-[10px] font-extrabold tracking-[1px] uppercase">{d.short}</span>
              <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold ${d.today ? "bg-white text-[#1a1817]" : "text-[#d1d5db]"}`}>
                {d.num}
              </span>
            </div>
          ))}
        </div>

        {/* Scrollable time rows */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
          {hours.map((hour, hIdx) => (
            <div key={hour} className="flex w-full border-b border-white/5" style={{ minHeight: ROW_H }}>
              <div className="shrink-0 flex items-end justify-end pb-[5px] px-2 border-r border-white/5" style={{ width: GUTTER }}>
                <span className="text-[#6b7280] text-[10px] font-bold uppercase whitespace-nowrap">{hour}</span>
              </div>

              {days.map((d, dIdx) => {
                const event   = events.find(e => e.day === dIdx && e.startRow === hIdx);
                const overlay = calendarOverlay.find(e => e.day === dIdx && e.startRow === hIdx);
                const joined  = event ? hasSession(event.day, event.start) : false;
                const isLocked = event ? isSameEvent(popover, event) && popover?.locked : false;

                return (
                  <div key={d.num} className="flex-1 border-r border-white/5 last:border-r-0 relative p-1">
                    {overlay && (
                      <div
                        className="absolute left-1 right-1 top-1 rounded border-l-2 border-white/15 bg-white/[0.06] overflow-hidden pointer-events-none z-0"
                        style={{ height: `${overlay.span * ROW_H - 8}px` }}
                      >
                        <p className="text-white/20 font-bold text-[8px] px-1.5 pt-1.5 leading-none truncate uppercase tracking-wide">
                          {overlay.label}
                        </p>
                      </div>
                    )}

                    {event && (
                      <div
                        className={`relative border-l-2 rounded-lg p-2 text-[10px] leading-tight cursor-pointer transition-all z-10 ${typeColors[event.type]} ${joined ? "ring-1 ring-white/30" : ""} ${isLocked ? "ring-1 ring-[rgba(176,91,61,0.6)] brightness-110" : "hover:opacity-90"}`}
                        style={{ minHeight: `${event.span * ROW_H - 8}px` }}
                        onMouseMove={(e) => handleEventMouseMove(e, event)}
                        onMouseLeave={scheduleHide}
                        onClick={(e) => handleEventClick(e, event)}
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
                        {joined && (
                          <span className="absolute top-1.5 right-1.5 text-[8px] font-extrabold text-white/60 uppercase tracking-wide">✓</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Backdrop — only when locked, click-outside to close */}
      {popover?.locked && (
        <div className="fixed inset-0 z-40" onClick={() => setPopover(null)} />
      )}

      {/* Popover */}
      {popover && (
        <div
          className={`fixed z-50 w-[240px] backdrop-blur-md bg-[rgba(26,24,23,0.97)] rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.5)] p-4 flex flex-col gap-3 transition-colors ${
            popover.locked
              ? "border border-[rgba(176,91,61,0.5)]"
              : "border border-[rgba(176,91,61,0.3)]"
          }`}
          style={{ left: popover.x, top: popover.y }}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={cancelHide}
          onMouseLeave={scheduleHide}
        >
          {/* Header row with optional lock indicator */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <span className={`text-[9px] font-extrabold tracking-[1.2px] uppercase ${typeColors[popover.event.type].split(" ").find(c => c.startsWith("text-"))}`}>
                {popover.event.type}
              </span>
              <p className="text-white font-bold text-sm mt-0.5 leading-snug">{popover.event.label}</p>
              <p className="text-[#6b7280] text-[10px] mt-0.5">{popover.event.start} – {popover.event.end}</p>
            </div>
            {popover.locked && (
              <button
                onClick={() => setPopover(null)}
                className="shrink-0 text-white/30 hover:text-white/70 transition-colors text-base leading-none mt-0.5 cursor-pointer"
              >
                ×
              </button>
            )}
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

          <button
            onClick={() => handleToggle(popover.event)}
            className={`w-full py-2 rounded-lg text-[10px] font-extrabold tracking-[1px] uppercase transition-colors cursor-pointer ${
              hasSession(popover.event.day, popover.event.start)
                ? "bg-white/10 border border-white/20 text-white/60 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400"
                : "bg-[#b05b3d] text-white hover:bg-[#9a4f35]"
            }`}
          >
            {hasSession(popover.event.day, popover.event.start) ? "Leave Session" : "Join Session"}
          </button>
        </div>
      )}
    </>
  );
}
