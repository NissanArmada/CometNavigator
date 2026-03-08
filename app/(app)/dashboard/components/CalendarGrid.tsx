"use client";

import { useCalendar } from "../../CalendarContext";
import { studyRecs } from "../data";

const ROW_H  = 56;
const GUTTER = 80;

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
  "12:00 AM","1:00 AM","2:00 AM","3:00 AM","4:00 AM","5:00 AM",
  "6:00 AM","7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM",
  "12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM",
  "6:00 PM","7:00 PM","8:00 PM","9:00 PM","10:00 PM","11:00 PM",
];

/** Convert 24h "HH:MM" to px offset from midnight */
function time24ToY(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return (h + m / 60) * ROW_H;
}

function formatTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return m === 0 ? `${hour}:00 ${period}` : `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

type EventType = "class" | "study" | "club" | "personal" | "exam";

const typeStyle: Record<EventType, { bg: string; border: string; timeColor: string }> = {
  class:    { bg: "bg-[rgba(59,130,246,0.3)]",  border: "border-[#60a5fa]",  timeColor: "text-[#bfdbfe]" },
  study:    { bg: "bg-[rgba(34,197,94,0.3)]",   border: "border-[#4ade80]",  timeColor: "text-[#bbf7d0]" },
  club:     { bg: "bg-[rgba(176,91,61,0.3)]",   border: "border-[#b05b3d]",  timeColor: "text-[#d98c5f]"  },
  personal: { bg: "bg-[rgba(107,114,128,0.3)]", border: "border-[#9ca3af]",  timeColor: "text-[#d1d5db]" },
  exam:     { bg: "bg-[rgba(239,68,68,0.3)]",   border: "border-[#ef4444]",  timeColor: "text-[#fca5a5]"  },
};

const events: { col: number; title: string; subtitle: string; start: string; end: string; type: EventType }[] = [
  // MON 2026-03-02
  { col: 0, title: "PHYS 2325",             subtitle: "ECSS 2.410",            start: "09:00", end: "09:50", type: "class"    },
  { col: 0, title: "CS 3345",               subtitle: "ECSS 4.619",            start: "10:00", end: "11:15", type: "class"    },
  { col: 0, title: "MATH 2418",             subtitle: "SOM 2.901",             start: "14:00", end: "15:15", type: "class"    },
  // TUE 2026-03-03
  { col: 1, title: "CS 3345",               subtitle: "ECSS 4.619",            start: "10:00", end: "11:15", type: "class"    },
  { col: 1, title: "CS 3345 Midterm Prep",  subtitle: "JSOM 1.118",            start: "12:00", end: "13:30", type: "study"    },
  { col: 1, title: "AIS Weekly Meetup",     subtitle: "ECSS 2.203",            start: "18:00", end: "19:30", type: "club"     },
  // WED 2026-03-04
  { col: 2, title: "PHYS 2325",             subtitle: "ECSS 2.410",            start: "09:00", end: "09:50", type: "class"    },
  { col: 2, title: "MATH 2418",             subtitle: "SOM 2.901",             start: "14:00", end: "15:15", type: "class"    },
  { col: 2, title: "Gym",                   subtitle: "",                      start: "16:00", end: "17:00", type: "personal" },
  // THU 2026-03-05
  { col: 3, title: "CS 3345",               subtitle: "ECSS 4.619",            start: "10:00", end: "11:15", type: "class"    },
  { col: 3, title: "PHYS 2325 Homework",    subtitle: "McDermott Library",     start: "13:00", end: "14:00", type: "study"    },
  { col: 3, title: "Robotics Build Night",  subtitle: "ECSS 1.202",            start: "19:00", end: "20:30", type: "club"     },
  // FRI 2026-03-06
  { col: 4, title: "PHYS 2325",             subtitle: "ECSS 2.410",            start: "09:00", end: "09:50", type: "class"    },
  { col: 4, title: "CS 3345 Midterm Exam",  subtitle: "ECSS 2.415",            start: "11:00", end: "12:30", type: "exam"     },
  { col: 4, title: "MATH 2418",             subtitle: "SOM 2.901",             start: "14:00", end: "15:15", type: "class"    },
];

type Props = {
  /** "calendar" (default) — calendar events normal, study recs semi-transparent overlay
   *  "schedule"            — calendar events dimmed, study recs shown prominently */
  mode?: "calendar" | "schedule";
  /** Called with the study rec's index when a rec event is clicked (schedule mode only) */
  onRecClick?: (recIndex: number) => void;
};

export default function CalendarGrid({ mode = "calendar", onRecClick }: Props) {
  const totalH = hours.length * ROW_H;
  const { addedSessions, isConfirmed, isDeleted, deleteEvent } = useCalendar();

  const colW = 100 / 7;

  function eventBlock(
    col: number, start: string, end: string,
    bgCls: string, borderCls: string, timeColorCls: string,
    title: string, subtitle: string | undefined,
    opacity: number,
    extraCls = "",
  ) {
    const startY = time24ToY(start);
    const endY   = time24ToY(end);
    const evH    = Math.max(endY - startY, 30);
    return (
      <div
        key={`${col}-${start}`}
        className="absolute p-[4px] pointer-events-none"
        style={{
          top:     startY,
          left:    `${col * colW}%`,
          right:   `${(6 - col) * colW}%`,
          opacity,
        }}
      >
        <div
          className={`${bgCls} border-l-4 ${borderCls} rounded-br-[4px] rounded-tr-[4px] pl-3 pr-2 py-2 flex flex-col overflow-hidden ${extraCls}`}
          style={{ height: evH }}
        >
          <p className="text-white text-[10px] font-bold leading-[15px] truncate">{title}</p>
          {subtitle && <p className="text-white/50 text-[9px] leading-none truncate">{subtitle}</p>}
          <p className={`${timeColorCls} text-[9px] leading-[13.5px] mt-auto`}>
            {formatTime(start)} – {formatTime(end)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-full">
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

      {/* Time grid — scrollable */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
        <div className="relative flex w-full" style={{ height: totalH }}>
          {/* Time labels column */}
          <div className="shrink-0 flex flex-col" style={{ width: GUTTER }}>
            {hours.map((h) => (
              <div
                key={h}
                className="border-b border-white/5 flex items-end justify-end pb-[5px] px-2"
                style={{ height: ROW_H }}
              >
                <span className="text-[#6b7280] text-[10px] font-bold uppercase whitespace-nowrap">
                  {h}
                </span>
              </div>
            ))}
          </div>

          {/* Grid body */}
          <div className="relative flex-1 flex">
            {/* Column separators */}
            {days.map((d) => (
              <div key={d.num} className="flex-1 border-r border-white/5 last:border-r-0 relative">
                {hours.map((h) => (
                  <div key={h} className="border-b border-white/5" style={{ height: ROW_H }} />
                ))}
              </div>
            ))}

            {/* ── Events layer ── */}
            <div className="absolute inset-0 pointer-events-none">

              {/* 1. Calendar events from calendars.json */}
              {events.map((ev, i) => {
                const key = `${ev.col}-${ev.start}`;
                if (isDeleted(key)) return null;
                const s       = typeStyle[ev.type];
                const opacity = mode === "schedule" ? 0.3 : 1;
                const startY  = time24ToY(ev.start);
                const endY    = time24ToY(ev.end);
                const evH     = Math.max(endY - startY, 30);
                return (
                  <div
                    key={`cal-${i}`}
                    className="absolute p-[4px] pointer-events-auto group"
                    style={{ top: startY, left: `${ev.col * colW}%`, right: `${(6 - ev.col) * colW}%`, opacity }}
                  >
                    <div
                      className={`${s.bg} border-l-4 ${s.border} rounded-br-[4px] rounded-tr-[4px] pl-3 pr-2 py-2 flex flex-col overflow-hidden relative`}
                      style={{ height: evH }}
                    >
                      <p className="text-white text-[10px] font-bold leading-[15px] truncate">{ev.title}</p>
                      {ev.subtitle && <p className="text-white/50 text-[9px] leading-none truncate">{ev.subtitle}</p>}
                      <p className={`${s.timeColor} text-[9px] leading-[13.5px] mt-auto`}>
                        {formatTime(ev.start)} – {formatTime(ev.end)}
                      </p>
                      {/* Delete on hover */}
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteEvent(key); }}
                        className="absolute top-0.5 right-0.5 w-[14px] h-[14px] rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-500/80"
                      >
                        <span className="text-white text-[9px] leading-none font-bold">×</span>
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* 2. Study recommendations from study_recs.json
                    - calendar mode: semi-transparent dashed overlay (not yet confirmed)
                    - schedule mode: full opacity, gold/orange recommendation style + clickable */}
              {studyRecs.map((rec) => {
                if (isConfirmed(rec.index)) return null;

                const startY = time24ToY(rec.start);
                const endY   = time24ToY(rec.end);
                const evH    = Math.max(endY - startY, 30);

                const isSchedule = mode === "schedule";
                const canClick   = isSchedule && !!onRecClick;

                return (
                  <div
                    key={`rec-${rec.index}`}
                    className={`absolute p-[4px] ${canClick ? "pointer-events-auto cursor-pointer" : "pointer-events-none"}`}
                    style={{
                      top:     startY,
                      left:    `${rec.col * colW}%`,
                      right:   `${(6 - rec.col) * colW}%`,
                      opacity: isSchedule ? 1 : 0.55,
                    }}
                    onClick={canClick ? () => onRecClick(rec.index) : undefined}
                  >
                    <div
                      className={`border-l-4 border-dashed border-[#d98c5f] rounded-br-[4px] rounded-tr-[4px] pl-3 pr-2 py-2 flex flex-col overflow-hidden transition-opacity ${
                        isSchedule
                          ? "bg-[rgba(217,140,95,0.35)] hover:bg-[rgba(217,140,95,0.5)]"
                          : "bg-[rgba(217,140,95,0.12)]"
                      }`}
                      style={{ height: evH }}
                    >
                      <p className="text-white text-[10px] font-bold leading-[15px] truncate">{rec.label}</p>
                      <p className="text-white/50 text-[9px] leading-none truncate">Study Rec</p>
                      <p className="text-[#d98c5f] text-[9px] leading-[13.5px] mt-auto">
                        {formatTime(rec.start)} – {formatTime(rec.end)}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* 3. Confirmed recs & sessions added from StudyWeekGrid */}
              {addedSessions.map((s, i) => (
                <div key={`added-${i}`}>
                  {eventBlock(
                    s.day, s.start, s.end,
                    "bg-[rgba(34,197,94,0.3)]",
                    "border-[#4ade80]",
                    "text-[#bbf7d0]",
                    s.label,
                    s.sublabel,
                    1,
                  )}
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
