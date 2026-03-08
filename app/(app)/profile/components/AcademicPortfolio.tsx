const imgIcon = "http://localhost:3845/assets/33e0e85cff69b06f81d1736bb0ced4d75aecf363.svg";
const imgDotsIcon = "http://localhost:3845/assets/fc949e1f6e0876f7416d204b3cc0a2347819417e.svg";

const credentials = [
  { title: "Ph.D. Aerospace Engineering", subtitle: "MIT - Class of 2038" },
  { title: "Astrophysics specialization", subtitle: "United Nations Space Agency Training" },
];

export default function AcademicPortfolio() {
  return (
    <div className="backdrop-blur-sm bg-[rgba(61,54,50,0.4)] border border-white/5 rounded-xl p-6 flex flex-col gap-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[rgba(176,91,61,0.1)] border border-[rgba(176,91,61,0.2)] flex items-center justify-center rounded-lg w-10 h-10">
            <img src={imgIcon} alt="" className="w-[22px] h-[18px] block" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Academic Portfolio</h3>
            <p className="text-[rgba(229,225,223,0.4)] text-[10px] tracking-[1px] uppercase">Credentials &amp; Degrees</p>
          </div>
        </div>
        <button className="flex items-center justify-center w-4 cursor-pointer">
          <img src={imgDotsIcon} alt="Options" className="w-1 h-4 block" />
        </button>
      </div>

      {/* Credentials */}
      <div className="flex flex-col gap-4 pt-2">
        {credentials.map((c) => (
          <div key={c.title} className="bg-white/5 border border-white/5 rounded-lg p-3">
            <p className="font-semibold text-[#e5e1df] text-sm leading-5">{c.title}</p>
            <p className="text-[rgba(229,225,223,0.5)] text-xs leading-4">{c.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
