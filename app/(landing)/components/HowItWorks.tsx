const steps = [
  {
    number: "1",
    title: "Secure Sign Up",
    description:
      "Connect with your .edu email for instant university verification.",
  },
  {
    number: "2",
    title: "Onboarding Survey",
    description:
      "Tell us about your interests, study habits, and academic goals.",
  },
  {
    number: "3",
    title: "Auto-Build Schedule",
    description:
      "Sit back as Comet maps out your entire semester including rest days.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[rgba(175,90,60,0.05)] px-6 py-24">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-4 items-center text-center">
          <h2 className="font-bold text-[#f1f5f9] text-[clamp(32px,4vw,48px)] leading-none">
            Launch Sequence
          </h2>
          <p className="text-[#94a3b8] text-base leading-6">
            Get up and running in under 5 minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-[rgba(175,90,60,0.1)]" />

          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center pt-0">
              {/* Step circle */}
              <div className="relative z-10 bg-[#af5a3c] border-4 border-[#1a1817] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="font-bold text-white text-xl leading-7">
                  {step.number}
                </span>
              </div>
              <h3 className="font-bold text-[#f1f5f9] text-xl leading-7 mb-2">
                {step.title}
              </h3>
              <p className="text-[#94a3b8] text-base leading-6 max-w-[320px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
