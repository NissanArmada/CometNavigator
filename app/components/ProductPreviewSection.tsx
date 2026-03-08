const imgDashboard =
  "http://localhost:3845/assets/841125e70c061fae0fdc2d2258308e33425d30de.png";
const imgAlertIcon =
  "http://localhost:3845/assets/5b337c9b7b488406ae4ded91e423eaa8ec6f0c60.svg";
const imgRecommendIcon =
  "http://localhost:3845/assets/3eaf54b5498eec0c0abc7f7d1d8fd5b0fe5e9584.svg";
const imgCheckIcon =
  "http://localhost:3845/assets/86f88ae756e20185f99cf74aeda9c1452e60a444.svg";

export default function ProductPreviewSection() {
  return (
    <section className="px-6 py-24">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-16 items-center">
        {/* Left: Dashboard mockup with floating cards */}
        <div className="flex-1 relative">
          {/* Floating card: top-right (Announcement) */}
          <div className="absolute -top-8 -right-8 z-10 backdrop-blur-md bg-[rgba(42,36,34,0.6)] border border-[rgba(175,90,60,0.2)] rounded-3xl p-5 flex flex-col gap-3 max-w-[240px] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-3">
              <img src={imgAlertIcon} alt="" className="w-5 h-4 block" />
              <span className="font-bold text-[#af5a3c] text-xs tracking-[1.2px] uppercase">
                Alert
              </span>
            </div>
            <p className="font-medium text-[#f1f5f9] text-sm leading-5">
              New study guide posted for Astro-Physics 101.
            </p>
          </div>

          {/* Main dashboard image */}
          <div className="relative border border-white/10 rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-px bg-transparent">
            <div className="aspect-video bg-[#262626] relative overflow-hidden">
              <img
                src={imgDashboard}
                alt="Comet dashboard"
                className="absolute inset-0 w-full h-[177.78%] top-[-38.89%] object-cover opacity-80"
              />
            </div>
          </div>

          {/* Floating card: bottom-left (Club Rec) */}
          <div className="absolute -bottom-8 -left-8 z-10 backdrop-blur-md bg-[rgba(42,36,34,0.6)] border border-[rgba(175,90,60,0.2)] rounded-3xl p-5 flex flex-col gap-3 max-w-[240px] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-3">
              <img src={imgRecommendIcon} alt="" className="w-6 h-3 block" />
              <span className="font-bold text-[#af5a3c] text-xs tracking-[1.2px] uppercase">
                Recommended
              </span>
            </div>
            <p className="font-medium text-[#f1f5f9] text-sm leading-5">
              Robotics Club meeting today at 5 PM in Hall B.
            </p>
          </div>
        </div>

        {/* Right: Text content */}
        <div className="flex-1 flex flex-col gap-6">
          <h2 className="font-black text-[#f1f5f9] text-[clamp(28px,3vw,36px)] leading-10">
            Your Command Center
          </h2>
          <p className="text-[#94a3b8] text-lg leading-[29.25px]">
            The Comet dashboard isn&apos;t just a list of things to do; it&apos;s a
            dynamic environment that adapts to your semester&apos;s velocity. We
            surface the most relevant information exactly when you need it.
          </p>

          {/* Feature list */}
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex items-start gap-3">
              <img src={imgCheckIcon} alt="" className="w-5 h-6 block mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-[#f1f5f9] text-base leading-6">
                  Prioritized Recommendations
                </p>
                <p className="text-[#64748b] text-sm leading-5">
                  Smart tasks based on upcoming deadlines and weight.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <img src={imgCheckIcon} alt="" className="w-5 h-6 block mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-[#f1f5f9] text-base leading-6">
                  Peer Networking
                </p>
                <p className="text-[#64748b] text-sm leading-5">
                  See who in your classes is studying right now.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
