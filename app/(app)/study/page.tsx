"use client";

import { useState } from "react";
import StudyRooms from "./components/StudyRooms";
import StudyWeekGrid from "./components/StudyWeekGrid";

export default function StudyPage() {
  const [tab, setTab] = useState<"rooms" | "sessions">("rooms");

  return (
    <div className="p-8 max-w-[1280px] mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-black text-white text-[clamp(28px,3vw,40px)] tracking-tight">Available Rooms</h1>
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

      {tab === "rooms" ? <StudyRooms /> : <StudyWeekGrid />}
    </div>
  );
}
