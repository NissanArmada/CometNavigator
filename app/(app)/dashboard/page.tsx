"use client";

import { useState } from "react";
import CalendarHeader from "./components/CalendarHeader";
import CalendarGrid from "./components/CalendarGrid";
import ClassScheduleManager from "./components/ClassScheduleManager";

export default function DashboardPage() {
  const [tab, setTab] = useState<"calendar" | "schedule">("calendar");

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col px-6 py-4 w-full">
      {/* Page header */}
      <div className="shrink-0 flex items-center justify-between mb-3">
        <h1 className="font-black text-white text-[clamp(28px,3vw,40px)] tracking-tight">Mission Schedule</h1>
        <div className="flex items-center gap-2 bg-[rgba(26,24,23,0.6)] border border-white/10 rounded-xl p-1">
          <button
            onClick={() => setTab("calendar")}
            className={`px-4 py-2 text-xs font-bold tracking-[0.6px] uppercase rounded-lg transition-colors cursor-pointer ${
              tab === "calendar"
                ? "bg-[#af5a3c] text-white"
                : "text-[#9ca3af] hover:text-white"
            }`}
          >
            Calendar System
          </button>
          <button
            onClick={() => setTab("schedule")}
            className={`px-4 py-2 text-xs font-bold tracking-[0.6px] uppercase rounded-lg transition-colors cursor-pointer ${
              tab === "schedule"
                ? "bg-[#af5a3c] text-white"
                : "text-[#9ca3af] hover:text-white"
            }`}
          >
            Class Schedule Manager
          </button>
        </div>
      </div>

      {tab === "calendar" ? (
        <div className="flex-1 min-h-0 flex flex-col backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
          <CalendarHeader />
          <CalendarGrid />
        </div>
      ) : (
        <div className="flex-1 min-h-0">
          <ClassScheduleManager />
        </div>
      )}
    </div>
  );
}
