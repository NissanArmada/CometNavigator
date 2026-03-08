import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";

const imgGearIcon     = "/assets/f3d58c36969de219035f8384f9bfd34f7064524d.svg";
const imgGradCapIcon  = "/assets/29260df46ef9baa6c39f06b1689cfc3b0f1afe8a.svg";
const imgClockIcon    = "/assets/201c1dc27d5ca0ad3abc26eaf66cb0b6e322e033.svg";
const imgChevronIcon  = "/assets/ae77ef9f532ecb945bc2bd5470d5cb196f69499a.svg";

export default function ClassScheduleManager() {
  return (
    <div className="flex gap-6 w-full h-full">
      {/* Left: full calendar */}
      <div className="flex-1 min-w-0 backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
        <CalendarHeader />
        <CalendarGrid />
      </div>

      {/* Right: Recommendations */}
      <div className="w-[280px] shrink-0 backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.37)] flex flex-col">
        {/* Panel header */}
        <div className="bg-white/5 border-b border-white/5 px-5 py-3 flex items-center justify-between shrink-0">
          <span className="text-[#d98c5f] text-[12px] font-extrabold tracking-[2.4px] uppercase">Recommendations</span>
          <img src={imgGearIcon} alt="" className="w-[12px] h-[12px] block opacity-70" />
        </div>

        <div className="flex flex-col gap-3 p-3 flex-1 overflow-y-auto">
          {/* Primary expanded card */}
          <div className="bg-white/10 border border-[rgba(176,91,61,0.3)] rounded-xl p-4 flex flex-col gap-3 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-3">
              <div className="bg-[rgba(176,91,61,0.2)] border border-[rgba(176,91,61,0.4)] rounded-lg w-9 h-9 flex items-center justify-center shrink-0">
                <img src={imgGradCapIcon} alt="" className="w-[20px] h-[16px] block" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#d98c5f] text-[10px] font-extrabold tracking-[1px] uppercase">Primary Choice</span>
                <p className="text-white font-bold text-sm leading-5">Adv. Martian Logistics & Habitation</p>
              </div>
            </div>

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

            <div className="flex flex-col gap-1">
              <span className="text-[#9ca3af] text-[9px] font-extrabold tracking-[0.9px] uppercase">Description</span>
              <p className="text-[#9ca3af] text-[11px] leading-[1.5]">
                Based on your current mission trajectory. Focuses on emergency resource allocation and sustainable habitat cycling protocols in Sector 7.
              </p>
            </div>

            <button className="bg-[#b05b3d] w-full py-2.5 rounded-lg text-white text-[10px] font-extrabold tracking-[1px] uppercase cursor-pointer hover:bg-[#9a4f35] transition-colors">
              Confirm Schedule Slot
            </button>
          </div>

          {/* Option A */}
          <div className="bg-white/5 border border-white/5 rounded-xl flex items-center gap-3 p-4 cursor-pointer hover:border-white/10 transition-colors">
            <div className="bg-[rgba(59,130,246,0.2)] border border-[rgba(59,130,246,0.3)] rounded-lg w-10 h-10 flex items-center justify-center shrink-0">
              <span className="text-white text-base font-extrabold">A</span>
            </div>
            <div className="flex-1 flex flex-col gap-1 min-w-0">
              <p className="text-white font-bold text-sm leading-5 truncate">Oxygen Scrubbing Systems</p>
              <div className="flex items-center gap-1">
                <img src={imgClockIcon} alt="" className="w-[9px] h-[10px] block opacity-60 shrink-0" />
                <span className="text-[#9ca3af] text-[11px]">16:30 - 17:30</span>
              </div>
            </div>
            <img src={imgChevronIcon} alt="" className="w-[7px] h-[4px] block opacity-50 shrink-0" />
          </div>

          {/* Option B */}
          <div className="bg-white/5 border border-white/5 rounded-xl flex items-center gap-3 p-4 cursor-pointer hover:border-white/10 transition-colors">
            <div className="bg-[rgba(34,197,94,0.2)] border border-[rgba(34,197,94,0.3)] rounded-lg w-10 h-10 flex items-center justify-center shrink-0">
              <span className="text-white text-base font-extrabold">B</span>
            </div>
            <div className="flex-1 flex flex-col gap-1 min-w-0">
              <p className="text-white font-bold text-sm leading-5 truncate">Flora Hydration Protocols</p>
              <div className="flex items-center gap-1">
                <img src={imgClockIcon} alt="" className="w-[9px] h-[10px] block opacity-60 shrink-0" />
                <span className="text-[#9ca3af] text-[11px]">16:45 - 17:45</span>
              </div>
            </div>
            <img src={imgChevronIcon} alt="" className="w-[7px] h-[4px] block opacity-50 shrink-0" />
          </div>
        </div>

        {/* Refresh button */}
        <div className="p-3 border-t border-white/5 shrink-0">
          <button className="bg-white/5 border border-white/10 w-full py-2.5 rounded-xl text-[#9ca3af] text-[10px] font-extrabold tracking-[1px] uppercase cursor-pointer hover:bg-white/10 transition-colors">
            Refresh Suggestions
          </button>
        </div>
      </div>
    </div>
  );
}
