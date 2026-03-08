const imgLewis = "/assets/3dcd1ea116f19d6185eefce8fc60b42a3496bae4.png";
const imgMailIcon = "/assets/bf9404ab0034cbba1e86a9ad2008e7e2c3b73a1f.svg";
const imgCheckIcon = "/assets/53683aa1e8beaa9e633f85252451b3849050af3c.svg";
const imgCalIcon = "/assets/f41f47b886a1a383e2e2c2807bc8f7035d942d58.svg";

const contacts = [
  { name: "Commander Melissa Lewis", role: "Mission Lead", initials: null, avatar: imgLewis, online: true, active: true },
  { name: "Rick Martinez", role: "Pilot", initials: "RV", online: true },
  { name: "Beth Johanssen", role: "Systems Engineer", initials: "BJ", online: false },
  { name: "Chris Beck", role: "Mission Surgeon", initials: "CV", online: true },
  { name: "Alex Vogel", role: "Astrophysicist", initials: "AV", online: false },
];

const schedule = [
  { time: "08:00 AM", title: "Geology Briefing", location: "Command Center", status: "done" },
  { time: "10:30 AM", title: "Sample Analysis (Active)", location: "Bio Lab Delta", status: "active" },
  { time: "02:00 PM", title: "EVA Drill", location: "Airlock A", status: "upcoming" },
];

type Props = { activeTab: "friends" | "matching"; onTabChange: (tab: "friends" | "matching") => void };

export default function FriendsList({ activeTab, onTabChange }: Props) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      {/* Sidebar */}
      <div className="w-full lg:w-[260px] shrink-0 flex flex-col gap-4">
        <div className="backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] rounded-2xl p-4 flex flex-col gap-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <div className="flex items-center justify-between px-1">
            <span className="text-white font-bold text-sm">Contacts</span>
            <span className="text-[#af5a3c] text-xs font-bold">{contacts.filter(c => c.online).length} ACTIVE</span>
          </div>
          {contacts.map((c) => (
            <div
              key={c.name}
              className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors ${
                c.active ? "bg-[rgba(175,90,60,0.15)] border border-[rgba(175,90,60,0.2)]" : "hover:bg-white/5"
              }`}
            >
              {c.avatar ? (
                <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-white/10">
                  <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-[#3d3632] flex items-center justify-center shrink-0 text-[#d1d5db] text-xs font-bold">
                  {c.initials}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-bold truncate">{c.name}</p>
                <p className="text-[#9ca3af] text-[10px] uppercase tracking-wide">{c.role}</p>
              </div>
              <div className={`w-2 h-2 rounded-full shrink-0 ${c.online ? "bg-[#22c55e]" : "bg-[#4b5563]"}`} />
            </div>
          ))}

          <button className="mt-2 flex items-center justify-center gap-2 border border-[rgba(175,90,60,0.2)] bg-[rgba(175,90,60,0.05)] text-[#d98c5f] text-[10px] font-bold tracking-[1px] uppercase py-3 rounded-xl hover:bg-[rgba(175,90,60,0.1)] transition-colors cursor-pointer">
            <img src={imgCalIcon} alt="" className="w-4 h-3 block" />
            Show Overlapping Schedules
          </button>
        </div>
      </div>

      {/* Detail panel */}
      <div className="flex-1 backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] rounded-2xl p-4 sm:p-8 flex flex-col gap-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden">
        {/* Contact header */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-[88px] h-[88px] rounded-2xl overflow-hidden border border-white/10 bg-[#3d3632]">
              <img src={imgLewis} alt="Commander Melissa Lewis" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-[#22c55e] border-2 border-[#2c2826]" />
          </div>
          <div className="flex-1">
            <h2 className="font-extrabold text-white text-xl sm:text-2xl leading-8">Commander Melissa Lewis</h2>
            <p className="font-bold text-[#d98c5f] text-xs tracking-[1.4px] uppercase mt-1">Ares III Mission Lead</p>
            <p className="text-[#9ca3af] text-sm leading-5 mt-2">
              A Navy veteran and geologist, Lewis leads the Ares III mission with a focus on sample collection and crew safety. Expert in martian topography and EVA protocols.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
              <img src={imgMailIcon} alt="Mail" className="w-4 h-4 block" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
              <span className="text-[#9ca3af] text-xs font-bold">⋮</span>
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
            <p className="text-[#6b7280] text-[10px] font-extrabold tracking-[1px] uppercase mb-3">Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
              <span className="text-white font-bold text-base">Online</span>
            </div>
          </div>
          <div className="bg-[rgba(176,91,61,0.1)] border border-[rgba(176,91,61,0.2)] rounded-2xl p-5">
            <p className="text-[#6b7280] text-[10px] font-extrabold tracking-[1px] uppercase mb-2">Compatibility</p>
            <p className="text-white font-bold text-2xl">94%</p>
            <p className="text-white font-bold text-sm">⚡ Schedule Sync</p>
          </div>
        </div>

        {/* Today's schedule */}
        <div>
          <p className="text-[#d98c5f] text-xs font-extrabold tracking-[2.4px] uppercase mb-4">Today&apos;s Protocol Sequence</p>
          <div className="flex flex-col gap-3">
            {schedule.map((item) => (
              <div
                key={item.title}
                className={`flex items-center gap-6 p-4 rounded-xl border transition-opacity ${
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
                {item.status === "done" && (
                  <img src={imgCheckIcon} alt="Done" className="w-3 h-3 block shrink-0" />
                )}
                {item.status === "active" && (
                  <span className="bg-[rgba(176,91,61,0.3)] text-white text-[9px] font-extrabold uppercase tracking-wide px-2 py-1 rounded shrink-0">
                    In Progress
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
