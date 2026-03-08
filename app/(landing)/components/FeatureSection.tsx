const imgCalendarIcon =
  "http://localhost:3845/assets/f0db38849c3685f20db31544ab76dbed94152242.svg";
const imgStudyIcon =
  "http://localhost:3845/assets/7a634ff9dd009610807854b51feaf4ef0db7b1e6.svg";
const imgClubIcon =
  "http://localhost:3845/assets/55fc7966c7b7a5a23fc5b2542266cdac00df6fe3.svg";

const features = [
  {
    icon: imgCalendarIcon,
    iconAlt: "Calendar icon",
    iconSize: "w-[22.5px] h-[25px]",
    title: "Smart Calendar",
    description:
      "Automatically syncs your course schedule and deadlines from canvas, blackboard, and email into one unified mission control.",
  },
  {
    icon: imgStudyIcon,
    iconAlt: "Study room icon",
    iconSize: "w-[22.5px] h-[22.5px]",
    title: "Study Room Finder",
    description:
      "Find and book the perfect quiet spot on campus instantly. Real-time availability for libraries and academic centers.",
  },
  {
    icon: imgClubIcon,
    iconAlt: "Club icon",
    iconSize: "w-[30px] h-[28.75px]",
    title: "Club Discovery",
    description:
      "Connect with campus organizations tailored to your academic interests and career goals via intelligent matching.",
  },
];

export default function FeatureSection() {
  return (
    <section className="bg-white/[0.05] px-6 py-24">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-4 items-center text-center">
          <h2 className="font-bold text-[#f1f5f9] text-[clamp(32px,4vw,48px)] leading-none">
            Engineered for Success
          </h2>
          <p className="text-[#94a3b8] text-base leading-6 max-w-[672px]">
            Tools built to handle the rigorous demands of higher education with
            a focus on exploration and discovery.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#1a1817] border border-white/5 rounded-3xl p-8 flex flex-col gap-5 shadow-sm"
            >
              <div className="bg-[rgba(175,90,60,0.1)] flex items-center justify-center w-14 h-14 rounded-2xl">
                <img
                  src={feature.icon}
                  alt={feature.iconAlt}
                  className={`${feature.iconSize} block`}
                />
              </div>
              <h3 className="font-bold text-[#f1f5f9] text-xl leading-7">
                {feature.title}
              </h3>
              <p className="text-[#94a3b8] text-base leading-[26px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
