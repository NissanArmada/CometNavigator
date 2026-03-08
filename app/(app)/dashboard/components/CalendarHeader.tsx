"use client";

export default function CalendarHeader() {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* Left: month/year nav */}
      <div className="flex items-center gap-3">
        <button className="w-7 h-7 flex items-center justify-center text-[#9ca3af] hover:text-white transition-colors cursor-pointer">
          ‹
        </button>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 text-white font-medium text-sm hover:text-[#af5a3c] transition-colors cursor-pointer">
            March <span className="text-[#9ca3af]">▾</span>
          </button>
          <button className="flex items-center gap-1 text-white font-medium text-sm hover:text-[#af5a3c] transition-colors cursor-pointer">
            2026 <span className="text-[#9ca3af]">▾</span>
          </button>
        </div>
        <button className="w-7 h-7 flex items-center justify-center text-[#9ca3af] hover:text-white transition-colors cursor-pointer">
          ›
        </button>
        <button className="border border-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer ml-1">
          This Week
        </button>
      </div>

      {/* Right: view toggles + add */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-white/5 rounded-lg p-1 gap-1">
          <button className="p-1.5 rounded text-[#9ca3af] hover:text-white transition-colors cursor-pointer">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <rect x="1" y="1" width="6" height="6" rx="1" /><rect x="9" y="1" width="6" height="6" rx="1" />
              <rect x="1" y="9" width="6" height="6" rx="1" /><rect x="9" y="9" width="6" height="6" rx="1" />
            </svg>
          </button>
          <button className="px-3 py-1.5 rounded bg-[#af5a3c] text-white text-xs font-bold tracking-wide cursor-pointer">
            Week
          </button>
          <button className="p-1.5 rounded text-[#9ca3af] hover:text-white transition-colors cursor-pointer">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <rect x="1" y="1" width="14" height="3" rx="1" /><rect x="1" y="6.5" width="14" height="3" rx="1" />
              <rect x="1" y="12" width="14" height="3" rx="1" />
            </svg>
          </button>
        </div>
        <button className="flex items-center gap-1.5 bg-[#af5a3c] text-white text-sm font-bold px-4 py-2 rounded-xl shadow-[0_4px_12px_rgba(175,90,60,0.3)] hover:bg-[#9a4f35] transition-colors cursor-pointer">
          <span className="text-lg leading-none">+</span> Add Event
        </button>
      </div>
    </div>
  );
}
