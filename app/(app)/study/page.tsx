"use client";

import { useState } from "react";
import StudyRooms from "./components/StudyRooms";
import StudyWeekGrid from "./components/StudyWeekGrid";

export default function StudyPage() {
  const [tab, setTab] = useState<"rooms" | "sessions">("rooms");

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col px-6 py-4 w-full">
      {/* Page header */}
      <div className="shrink-0 flex items-center justify-between mb-3">
        <h1 className="font-black text-white text-[clamp(28px,3vw,40px)] tracking-tight">Study Hub</h1>
        <div className="flex items-center gap-2 bg-[rgba(26,24,23,0.6)] border border-white/10 rounded-xl p-1">
          <button
            onClick={() => setTab("rooms")}
            className={`px-4 py-2 text-xs font-bold tracking-[0.6px] uppercase rounded-lg transition-colors cursor-pointer ${
              tab === "rooms"
                ? "bg-[#af5a3c] text-white"
                : "text-[#9ca3af] hover:text-white"
            }`}
          >
            Study Rooms
          </button>
          <button
            onClick={() => setTab("sessions")}
            className={`px-4 py-2 text-xs font-bold tracking-[0.6px] uppercase rounded-lg transition-colors cursor-pointer ${
              tab === "sessions"
                ? "bg-[#af5a3c] text-white"
                : "text-[#9ca3af] hover:text-white"
            }`}
          >
            Study Session
          </button>
        </div>
      </div>

      {tab === "rooms" ? (
        <div className="flex-1 min-h-0 backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
          <div className="h-full overflow-y-auto p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
            <StudyRooms />
          </div>
        </div>
      ) : (
        <div className="flex-1 min-h-0 flex flex-col backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
          <StudyWeekGrid />
        </div>
      )}
    </div>
  );
}
