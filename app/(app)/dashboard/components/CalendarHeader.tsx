const imgPrevChevron = "/assets/c7511514e46fb7a591258307a05a46e31a521d68.svg";
const imgNextChevron = "/assets/2530a31389eb82f62e74108729f7bebad0349beb.svg";
const imgDropChevron = "/assets/7e3c445f81729b159a1d22a575c56332d4d66b07.svg";
const imgListIcon   = "/assets/f5d4c3142f10aa176176106648dc3b6dcbceff11.svg";
const imgWeekIcon   = "/assets/2cf2502af6917d7e5cae9ec2c90b07af17ba236d.svg";
const imgGridIcon   = "/assets/bea2eacf4ef23b91911348e417ff4e7a576d30e5.svg";
const imgPlusIcon   = "/assets/09cc71e889b87a83ccffeddeaf67f5c3d2c8bf6d.svg";

export default function CalendarHeader() {
  return (
    <div className="bg-white/5 border-b border-white/5 flex items-center justify-between px-6 py-3">
      {/* Left: nav */}
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <button className="p-[6px] rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
            <img src={imgPrevChevron} alt="prev" className="w-[4px] h-[7px] block" />
          </button>

          {/* March dropdown */}
          <div className="pl-2 relative h-9 w-24 flex items-center cursor-pointer">
            <span className="font-bold text-white text-sm">March</span>
            <img src={imgDropChevron} alt="" className="w-[21px] h-[21px] block absolute right-2 opacity-60" />
          </div>

          {/* 2026 dropdown */}
          <div className="pl-2 relative h-9 w-20 flex items-center cursor-pointer">
            <span className="font-bold text-white text-sm">2026</span>
            <img src={imgDropChevron} alt="" className="w-[21px] h-[21px] block absolute right-2 opacity-60" />
          </div>

          <button className="pl-2 p-[6px] rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
            <img src={imgNextChevron} alt="next" className="w-[4px] h-[7px] block" />
          </button>
        </div>

        <button className="bg-white/5 border border-white/10 text-white text-xs font-bold px-[17px] py-[7px] rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
          This Week
        </button>
      </div>

      {/* Right: view toggles + Add Event */}
      <div className="flex items-center gap-2">
        {/* Toggle group */}
        <div className="bg-black/40 border border-white/5 flex items-center p-[5px] rounded-lg">
          <button className="p-[6px] rounded-md cursor-pointer hover:bg-white/10 transition-colors">
            <img src={imgListIcon} alt="list" className="w-[15px] h-[13px] block opacity-60" />
          </button>
          <button className="bg-white/10 flex items-center gap-[6px] px-3 py-[10px] rounded-md cursor-pointer">
            <img src={imgWeekIcon} alt="week" className="w-[12px] h-[9px] block" />
            <span className="text-white text-xs font-bold">Week</span>
          </button>
          <button className="p-[6px] rounded-md cursor-pointer hover:bg-white/10 transition-colors">
            <img src={imgGridIcon} alt="grid" className="w-[15px] h-[15px] block opacity-60" />
          </button>
        </div>

        {/* Add Event */}
        <button className="bg-white flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer hover:bg-white/90 transition-colors">
          <img src={imgPlusIcon} alt="" className="w-[8px] h-[8px] block" />
          <span className="text-black text-xs font-bold">Add Event</span>
        </button>
      </div>
    </div>
  );
}
