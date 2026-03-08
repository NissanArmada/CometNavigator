const imgGearIcon = "http://localhost:3845/assets/f3d58c36969de219035f8384f9bfd34f7064524d.svg";
const imgGradCapIcon = "http://localhost:3845/assets/29260df46ef9baa6c39f06b1689cfc3b0f1afe8a.svg";
const imgClockIcon = "http://localhost:3845/assets/201c1dc27d5ca0ad3abc26eaf66cb0b6e322e033.svg";
const imgChevronIcon = "http://localhost:3845/assets/ae77ef9f532ecb945bc2bd5470d5cb196f69499a.svg";

// Calendar sub-assets (reused from CalendarHeader)
const imgPrevChevron = "http://localhost:3845/assets/c7511514e46fb7a591258307a05a46e31a521d68.svg";
const imgNextChevron = "http://localhost:3845/assets/2530a31389eb82f62e74108729f7bebad0349beb.svg";
const imgDropChevron = "http://localhost:3845/assets/7e3c445f81729b159a1d22a575c56332d4d66b07.svg";
const imgListIcon = "http://localhost:3845/assets/f5d4c3142f10aa176176106648dc3b6dcbceff11.svg";
const imgWeekIcon = "http://localhost:3845/assets/2cf2502af6917d7e5cae9ec2c90b07af17ba236d.svg";
const imgGridIcon = "http://localhost:3845/assets/bea2eacf4ef23b91911348e417ff4e7a576d30e5.svg";
const imgPlusIcon = "http://localhost:3845/assets/09cc71e889b87a83ccffeddeaf67f5c3d2c8bf6d.svg";

const days = [
  { short: "MON", num: "2" },
  { short: "TUE", num: "3" },
  { short: "WED", num: "4" },
  { short: "THU", num: "5" },
  { short: "FRI", num: "6" },
  { short: "SAT", num: "7", active: true },
  { short: "SUN", num: "8" },
];

const times = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"];

export default function ClassScheduleManager() {
  return (
    <div className="flex gap-8 w-full">
      {/* Left: Calendar */}
      <div className="flex-1 backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] rounded-2xl overflow-hidden shadow-[0_8px_32px_0px_rgba(0,0,0,0.37)]">
        {/* Calendar toolbar */}
        <div className="bg-white/5 border-b border-white/5 flex items-center justify-between px-6 py-[22px]">
          {/* Month/year nav */}
          <div className="flex items-center gap-4">
            <button className="p-1.5 rounded-lg cursor-pointer hover:bg-white/5">
              <img src={imgPrevChevron} alt="prev" className="w-[4px] h-[7px] block" />
            </button>
            <div className="flex items-center gap-2">
              <div className="relative h-9 w-24 flex items-center">
                <span className="font-bold text-white text-sm">March</span>
                <img src={imgDropChevron} alt="" className="w-[21px] h-[21px] block ml-auto opacity-60" />
              </div>
              <div className="relative h-9 w-20 flex items-center">
                <span className="font-bold text-white text-sm">2026</span>
                <img src={imgDropChevron} alt="" className="w-[21px] h-[21px] block ml-auto opacity-60" />
              </div>
            </div>
            <button className="p-1.5 rounded-lg cursor-pointer hover:bg-white/5">
              <img src={imgNextChevron} alt="next" className="w-[4px] h-[7px] block" />
            </button>
            <button className="bg-white/5 border border-white/10 text-white text-xs font-bold px-4 py-[7px] rounded-lg cursor-pointer hover:bg-white/10">
              This Week
            </button>
          </div>
          {/* View toggles + Add Event */}
          <div className="flex items-center gap-2">
            <div className="bg-black/40 border border-white/5 flex items-center p-[5px] rounded-lg gap-px">
              <button className="p-1.5 rounded-md cursor-pointer hover:bg-white/10">
                <img src={imgListIcon} alt="list" className="w-[15px] h-[13px] block" />
              </button>
              <button className="bg-white/10 flex items-center gap-1.5 px-3 py-2.5 rounded-md cursor-pointer">
                <img src={imgWeekIcon} alt="week" className="w-[12px] h-[9px] block" />
                <span className="text-white text-xs font-bold">Week</span>
              </button>
              <button className="p-1.5 rounded-md cursor-pointer hover:bg-white/10">
                <img src={imgGridIcon} alt="grid" className="w-[15px] h-[15px] block" />
              </button>
            </div>
            <button className="bg-white flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer hover:bg-white/90">
              <img src={imgPlusIcon} alt="" className="w-[8px] h-[8px] block" />
              <span className="text-black text-xs font-bold">Add Event</span>
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div className="bg-black/20 border-b border-white/10 flex">
          <div className="w-16 shrink-0" />
          {days.map((d) => (
            <div key={d.short} className="flex-1 border-r border-white/5 last:border-r-0 py-4 flex flex-col items-center gap-1">
              <span className="text-[#6b7280] text-[9px] font-extrabold tracking-[0.9px] uppercase">{d.short}</span>
              <span className={`text-sm font-bold leading-5 w-7 h-7 flex items-center justify-center rounded-full ${d.active ? "bg-white text-[#1a1817]" : "text-[#d1d5db]"}`}>
                {d.num}
              </span>
            </div>
          ))}
        </div>

        {/* Time grid */}
        <div className="relative">
          {times.map((time) => (
            <div key={time} className="flex border-b border-white/5 last:border-b-0 h-16">
              <div className="w-16 shrink-0 flex items-start justify-end pr-3 pt-2">
                <span className="text-[#6b7280] text-[10px]">{time}</span>
              </div>
              {days.map((d, i) => (
                <div key={i} className="flex-1 border-r border-white/5 last:border-r-0 relative">
                  {/* Daily Standup Meeting on SAT at 11 AM */}
                  {d.active && time === "11 AM" && (
                    <div className="absolute top-0 left-1 right-1 bg-[#3b5bdb] rounded-md p-1.5 z-10 h-[calc(100%+4rem)]">
                      <p className="text-white text-[10px] font-bold leading-tight">Daily Standup Meeting</p>
                      <p className="text-white/70 text-[9px] mt-0.5">12:15 PM - 1:00 PM</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Recommendations */}
      <div className="w-[295px] shrink-0 backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] rounded-2xl overflow-hidden shadow-[0_8px_32px_0px_rgba(0,0,0,0.37)] flex flex-col">
        {/* Panel header */}
        <div className="bg-white/5 border-b border-white/5 px-5 py-4 flex items-center justify-between">
          <span className="text-[#d98c5f] text-[12px] font-extrabold tracking-[2.4px] uppercase">Recommendations</span>
          <img src={imgGearIcon} alt="" className="w-[12px] h-[12px] block opacity-70" />
        </div>

        <div className="flex flex-col gap-3 p-3 flex-1 overflow-y-auto">
          {/* Primary expanded card */}
          <div className="bg-white/10 border border-[rgba(176,91,61,0.3)] rounded-xl p-5 flex flex-col gap-4 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]">
            {/* Header row */}
            <div className="flex items-center gap-3">
              <div className="bg-[rgba(176,91,61,0.2)] border border-[rgba(176,91,61,0.4)] rounded-lg w-[37px] h-10 flex items-center justify-center shrink-0">
                <img src={imgGradCapIcon} alt="" className="w-[22px] h-[18px] block" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#d98c5f] text-[10px] font-extrabold tracking-[1px] uppercase">Primary Choice</span>
                <p className="text-white font-bold text-[16px] leading-6">Adv. Martian Logistics & Habitation</p>
              </div>
            </div>

            {/* Instructor / Duration */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-0.5 flex-1">
                <span className="text-[#9ca3af] text-[9px] font-extrabold tracking-[0.9px] uppercase">Instructor</span>
                <span className="text-white text-xs font-bold">Dr. Aris Thorne</span>
              </div>
              <div className="flex flex-col gap-0.5 flex-1">
                <span className="text-[#9ca3af] text-[9px] font-extrabold tracking-[0.9px] uppercase">Duration</span>
                <span className="text-white text-xs font-bold">60 Minutes</span>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <span className="text-[#9ca3af] text-[9px] font-extrabold tracking-[0.9px] uppercase">Description</span>
              <p className="text-[#9ca3af] text-[11px] leading-[1.5]">
                This recommendation is based on your current mission trajectory. Focuses on the efficient allocation of emergency resources and sustainable habitat cycling protocols in Sector 7.
              </p>
            </div>

            {/* CTA */}
            <button className="bg-[#b05b3d] w-full py-3 rounded-lg text-white text-[10px] font-extrabold tracking-[1px] uppercase cursor-pointer hover:bg-[#9a4f35] transition-colors shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
              Confirm Schedule Slot
            </button>
          </div>

          {/* Collapsed option A */}
          <div className="bg-white/5 border border-white/5 rounded-xl flex items-center gap-4 p-[17px] cursor-pointer hover:border-white/10 transition-colors">
            <div className="bg-[rgba(59,130,246,0.2)] border border-[rgba(59,130,246,0.3)] rounded-lg w-12 py-1 flex items-center justify-center shrink-0">
              <span className="text-white text-[18px] font-extrabold">A</span>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-white font-bold text-sm leading-5">Oxygen Scrubbing Systems</p>
              <div className="flex items-center gap-1">
                <img src={imgClockIcon} alt="" className="w-[9px] h-[10px] block opacity-60" />
                <span className="text-[#9ca3af] text-[11px]">16:30 - 17:30</span>
              </div>
            </div>
            <img src={imgChevronIcon} alt="" className="w-[7px] h-[4px] block opacity-50" />
          </div>

          {/* Collapsed option B */}
          <div className="bg-white/5 border border-white/5 rounded-xl flex items-center gap-4 p-[17px] cursor-pointer hover:border-white/10 transition-colors">
            <div className="bg-[rgba(34,197,94,0.2)] border border-[rgba(34,197,94,0.3)] rounded-lg w-12 py-1 flex items-center justify-center shrink-0">
              <span className="text-white text-[18px] font-extrabold">B</span>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-white font-bold text-sm leading-5">Flora Hydration Protocols</p>
              <div className="flex items-center gap-1">
                <img src={imgClockIcon} alt="" className="w-[9px] h-[10px] block opacity-60" />
                <span className="text-[#9ca3af] text-[11px]">16:45 - 17:45</span>
              </div>
            </div>
            <img src={imgChevronIcon} alt="" className="w-[7px] h-[4px] block opacity-50" />
          </div>
        </div>

        {/* Refresh button */}
        <div className="p-3 border-t border-white/5">
          <button className="bg-[rgba(255,255,255,0.05)] border border-white/10 w-full py-3 rounded-xl text-[#9ca3af] text-[10px] font-extrabold tracking-[1px] uppercase cursor-pointer hover:bg-white/10 transition-colors">
            Refresh Suggestions
          </button>
        </div>
      </div>
    </div>
  );
}
