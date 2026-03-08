const imgTimeIcon = "http://localhost:3845/assets/b743c3ddfed387f93b0ff6eac03698574c298b7e.svg";
const imgWhyIcon = "http://localhost:3845/assets/ee732cf4fa2314812fc26c9caa8cb3b8151bf697.svg";

type TimeSlot = { label: string; events: { name: string; time: string; color: "orange" | "gold" }[] };

type ClubCardProps = {
  icon: string;
  iconBg: string;
  name: string;
  match: string;
  whyText: string;
  slots: TimeSlot[];
};

export default function ClubCard({ icon, iconBg, name, match, whyText, slots }: ClubCardProps) {
  return (
    <div className="backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] rounded-3xl p-8 flex flex-col gap-6 flex-1 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
      {/* Club header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`${iconBg} flex items-center justify-center rounded-2xl w-14 h-14 shrink-0`}>
            <img src={icon} alt="" className="w-8 h-8 block" />
          </div>
          <div>
            <h3 className="font-bold text-white text-2xl leading-8">{name}</h3>
            <p className="font-extrabold text-[#b05b3d] text-[10px] tracking-[2px] uppercase">{match} Profile Match</p>
          </div>
        </div>
        <button className="bg-white/5 border border-white/10 text-white text-xs font-bold tracking-[1.2px] uppercase px-6 py-2.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer shrink-0">
          Join Mission
        </button>
      </div>

      {/* Why it fits */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <img src={imgWhyIcon} alt="" className="w-3 h-3 block" />
          <span className="font-extrabold text-[#d98c5f] text-xs tracking-[1.2px] uppercase">Why it fits you</span>
        </div>
        <p className="text-[#d1d5db] text-sm leading-[22.75px]">{whyText}</p>
      </div>

      {/* Daily time slot viewer */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col gap-4 flex-1">
        <div className="flex items-center gap-2">
          <img src={imgTimeIcon} alt="" className="w-3 h-3 block" />
          <span className="font-extrabold text-[#d98c5f] text-xs tracking-[1.2px] uppercase">Daily Time Slot Viewer</span>
        </div>
        <div className="grid grid-cols-2 gap-4 h-[215px]">
          {slots.map((slot) => (
            <div key={slot.label} className="flex flex-col gap-2">
              <p className="font-bold text-[#6b7280] text-[10px] text-center tracking-[-0.5px] uppercase">{slot.label}</p>
              <div className="bg-black/20 border border-white/5 rounded-lg flex-1 relative overflow-hidden">
                {/* Grid lines */}
                {[25, 50, 75].map((pct) => (
                  <div key={pct} className="absolute left-0 right-0 h-px bg-white/5" style={{ top: `${pct}%` }} />
                ))}
                <span className="absolute left-1 top-1 text-[#4b5563] text-[8px] font-mono">08:00</span>
                <span className="absolute left-1 bottom-1 text-[#4b5563] text-[8px] font-mono">18:00</span>
                {slot.events.map((ev) => (
                  <div
                    key={ev.name}
                    className={`absolute left-0 right-0 mx-1 border-l-[3px] rounded pl-2 pr-1 flex flex-col justify-center ${
                      ev.color === "orange"
                        ? "border-[#b05b3d] bg-gradient-to-r from-[rgba(176,91,61,0.4)] to-[rgba(176,91,61,0.1)]"
                        : "border-[#d98c5f] bg-gradient-to-r from-[rgba(217,140,95,0.4)] to-[rgba(217,140,95,0.1)]"
                    }`}
                    style={{ top: "60%", bottom: "20%" }}
                  >
                    <p className="text-white font-bold text-[9px] leading-none">{ev.name}</p>
                    <p className="text-white/70 text-[8px]">{ev.time}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
