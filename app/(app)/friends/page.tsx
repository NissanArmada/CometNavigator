"use client";

import { useState } from "react";
import FriendsList from "./components/FriendsList";
import MatchCard from "./components/MatchCard";

export default function FriendsPage() {
  const [tab, setTab] = useState<"friends" | "matching">("friends");

  return (
    <div className="p-4 sm:p-8 max-w-[1280px] mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="font-extrabold text-white text-[clamp(28px,3vw,36px)] tracking-[-0.9px]">Mission Personnel</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-[#d98c5f]" />
            <span className="font-medium text-[#d98c5f] text-base">Connecting with Crewmates</span>
          </div>
        </div>
        <div className="bg-[rgba(26,24,23,0.6)] border border-[rgba(176,91,61,0.2)] flex items-center p-1 rounded-xl gap-0">
          <button
            onClick={() => setTab("friends")}
            className={`px-5 py-2 rounded-lg text-xs font-bold tracking-[0.6px] uppercase transition-colors cursor-pointer ${
              tab === "friends" ? "bg-[#b05b3d] text-white shadow-sm" : "text-[#9ca3af] hover:text-white"
            }`}
          >
            Your Friends
          </button>
          <button
            onClick={() => setTab("matching")}
            className={`px-5 py-2 rounded-lg text-xs font-bold tracking-[0.6px] uppercase transition-colors cursor-pointer ${
              tab === "matching" ? "bg-[#b05b3d] text-white shadow-sm" : "text-[#9ca3af] hover:text-white"
            }`}
          >
            Matching
          </button>
        </div>
      </div>

      {/* Content */}
      {tab === "friends" ? (
        <FriendsList activeTab={tab} onTabChange={setTab} />
      ) : (
        <MatchCard />
      )}
    </div>
  );
}
