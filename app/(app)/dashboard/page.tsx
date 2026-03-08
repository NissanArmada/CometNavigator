"use client";

import { useState } from "react";
import CalendarHeader from "./components/CalendarHeader";
import CalendarGrid from "./components/CalendarGrid";
import ClassScheduleManager from "./components/ClassScheduleManager";

export default function DashboardPage() {
  const [tab, setTab] = useState<"calendar" | "schedule">("calendar");

  return (
    <div className="p-8 max-w-[1280px] mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
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
        <>
          <CalendarHeader />
          <CalendarGrid />
        </>
      ) : (
        <ClassScheduleManager />
      )}
    </div>
  );
}
