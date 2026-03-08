const imgBanner = "/assets/1718fc2ea1450b03a7b1506b490c9312ce0ff2bc.png";
const imgCommander = "/assets/2d224258d455368f9c19f214035178d645dca903.png";
const imgBadge = "/assets/a7813c3f07aef2fad5904b76a116e0d8f526a4a6.svg";
const imgRankIcon = "/assets/68eddbff2a68a97c6bb0b1005aeac365025bf77a.svg";
const imgLocationIcon = "/assets/91fe9d97ef4b207cda0e7257747d657328922178.svg";
const imgEditIcon = "/assets/fba8cd3ef670347efac4f7b923f7d24bd0690846.svg";

export default function ProfileBanner() {
  return (
    <div className="backdrop-blur-sm bg-[rgba(61,54,50,0.4)] border border-white/5 rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)]">
      {/* Banner */}
      <div className="h-32 bg-[#2a211d]" />

      {/* Profile row */}
      <div className="px-8 pb-8 flex items-end gap-6 -mt-12">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-32 h-32 rounded-2xl border-4 border-[#1a1817] bg-[#3d3632] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
            <img src={imgCommander} alt="Commander Elias Thorne" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-[30px]">
            <img src={imgBadge} alt="Badge" className="w-full h-full block" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 flex items-end justify-between pb-1">
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-white text-[30px] tracking-[-0.75px]">Commander Elias Thorne</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <img src={imgRankIcon} alt="" className="w-1.5 h-3 block" />
                <span className="text-[rgba(229,225,223,0.7)] text-sm">Rank: Expedition Leader</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-1">
                <img src={imgLocationIcon} alt="" className="w-2.5 h-3 block" />
                <span className="text-[rgba(229,225,223,0.7)] text-sm">Sector 4 - Jezero Crater</span>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[#b05b3d] text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-[0_10px_15px_-3px_rgba(176,91,61,0.2),0_4px_6px_-4px_rgba(176,91,61,0.2)] hover:bg-[#9a4f35] transition-colors cursor-pointer mb-1">
            <img src={imgEditIcon} alt="" className="w-[13.5px] h-[13.5px] block" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
