"use client";

const days = [
  { short: "MON", num: "2" },
  { short: "TUE", num: "3" },
  { short: "WED", num: "4" },
  { short: "THU", num: "5" },
  { short: "FRI", num: "6" },
  { short: "SAT", num: "7", today: true },
  { short: "SUN", num: "8" },
];

const hours = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM",
];

const events = [
  { day: 5, startRow: 3, title: "Daily Standup Meeting", time: "12:15 PM – 1:00 PM" },
];

export default function CalendarGrid() {
  return (
    <div className="bg-[rgba(26,24,23,0.6)] border border-white/5 rounded-2xl overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-white/5">
        <div className="p-4" />
        {days.map((d) => (
          <div key={d.num} className="py-3 flex flex-col items-center gap-1 border-l border-white/5">
            <span className="text-[#9ca3af] text-xs font-medium tracking-wider">{d.short}</span>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
              d.today ? "bg-white text-[#1a1817]" : "text-white"
            }`}>
              {d.num}
            </div>
          </div>
        ))}
      </div>

      {/* Time grid */}
      {hours.map((hour, hIdx) => (
        <div key={hour} className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-white/5 min-h-[64px]">
          <div className="px-4 pt-2">
            <span className="text-[#9ca3af] text-xs">{hour}</span>
          </div>
          {days.map((d, dIdx) => {
            const event = events.find(e => e.day === dIdx && e.startRow === hIdx);
            return (
              <div key={d.num} className="border-l border-white/5 relative p-1">
                {event && (
                  <div className="bg-[rgba(175,90,60,0.2)] border-l-2 border-[#af5a3c] rounded p-2">
                    <p className="text-white text-xs font-bold leading-tight">{event.title}</p>
                    <p className="text-[#af5a3c] text-[10px] mt-0.5">{event.time}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
