const imgHero =
  "/assets/78afdcfbed23cb40b4acd0433e67899202b1899d.png";
const imgBetaIcon =
  "/assets/0f51571d007e6a8c178d15bff6d3aa3c83c41a76.svg";
const imgPlayIcon =
  "/assets/ae4ee7abb94f90028737ccac2f75ba84e01c1291.svg";

export default function HeroSection() {
  return (
    <section className="pt-[64px] pb-24 px-6">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-12 items-center">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Beta badge */}
          <div className="inline-flex items-center gap-2 self-start bg-[rgba(175,90,60,0.1)] border border-[rgba(175,90,60,0.2)] rounded-full px-3 py-1.5">
            <img src={imgBetaIcon} alt="" className="w-3 h-3 block" />
            <span className="font-bold text-[#af5a3c] text-xs tracking-[0.6px] uppercase">
              Now in Beta for Universities
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-black text-[#f1f5f9] text-[clamp(48px,6vw,72px)] leading-[1.0] tracking-[-1.8px]">
            Your Academic
            <br />
            Life,
            <br />
            <span className="text-[#af5a3c]">Automatically</span>
            <br />
            Organized.
          </h1>

          {/* Subheadline */}
          <p className="text-[#94a3b8] text-xl leading-[28px] max-w-[576px]">
            Connect your classes, events, and goals in one rugged, smart
            workspace designed for explorers of knowledge. Stop managing
            schedules, start mastering subjects.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-[#af5a3c] text-white font-bold text-base px-8 py-[17px] rounded-3xl shadow-[0_20px_25px_-5px_rgba(175,90,60,0.2),0_8px_10px_-6px_rgba(175,90,60,0.2)] hover:bg-[#9a4f35] transition-colors cursor-pointer">
              Get Started for Free
            </button>
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 font-bold text-[#f1f5f9] text-base px-8 py-[17px] rounded-3xl hover:bg-white/10 transition-colors cursor-pointer">
              <img src={imgPlayIcon} alt="" className="w-5 h-5 block" />
              View Demo
            </button>
          </div>
        </div>

        {/* Right: Dashboard preview */}
        <div className="flex-1 relative w-full">
          {/* Decorative glow top-right */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-[rgba(175,90,60,0.2)] rounded-full blur-[32px] pointer-events-none" />
          {/* Decorative glow bottom-left */}
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[rgba(175,90,60,0.1)] rounded-full blur-[32px] pointer-events-none" />

          <div className="relative border border-white/10 rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-px bg-transparent">
            <div className="relative aspect-[4/3] w-full bg-[rgba(175,90,60,0.05)]">
              <img
                src={imgHero}
                alt="Comet Navigation dashboard"
                className="absolute inset-0 w-full h-[133.33%] top-[-16.67%] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
