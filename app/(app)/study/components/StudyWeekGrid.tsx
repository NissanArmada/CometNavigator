const days = [
  { short: "MON", num: "12" },
  { short: "TUE", num: "13" },
  { short: "WED", num: "14" },
  { short: "THU", num: "15", today: true },
  { short: "FRI", num: "16" },
  { short: "SAT", num: "17" },
  { short: "SUN", num: "18" },
];

const hours = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

type Event = {
  day: number;
  startRow: number;
  span: number;
  label: string;
  sublabel?: string;
  type: "theory" | "workshop" | "practical" | "family" | "safety" | "maint" | "field" | "personal" | "other";
  badge?: string;
};

const typeColors: Record<Event["type"], string> = {
  theory:    "border-[#af5a3c] bg-[rgba(175,90,60,0.15)] text-[#af5a3c]",
  workshop:  "border-[#d98c5f] bg-[rgba(217,140,95,0.15)] text-[#d98c5f]",
  practical: "border-[#64748b] bg-[rgba(100,116,139,0.15)] text-[#94a3b8]",
  family:    "border-[#4b5563] bg-[rgba(75,85,99,0.15)] text-[#9ca3af]",
  safety:    "border-[#ef4444] bg-[rgba(239,68,68,0.1)] text-[#ef4444]",
  maint:     "border-[#6b7280] bg-[rgba(107,114,128,0.15)] text-[#d1d5db]",
  field:     "border-[#10b981] bg-[rgba(16,185,129,0.1)] text-[#10b981]",
  personal:  "border-[#64748b] bg-[rgba(100,116,139,0.1)] text-[#64748b]",
  other:     "border-white/10 bg-white/5 text-[#9ca3af]",
};

const events: Event[] = [
  { day: 0, startRow: 0, span: 2, label: "Astro-Biology 101", sublabel: "Bio-Dome Pod B", type: "theory" },
  { day: 0, startRow: 2, span: 1, label: "Gym Session", sublabel: "Hab-Unit 3", type: "other" },
  { day: 1, startRow: 1, span: 1, label: "Meal Prep", sublabel: "", type: "other" },
  { day: 1, startRow: 3, span: 3, label: "Deep Space Comms", sublabel: "Comms Relay 440", type: "practical" },
  { day: 2, startRow: 0, span: 2, label: "Hydroponic Cycles", sublabel: "Hydro Labs", type: "workshop" },
  { day: 2, startRow: 5, span: 1, label: "Family Comms", sublabel: "Relay Substation", type: "family" },
  { day: 3, startRow: 1, span: 1, label: "Lab Cleanup", sublabel: "", type: "other" },
  { day: 3, startRow: 4, span: 3, label: "Atmospheric Analysis", sublabel: "", type: "field", badge: "+8" },
  { day: 4, startRow: 2, span: 1, label: "Personal Study", sublabel: "Library Deck", type: "personal" },
  { day: 5, startRow: 2, span: 3, label: "System Overhaul", sublabel: "Base-Wide", type: "maint" },
  { day: 5, startRow: 4, span: 2, label: "Rover Prep", sublabel: "", type: "other" },
  { day: 6, startRow: 5, span: 2, label: "Emergency Protocols", sublabel: "Level 4 East Wing", type: "safety" },
  { day: 6, startRow: 6, span: 1, label: "Observation", sublabel: "", type: "other" },
];

const GUTTER = 80;
const ROW_H = 72;

export default function StudyWeekGrid() {
  return (
    <div className="flex flex-col h-full">
      {/* Day headers */}
      <div className="bg-black/20 border-b border-white/10 flex w-full shrink-0">
        <div className="shrink-0" style={{ width: GUTTER }} />
        {days.map((d) => (
          <div
            key={d.num}
            className="flex-1 border-r border-white/5 last:border-r-0 py-2 flex flex-col items-center gap-0.5"
          >
            <span className="text-[#6b7280] text-[10px] font-extrabold tracking-[1px] uppercase">
              {d.short}
            </span>
            <span
              className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold ${
                d.today ? "bg-white text-[#1a1817]" : "text-[#d1d5db]"
              }`}
            >
              {d.num}
            </span>
          </div>
        ))}
      </div>

      {/* Scrollable time rows */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
        {hours.map((hour, hIdx) => (
          <div
            key={hour}
            className="flex w-full border-b border-white/5"
            style={{ minHeight: ROW_H }}
          >
            {/* Time label */}
            <div
              className="shrink-0 flex items-end justify-end pb-[5px] px-2 border-r border-white/5"
              style={{ width: GUTTER }}
            >
              <span className="text-[#6b7280] text-[10px] font-bold uppercase whitespace-nowrap">
                {hour}
              </span>
            </div>

            {/* Day cells */}
            {days.map((d, dIdx) => {
              const event = events.find(e => e.day === dIdx && e.startRow === hIdx);
              const covered = events.some(e => e.day === dIdx && e.startRow < hIdx && e.startRow + e.span > hIdx);
              return (
                <div key={d.num} className="flex-1 border-r border-white/5 last:border-r-0 relative p-1">
                  {event && (
                    <div
                      className={`border-l-2 rounded-lg p-2 text-[10px] leading-tight ${typeColors[event.type]}`}
                      style={{ minHeight: `${event.span * ROW_H - 8}px` }}
                    >
                      <p className="font-bold uppercase tracking-wide text-[9px] opacity-80">{event.type}</p>
                      <p className="font-semibold text-white text-[11px] mt-0.5">{event.label}</p>
                      {event.sublabel && <p className="opacity-60 text-[10px]">{event.sublabel}</p>}
                      {event.badge && (
                        <span className="inline-block mt-1 bg-white/20 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                          {event.badge}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
