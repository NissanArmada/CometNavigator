const imgIcon = "/assets/7c61dbb737868f6a701e995296db8b91910da351.svg";
const imgAresIcon = "/assets/c3170690b7b27f45b2847a02f4def5a831764ef7.svg";
const imgOutpostIcon = "/assets/81a32ec2755f5e8d835849ea8f163006b7f2bda1.svg";
const imgChevron = "/assets/dca8f8c4fd1cd6fb95563348550495a38b9f80bd.svg";

const units = [
  {
    icon: imgAresIcon,
    name: "Ares Elite Squadron",
    bg: "bg-[rgba(176,91,61,0.05)] border-[rgba(176,91,61,0.1)]",
  },
  {
    icon: imgOutpostIcon,
    name: "Outpost Engineering Union",
    bg: "bg-white/5 border-white/5",
  },
];

export default function TaskForces() {
  return (
    <div className="backdrop-blur-sm bg-[rgba(61,54,50,0.4)] border border-white/5 rounded-xl p-6 flex flex-col gap-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-[rgba(176,91,61,0.1)] border border-[rgba(176,91,61,0.2)] flex items-center justify-center rounded-lg w-10 h-10">
          <img src={imgIcon} alt="" className="w-[22px] h-4 block" />
        </div>
        <div>
          <h3 className="font-bold text-white text-base">Assigned Task Forces</h3>
          <p className="text-[rgba(229,225,223,0.4)] text-[10px] tracking-[1px] uppercase">Internal Clubs &amp; Units</p>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2 pt-2">
        {units.map((u) => (
          <button
            key={u.name}
            className={`flex items-center justify-between p-3 rounded-lg border transition-colors hover:brightness-110 cursor-pointer ${u.bg}`}
          >
            <div className="flex items-center gap-3">
              <img src={u.icon} alt="" className="w-5 h-5 block" />
              <span className="font-medium text-[#e5e1df] text-sm">{u.name}</span>
            </div>
            <img src={imgChevron} alt="" className="w-1 h-2 block" />
          </button>
        ))}
      </div>
    </div>
  );
}
