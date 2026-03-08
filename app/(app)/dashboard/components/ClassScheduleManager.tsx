"use client";

import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import { studyRecs } from "../data";
import { useCalendar } from "../../CalendarContext";

const imgGearIcon    = "/assets/f3d58c36969de219035f8384f9bfd34f7064524d.svg";
const imgGradCapIcon = "/assets/29260df46ef9baa6c39f06b1689cfc3b0f1afe8a.svg";
const imgClockIcon   = "/assets/201c1dc27d5ca0ad3abc26eaf66cb0b6e322e033.svg";
const imgChevronIcon = "/assets/ae77ef9f532ecb945bc2bd5470d5cb196f69499a.svg";

function formatTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour   = h % 12 || 12;
  return m === 0 ? `${hour}:00 ${period}` : `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function durationMin(start: string, end: string): number {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  return (eh * 60 + em) - (sh * 60 + sm);
}

export default function ClassScheduleManager() {
  const { confirmRec, isConfirmed } = useCalendar();
  // which rec index is expanded — default to first rec
  const [expandedIndex, setExpandedIndex] = useState<number>(studyRecs[0].index);

  const toggle = (index: number) =>
    setExpandedIndex(prev => (prev === index ? -1 : index));

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full h-full min-h-0">
      {/* Left: calendar — calendar events dimmed, study recs highlighted */}
      <div className="flex-1 min-w-0 min-h-0 flex flex-col backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
        <CalendarHeader />
        <CalendarGrid mode="schedule" onRecClick={(idx) => setExpandedIndex(idx)} />
      </div>

      {/* Right: Recommendations sidebar */}
      <div className="w-full lg:w-[280px] shrink-0 backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.37)] flex flex-col min-h-0">
        {/* Panel header */}
        <div className="bg-white/5 border-b border-white/5 px-5 py-3 flex items-center justify-between shrink-0">
          <span className="text-[#d98c5f] text-[12px] font-extrabold tracking-[2.4px] uppercase">
            Recommendations
          </span>
          <img src={imgGearIcon} alt="" className="w-[12px] h-[12px] block opacity-70" />
        </div>

        <div className="flex flex-col gap-1.5 p-2.5 flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
          {studyRecs.map((rec) => {
            const expanded  = expandedIndex === rec.index;
            const confirmed = isConfirmed(rec.index);

            return (
              <div
                key={rec.index}
                onClick={() => toggle(rec.index)}
                className={`rounded-xl border transition-colors overflow-hidden cursor-pointer ${
                  expanded
                    ? "bg-white/10 border-[rgba(176,91,61,0.3)] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]"
                    : confirmed
                    ? "bg-white/5 border-[rgba(34,197,94,0.25)] opacity-70"
                    : "bg-white/5 border-white/5 hover:border-white/10"
                }`}
              >
                {/* Header row — single line when collapsed, slightly taller when expanded */}
                <div className={`flex items-center gap-2 ${expanded ? "px-3 pt-3 pb-1.5" : "px-2.5 py-1.5"}`}>
                  {/* Badge / icon */}
                  {expanded ? (
                    <div className="bg-[rgba(176,91,61,0.2)] border border-[rgba(176,91,61,0.4)] rounded-md w-6 h-6 flex items-center justify-center shrink-0">
                      <img src={imgGradCapIcon} alt="" className="w-[12px] h-[10px] block" />
                    </div>
                  ) : (
                    <div className="rounded-md w-6 h-6 flex items-center justify-center shrink-0 bg-[rgba(217,140,95,0.12)] border border-[rgba(217,140,95,0.2)]">
                      <span className="text-[#d98c5f] text-[10px] font-extrabold">{rec.index}</span>
                    </div>
                  )}

                  {/* Label + inline time when collapsed */}
                  <div className="flex-1 min-w-0">
                    {expanded && (
                      <span className="text-[#d98c5f] text-[9px] font-extrabold tracking-[1px] uppercase leading-none block mb-0.5">
                        Primary Choice
                      </span>
                    )}
                    <div className="flex items-baseline gap-1.5 min-w-0">
                      <p className="text-white font-bold text-[11px] leading-none truncate shrink-0 max-w-[120px]">{rec.label}</p>
                      {!expanded && (
                        <span className="text-[#9ca3af] text-[9px] truncate">
                          {DAY_LABELS[rec.col]} · {formatTime(rec.start)}–{formatTime(rec.end)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right indicator */}
                  {confirmed && !expanded ? (
                    <span className="text-[#4ade80] text-[9px] font-extrabold shrink-0">✓</span>
                  ) : (
                    <img
                      src={imgChevronIcon}
                      alt=""
                      className={`w-[7px] h-[4px] block opacity-40 shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                    />
                  )}
                </div>

                {/* Expanded details */}
                {expanded && (
                  <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-3 px-3 pb-3">
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-0.5 flex-1">
                        <span className="text-[#9ca3af] text-[9px] font-extrabold tracking-[0.9px] uppercase">Day</span>
                        <span className="text-white text-xs font-bold">{DAY_LABELS[rec.col]}</span>
                      </div>
                      <div className="flex flex-col gap-0.5 flex-1">
                        <span className="text-[#9ca3af] text-[9px] font-extrabold tracking-[0.9px] uppercase">Duration</span>
                        <span className="text-white text-xs font-bold">{durationMin(rec.start, rec.end)} min</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <span className="text-[#9ca3af] text-[9px] font-extrabold tracking-[0.9px] uppercase">Study Slot</span>
                      <div className="flex items-center gap-1">
                        <img src={imgClockIcon} alt="" className="w-[9px] h-[10px] block opacity-60 shrink-0" />
                        <span className="text-white text-xs font-bold">
                          {formatTime(rec.start)} – {formatTime(rec.end)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[#9ca3af] text-[9px] font-extrabold tracking-[0.9px] uppercase">Why</span>
                      <p className="text-[#9ca3af] text-[11px] leading-[1.5]">{rec.reason}</p>
                    </div>

                    {confirmed ? (
                      <div className="bg-[rgba(34,197,94,0.15)] border border-[rgba(34,197,94,0.3)] w-full py-2.5 rounded-lg text-[#4ade80] text-[10px] font-extrabold tracking-[1px] uppercase text-center">
                        ✓ Added to Calendar
                      </div>
                    ) : (
                      <button
                        onClick={() => confirmRec(rec)}
                        className="bg-[#b05b3d] w-full py-2.5 rounded-lg text-white text-[10px] font-extrabold tracking-[1px] uppercase cursor-pointer hover:bg-[#9a4f35] transition-colors"
                      >
                        Confirm Schedule Slot
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Refresh */}
        <div className="p-3 border-t border-white/5 shrink-0">
          <button
            onClick={() => setExpandedIndex(studyRecs[0].index)}
            className="bg-white/5 border border-white/10 w-full py-2.5 rounded-xl text-[#9ca3af] text-[10px] font-extrabold tracking-[1px] uppercase cursor-pointer hover:bg-white/10 transition-colors"
          >
            Refresh Suggestions
          </button>
        </div>
      </div>
    </div>
  );
}
