const imgDoorIcon = "http://localhost:3845/assets/75ada541a12a12fb1684f99baed1dcba24ab3b2d.svg";
const imgPinIcon = "http://localhost:3845/assets/c086632fe8077f0856f919952367e5cbf179f4ca.svg";

const rooms = [
  { number: "402", name: "Level 4 East Wing", location: "Main Research Hub", time: "3h 45m" },
  { number: "108", name: "Basement Vault", location: "Archive Sector", time: "1h 20m" },
  { number: "551", name: "Observatory Deck", location: "Upper Tier", time: "4h 00m" },
  { number: "215", name: "Bio-Dome Pod B", location: "Life Support Wing", time: "0h 45m" },
  { number: "312", name: "Hydroponics Lab", location: "Green Sector", time: "6h 15m" },
  { number: "440", name: "Comms Relay", location: "Signal Ops", time: "2h 30m" },
];

export default function StudyRooms() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {rooms.map((room) => (
        <div
          key={room.number}
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

          {/* Divider + status + time */}
          <div className="border-t border-white/5 pt-3 flex items-center justify-between">
            <span className="text-[#6b7280] text-[10px] font-extrabold tracking-[1px] uppercase">Available</span>
            <span className="text-[#af5a3c] text-sm font-bold">{room.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
