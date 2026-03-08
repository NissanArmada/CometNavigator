import ClubCard from "./components/ClubCard";

const imgQuantumIcon = "http://localhost:3845/assets/ee732cf4fa2314812fc26c9caa8cb3b8151bf697.svg";
const imgDomeIcon = "http://localhost:3845/assets/7bc124676c5809172f1761e2fb57147e17d87fc3.svg";

const clubs = [
  {
    icon: imgQuantumIcon,
    iconBg: "bg-[rgba(176,91,61,0.2)]",
    name: "Quantum Comms Collective",
    match: "98%",
    whyText: `Your background in electrical engineering and recent mission logs regarding "inter-base latency" perfectly align with the Collective's current goals.`,
    slots: [
      {
        label: "Tuesday",
        events: [{ name: "ALPHA SHIFT", time: "14:00 - 16:00", color: "orange" as const }],
      },
      {
        label: "Thursday",
        events: [{ name: "ALPHA SHIFT", time: "14:00 - 16:00", color: "orange" as const }],
      },
    ],
  },
  {
    icon: imgDomeIcon,
    iconBg: "bg-[rgba(217,140,95,0.2)]",
    name: "Dome Architects",
    match: "92%",
    whyText:
      "Your contribution to the Hab-3 reinforcement project is highly relevant to their current modular dome design phase.",
    slots: [
      {
        label: "Sol 15",
        events: [{ name: "RAD-WINDOW", time: "09:00 - 11:30", color: "gold" as const }],
      },
      {
        label: "Sol 30",
        events: [{ name: "RAD-WINDOW", time: "12:00 - 14:00", color: "gold" as const }],
      },
    ],
  },
];

export default function ClubsPage() {
  return (
    <div className="p-8 max-w-[1280px] mx-auto flex flex-col gap-10">
      {/* Header */}
      <div className="flex items-end justify-between">
        <h1 className="font-extrabold text-white text-[clamp(32px,4vw,48px)] tracking-[-1.2px]">
          Club Recommendations
        </h1>
        <button className="backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] text-[#d1d5db] text-xs font-bold tracking-[1.2px] uppercase px-6 py-3 rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/10 transition-colors cursor-pointer">
          View All Clubs
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-col lg:flex-row gap-8">
        {clubs.map((club) => (
          <ClubCard key={club.name} {...club} />
        ))}
      </div>
    </div>
  );
}
