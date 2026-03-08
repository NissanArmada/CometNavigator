const imgIcon = "http://localhost:3845/assets/1dc889d6ecfedbc3b4f6a66905ea10179becafb9.svg";

const interests = [
  "Terraforming Theory",
  "Deep Space Navigation",
  "Xenobiology",
  "Ancient Mars Hydrology",
  "EVA Maneuvers",
];

export default function SpecialInterests() {
  return (
    <div className="backdrop-blur-sm bg-[rgba(61,54,50,0.4)] border border-white/5 rounded-xl p-6 flex flex-col gap-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-[rgba(217,140,95,0.1)] border border-[rgba(217,140,95,0.2)] flex items-center justify-center rounded-lg w-10 h-10">
          <img src={imgIcon} alt="" className="w-5 h-[19px] block" />
        </div>
        <div>
          <h3 className="font-bold text-white text-base">Special Interests</h3>
          <p className="text-[rgba(229,225,223,0.4)] text-[10px] tracking-[1px] uppercase">Focus Areas</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-1">
        {interests.map((tag) => (
          <span
            key={tag}
            className="bg-[#3d3632] border border-white/5 text-[rgba(229,225,223,0.8)] text-xs px-3 py-1.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
