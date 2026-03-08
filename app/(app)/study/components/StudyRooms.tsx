const imgDoorIcon = "/assets/75ada541a12a12fb1684f99baed1dcba24ab3b2d.svg";
const imgPinIcon  = "/assets/c086632fe8077f0856f919952367e5cbf179f4ca.svg";

function calcDuration(start: string, end: string): string {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const totalMin = (eh * 60 + em) - (sh * 60 + sm);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m === 0 ? `${h}h 00m` : `${h}h ${m}m`;
}

const rawRooms = [
  { room_number: "JSOM 1.118",          start_time: "08:00", end_time: "10:00" },
  { room_number: "JSOM 2.803",          start_time: "11:30", end_time: "14:00" },
  { room_number: "ECSS 2.203",          start_time: "13:00", end_time: "16:30" },
  { room_number: "SOM 1.110",           start_time: "09:00", end_time: "11:00" },
  { room_number: "GR 3.302",            start_time: "14:30", end_time: "17:00" },
  { room_number: "ECSS 3.910",          start_time: "16:00", end_time: "19:00" },
  { room_number: "McDermott Library 2.4", start_time: "10:00", end_time: "13:00" },
];

const rooms = rawRooms.map((r) => {
  const spaceIdx = r.room_number.indexOf(" ");
  const building = r.room_number.slice(0, spaceIdx);
  const number   = r.room_number.slice(spaceIdx + 1);
  return {
    number,
    name: r.room_number,
    location: building,
    available: `${r.start_time} – ${r.end_time}`,
    time: calcDuration(r.start_time, r.end_time),
  };
});

export default function StudyRooms() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {rooms.map((room) => (
        <div
          key={room.name}
          className="backdrop-blur-sm bg-[rgba(42,36,34,0.6)] border border-white/5 rounded-xl p-5 flex flex-col gap-4 cursor-pointer hover:border-[rgba(175,90,60,0.3)] transition-colors shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)]"
        >
          {/* Top row: ROOM badge + door icon */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-0.5">
              <div className="bg-[rgba(175,90,60,0.15)] border border-[rgba(175,90,60,0.3)] rounded px-2 py-0.5 w-fit">
                <span className="text-[#af5a3c] text-[10px] font-bold tracking-[1.2px] uppercase">Room</span>
              </div>
              <span className="text-white font-black text-2xl tracking-tight">{room.number}</span>
            </div>
            <img src={imgDoorIcon} alt="" className="w-[18px] h-[18px] block opacity-40 mt-1" />
          </div>

          {/* Room name + location */}
          <div className="flex flex-col gap-1">
            <p className="text-white font-bold text-sm tracking-[0.7px] uppercase leading-tight">{room.name}</p>
            <div className="flex items-center gap-1">
              <img src={imgPinIcon} alt="" className="w-[8px] h-[10px] block opacity-50" />
              <span className="text-[#9ca3af] text-[11px]">{room.location}</span>
            </div>
          </div>

          {/* Divider + available window + duration */}
          <div className="border-t border-white/5 pt-3 flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[#6b7280] text-[10px] font-extrabold tracking-[1px] uppercase">Available</span>
              <span className="text-[#9ca3af] text-[10px]">{room.available}</span>
            </div>
            <span className="text-[#af5a3c] text-sm font-bold">{room.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
