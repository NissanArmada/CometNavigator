const imgTimeIcon = "/assets/b743c3ddfed387f93b0ff6eac03698574c298b7e.svg";
const imgWhyIcon  = "/assets/ee732cf4fa2314812fc26c9caa8cb3b8151bf697.svg";

function timeToH(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h + m / 60;
}

function toPercent(time: string, viewerStart: number, viewerRange: number): number {
  const pct = ((timeToH(time) - viewerStart) / viewerRange) * 100;
  return Math.max(0, Math.min(100, pct));
}

function formatH(h: number): string {
  const hour = Math.floor(h);
  const min  = Math.round((h - hour) * 60);
  return `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

function getSlotWindow(slot: TimeSlot): { viewerStart: number; viewerRange: number; labelStart: string; labelEnd: string } {
  const clubTimes = slot.events.map(e => [timeToH(e.start), timeToH(e.end)]).flat();
  if (clubTimes.length === 0) return { viewerStart: 8, viewerRange: 14, labelStart: "08:00", labelEnd: "22:00" };
  const minH = Math.min(...clubTimes);
  const maxH = Math.max(...clubTimes);
  const viewerStart = Math.max(0, minH - 2);
  const viewerEnd   = Math.min(24, maxH + 2);
  return {
    viewerStart,
    viewerRange: viewerEnd - viewerStart,
    labelStart:  formatH(viewerStart),
    labelEnd:    formatH(viewerEnd),
  };
}

const calTypeStyle: Record<string, string> = {
  "Class":        "border-[#60a5fa]  bg-[rgba(59,130,246,0.25)]",
  "Study Session":"border-[#4ade80]  bg-[rgba(34,197,94,0.2)]",
  "Club Meeting": "border-[#d98c5f]  bg-[rgba(217,140,95,0.2)]",
  "Personal":     "border-[#9ca3af]  bg-[rgba(107,114,128,0.15)]",
  "Exam":         "border-[#ef4444]  bg-[rgba(239,68,68,0.2)]",
};

type CalendarEvent = { name: string; start: string; end: string; type: string };
type SlotEvent     = { name: string; start: string; end: string; color: "orange" | "gold" };
type TimeSlot      = { label: string; events: SlotEvent[]; calendarEvents: CalendarEvent[] };

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
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className={`${iconBg} flex items-center justify-center rounded-2xl w-14 h-14 shrink-0`}>
            <img src={icon} alt="" className="w-8 h-8 block" />
          </div>
          <button className="bg-white/5 border border-white/10 text-white text-xs font-bold tracking-[1.2px] uppercase px-6 py-2.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer shrink-0">
            Join Mission
          </button>
        </div>
        <div>
          <h3 className="font-bold text-white text-2xl leading-8">{name}</h3>
          <p className="font-extrabold text-[#b05b3d] text-[10px] tracking-[2px] uppercase">{match} Profile Match</p>
        </div>
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={imgTimeIcon} alt="" className="w-3 h-3 block" />
            <span className="font-extrabold text-[#d98c5f] text-xs tracking-[1.2px] uppercase">Daily Time Slot Viewer</span>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-sm bg-[rgba(59,130,246,0.5)] border border-[#60a5fa]" />
              <span className="text-[#6b7280] text-[8px] font-bold uppercase tracking-wide">Your Schedule</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-sm bg-[rgba(176,91,61,0.5)] border border-[#b05b3d]" />
              <span className="text-[#6b7280] text-[8px] font-bold uppercase tracking-wide">Club Event</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 h-[215px]">
          {slots.map((slot) => {
            const { viewerStart, viewerRange, labelStart, labelEnd } = getSlotWindow(slot);
            const pct = (t: string) => toPercent(t, viewerStart, viewerRange);
            return (
              <div key={slot.label} className="flex flex-col gap-2">
                <p className="font-bold text-[#6b7280] text-[10px] text-center tracking-[-0.5px] uppercase">{slot.label}</p>
                <div className="bg-black/20 border border-white/5 rounded-lg flex-1 relative overflow-hidden">
                  {/* Hour guide lines */}
                  {[20, 40, 60, 80].map((p) => (
                    <div key={p} className="absolute left-0 right-0 h-px bg-white/5" style={{ top: `${p}%` }} />
                  ))}
                  {/* Time labels */}
                  <span className="absolute left-1 top-1 text-[#4b5563] text-[8px] font-mono">{labelStart}</span>
                  <span className="absolute left-1 bottom-1 text-[#4b5563] text-[8px] font-mono">{labelEnd}</span>

                  {/* User's calendar events */}
                  {slot.calendarEvents.map((ev) => {
                    const top    = pct(ev.start);
                    const bottom = 100 - pct(ev.end);
                    const height = pct(ev.end) - top;
                    const style  = calTypeStyle[ev.type] ?? calTypeStyle["Class"];
                    return (
                      <div
                        key={ev.name}
                        title={`${ev.name} (${ev.start}–${ev.end})`}
                        className={`absolute left-0 right-0 mx-1 border-l-[3px] rounded pl-1 pr-1 flex items-center overflow-hidden ${style}`}
                        style={{ top: `${top}%`, bottom: `${bottom}%`, minHeight: 4 }}
                      >
                        {height > 8 && (
                          <p className="text-white/70 font-bold text-[7px] leading-none truncate">{ev.name}</p>
                        )}
                      </div>
                    );
                  })}

                  {/* Club meeting events */}
                  {slot.events.map((ev) => {
                    const top    = pct(ev.start);
                    const bottom = 100 - pct(ev.end);
                    const height = pct(ev.end) - top;
                    return (
                      <div
                        key={ev.name}
                        title={`${ev.name} (${ev.start}–${ev.end})`}
                        className={`absolute left-0 right-0 mx-1 border-l-[3px] rounded pl-2 pr-1 flex flex-col justify-center ${
                          ev.color === "orange"
                            ? "border-[#b05b3d] bg-gradient-to-r from-[rgba(176,91,61,0.55)] to-[rgba(176,91,61,0.2)]"
                            : "border-[#d98c5f] bg-gradient-to-r from-[rgba(217,140,95,0.55)] to-[rgba(217,140,95,0.2)]"
                        }`}
                        style={{ top: `${top}%`, bottom: `${bottom}%`, minHeight: 4 }}
                      >
                        {height > 8 && (
                          <p className="text-white font-bold text-[9px] leading-none truncate">{ev.name}</p>
                        )}
                        {height > 14 && (
                          <p className="text-white/70 text-[8px] leading-none">{ev.start} – {ev.end}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
