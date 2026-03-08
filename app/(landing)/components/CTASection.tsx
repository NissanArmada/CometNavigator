const imgTexture =
  "http://localhost:3845/assets/73db72c49a899f1e8803d4a3d25e02fa0235a0a3.png";

export default function CTASection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-[1280px] mx-auto">
        <div className="relative bg-[#af5a3c] rounded-3xl px-8 py-16 overflow-hidden flex flex-col items-center gap-6">
          {/* Texture overlay */}
          <div className="absolute inset-0 mix-blend-overlay opacity-10 pointer-events-none">
            <img
              src={imgTexture}
              alt=""
              className="absolute w-full h-[289.27%] top-[-94.63%] object-cover"
            />
          </div>

          {/* Headline */}
          <h2 className="relative font-black text-white text-[clamp(28px,4vw,48px)] leading-none text-center">
            Start Building Your Perfect Semester
          </h2>

          {/* Subtext */}
          <p className="relative text-white/80 text-xl leading-7 text-center max-w-[672px]">
            Join 15,000+ students navigating their academic journey with
            precision.
          </p>

          {/* Buttons */}
          <div className="relative flex flex-wrap gap-4 justify-center pt-4">
            <button className="bg-white text-[#af5a3c] font-bold text-base px-10 py-[17px] rounded-full shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] hover:bg-gray-50 transition-colors cursor-pointer">
              Get Started Now
            </button>
            <button className="backdrop-blur-md bg-[rgba(26,24,23,0.2)] border border-white/20 text-white font-bold text-base px-10 py-[17px] rounded-full hover:bg-[rgba(26,24,23,0.35)] transition-colors cursor-pointer">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
