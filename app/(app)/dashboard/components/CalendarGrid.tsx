const ROW_H = 56; // px per hour
const GUTTER = 80; // px for time label column

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
  "9:00 AM","10:00 AM","11:00 AM","12:00 PM",
  "1:00 PM","2:00 PM","3:00 PM","4:00 PM",
  "5:00 PM","6:00 PM","7:00 PM","8:00 PM",
];

/** Convert "H:MM AM/PM" to hours offset from 9 AM */
function timeToY(time: string): number {
  const [hhmm, period] = time.split(" ");
  const [hStr, mStr] = hhmm.split(":");
  let h = parseInt(hStr);
  const m = parseInt(mStr);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return (h - 9 + m / 60) * ROW_H;
}

const events = [
  {
    col: 5, // SAT (0-indexed)
    title: "Daily Standup Meeting",
    time: "12:15 PM - 1:00 PM",
    start: "12:15 PM",
    end:   "1:00 PM",
    bg: "bg-[rgba(59,130,246,0.3)]",
    border: "border-[#60a5fa]",
    timeColor: "text-[#bfdbfe]",
  },
  {
    col: 6, // SUN
    title: "Client Lunch",
    time: "4:30 PM - 5:30 PM",
    start: "4:30 PM",
    end:   "5:30 PM",
    bg: "bg-[rgba(176,91,61,0.3)]",
    border: "border-[#b05b3d]",
    timeColor: "text-[#d98c5f]",
  },
  {
    col: 5, // SAT
    title: "Counselor Meetup",
    time: "6:00 PM - 6:45 PM",
    start: "6:00 PM",
    end:   "6:45 PM",
    bg: "bg-[rgba(34,197,94,0.3)]",
    border: "border-[#4ade80]",
    timeColor: "text-[#bbf7d0]",
  },
];

export default function CalendarGrid() {
  const totalH = hours.length * ROW_H;

  return (
    <div className="w-full">
      {/* Day headers */}
      <div className="bg-black/20 border-b border-white/10 flex w-full">
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

      {/* Time grid */}
      <div
        className="relative flex w-full"
        style={{ height: totalH }}
      >
        {/* Time labels column */}
        <div className="shrink-0 flex flex-col" style={{ width: GUTTER }}>
          {hours.map((h) => (
            <div
              key={h}
              className="border-b border-white/5 flex items-end justify-end pb-[5px] px-2"
              style={{ height: ROW_H }}
            >
              <span className="text-[#6b7280] text-[10px] font-bold uppercase whitespace-nowrap">
                {h}
              </span>
            </div>
          ))}
        </div>

        {/* Grid body */}
        <div className="relative flex-1 flex">
          {/* Vertical column separators */}
          {days.map((d, i) => (
            <div
              key={d.num}
              className="flex-1 border-r border-white/5 last:border-r-0 relative"
            >
              {/* Horizontal row lines */}
              {hours.map((h) => (
                <div
                  key={h}
                  className="border-b border-white/5"
                  style={{ height: ROW_H }}
                />
              ))}
            </div>
          ))}

          {/* Events layer */}
          <div className="absolute inset-0 pointer-events-none">
            {events.map((ev) => {
              const startY = timeToY(ev.start);
              const endY   = timeToY(ev.end);
              const evH    = Math.max(endY - startY, 30);
              const colW   = 100 / 7;

              return (
                <div
                  key={ev.title}
                  className="absolute p-[4px] pointer-events-auto"
                  style={{
                    top: startY,
                    left:  `${ev.col * colW}%`,
                    right: `${(6 - ev.col) * colW}%`,
                  }}
                >
                  <div
                    className={`${ev.bg} border-l-4 ${ev.border} rounded-br-[4px] rounded-tr-[4px] pl-3 pr-2 py-2 flex flex-col`}
                    style={{ height: evH }}
                  >
                    <p className="text-white text-[10px] font-bold leading-[15px]">
                      {ev.title}
                    </p>
                    <p className={`${ev.timeColor} text-[9px] leading-[13.5px]`}>
                      {ev.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
