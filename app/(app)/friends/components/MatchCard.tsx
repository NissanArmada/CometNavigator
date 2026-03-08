const imgMatchProfile = "http://localhost:3845/assets/5ed9d9b7e7339cb6276a0f230476ee9a605543fc.png";
const imgXIcon = "http://localhost:3845/assets/8bea1cc3709094304846f6a664f37ff3ebb18ccb.svg";
const imgHeartIcon = "http://localhost:3845/assets/28361b9f586846401dc1e4d87a59e976e4b31c84.svg";
const imgChevLeft = "http://localhost:3845/assets/c03e002bc076f48e8d1dda8bb287f9850df2c298.svg";
const imgChevRight = "http://localhost:3845/assets/02e4ed7851f7c14e5cf00b56e5f03e0281388388.svg";
const imgLightning = "http://localhost:3845/assets/fd4d71981f2085907475998e406f2330b2880a85.svg";
const imgFlask = "http://localhost:3845/assets/968b94675a190c77f1caba04faf2153173cce6d3.svg";
const imgCheckIcon = "http://localhost:3845/assets/53683aa1e8beaa9e633f85252451b3849050af3c.svg";

const schedule = [
  { time: "08:00 AM", title: "Geology Briefing", location: "Command Center", status: "done" },
  { time: "10:30 AM", title: "Sample Analysis (Active)", location: "Bio Lab Delta", status: "active" },
  { time: "02:00 PM", title: "EVA Drill", location: "Airlock A", status: "upcoming" },
];

export default function MatchCard() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full items-center lg:items-start">
      {/* Swipe card stack */}
      <div className="w-full lg:w-[381px] shrink-0 flex items-center justify-center py-10 relative">
        {/* Background cards (depth effect) */}
        <div className="absolute inset-[34px_35px_34px_35px] backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] rounded-[32px] opacity-30" />
        <div className="absolute inset-[18px_18px_18px_18px] backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] rounded-[32px] opacity-60" />

        {/* Main swipe card */}
        <div className="relative w-full max-w-[380px] backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] rounded-[40px] overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          {/* Profile image */}
          <div className="relative h-[350px] overflow-hidden">
            <img
              src={imgMatchProfile}
              alt="Commander Melissa Lewis"
              className="absolute w-full h-[110%] top-[-5%] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1817] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-8 right-8">
              <h2 className="font-extrabold text-white text-[30px] leading-9">
                Commander Melissa<br />Lewis
              </h2>
              <p className="font-bold text-[#d98c5f] text-sm tracking-[1.4px] uppercase mt-1">Ares III Mission Lead</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="bg-[rgba(26,24,23,0.4)] border-t border-white/5 flex items-center justify-center gap-28 py-6">
            <button className="w-14 h-14 rounded-full border border-[rgba(239,68,68,0.5)] flex items-center justify-center hover:bg-[rgba(239,68,68,0.1)] transition-colors cursor-pointer">
              <img src={imgXIcon} alt="Pass" className="w-[17.5px] h-[17.5px] block" />
            </button>
            <button className="w-14 h-14 rounded-full bg-[#b05b3d] flex items-center justify-center shadow-[0_10px_15px_-3px_rgba(176,91,61,0.3),0_4px_6px_-4px_rgba(176,91,61,0.3)] hover:bg-[#9a4f35] transition-colors cursor-pointer">
              <img src={imgHeartIcon} alt="Like" className="w-[25px] h-[23px] block" />
            </button>
          </div>
        </div>

        {/* Side nav arrows */}
        <button className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] flex items-center justify-center hover:bg-[rgba(176,91,61,0.2)] transition-colors cursor-pointer shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <img src={imgChevLeft} alt="Previous" className="w-3 h-5 block" />
        </button>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] flex items-center justify-center hover:bg-[rgba(176,91,61,0.2)] transition-colors cursor-pointer shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <img src={imgChevRight} alt="Next" className="w-3 h-5 block" />
        </button>
      </div>

      {/* Match details panel */}
      <div className="flex-1 backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] rounded-2xl p-8 flex flex-col gap-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-y-auto">
        {/* Why it fits you */}
        <div className="flex flex-col gap-2">
          <p className="font-extrabold text-[#d98c5f] text-xs tracking-[2.4px] uppercase">Why it fits you</p>
          <h2 className="font-extrabold text-white text-2xl leading-8">Strategic Partnership Potential</h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[rgba(176,91,61,0.1)] border border-[rgba(176,91,61,0.2)] rounded-2xl p-6 flex flex-col gap-2">
            <p className="text-[#6b7280] text-[10px] font-extrabold tracking-[1px] uppercase">Compatibility</p>
            <div className="flex items-center gap-2">
              <img src={imgLightning} alt="" className="w-4 h-5 block" />
              <div>
                <p className="text-white font-bold text-2xl">94%</p>
                <p className="text-white font-bold text-base">Schedule Sync</p>
              </div>
            </div>
            <p className="text-[#9ca3af] text-xs leading-5">
              Shared research blocks and overlapping recovery windows identified.
            </p>
          </div>
          <div className="bg-black/20 border border-white/5 rounded-2xl p-6 flex flex-col gap-2">
            <p className="text-[#6b7280] text-[10px] font-extrabold tracking-[1px] uppercase">Shared Focus</p>
            <div className="flex items-center gap-2">
              <img src={imgFlask} alt="" className="w-[18px] h-[18px] block" />
              <div>
                <p className="text-white font-bold text-xl leading-7">Geological Survey</p>
              </div>
            </div>
            <p className="text-[#9ca3af] text-xs leading-5">
              Both personnel assigned to Acidalia Planitia site analysis.
            </p>
          </div>
        </div>

        {/* Today's schedule alignment */}
        <div className="flex flex-col gap-4">
          <p className="text-[#d98c5f] text-xs font-extrabold tracking-[2.4px] uppercase">Today&apos;s Protocol Sequence Alignment</p>
          <div className="flex flex-col gap-4">
            {schedule.map((item) => (
              <div
                key={item.title}
                className={`flex items-center gap-6 p-4 rounded-xl border ${
                  item.status === "upcoming"
                    ? "bg-white/5 border-white/5 opacity-50"
                    : item.status === "active"
                    ? "bg-[rgba(176,91,61,0.1)] border-[rgba(176,91,61,0.2)]"
                    : "bg-white/5 border-white/5"
                }`}
              >
                <span className={`text-xs font-extrabold w-16 shrink-0 ${
                  item.status === "active" ? "text-[#d98c5f]" : "text-[#6b7280]"
                }`}>{item.time}</span>
                <div className={`w-1 h-8 rounded-full shrink-0 ${
                  item.status === "active" ? "bg-[#d98c5f]" : item.status === "done" ? "bg-[#af5a3c]" : "bg-[#4b5563]"
                }`} />
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">{item.title}</p>
                  <p className="text-[#9ca3af] text-[10px]">{item.location}</p>
                </div>
                {item.status === "done" && <img src={imgCheckIcon} alt="" className="w-3 h-3 shrink-0" />}
                {item.status === "active" && (
                  <span className="bg-[rgba(176,91,61,0.3)] text-white text-[9px] font-extrabold uppercase tracking-wide px-2 py-1 rounded shrink-0">
                    In Progress
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bio quote */}
        <div className="bg-[rgba(217,140,95,0.05)] border border-[rgba(217,140,95,0.1)] rounded-2xl p-6">
          <p className="text-[#9ca3af] text-sm leading-[22.75px] italic">
            &quot;A Navy veteran and geologist, Lewis leads the Ares III mission with a focus on sample collection and crew safety. Expert in martian topography and EVA protocols.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
