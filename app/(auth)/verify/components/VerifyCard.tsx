import Link from "next/link";

const imgLogo = "http://localhost:3845/assets/66fbdce0468157c30a2bf4eea33f97c3f7199d0b.svg";
const imgEmailCheck = "http://localhost:3845/assets/2f3acfb434eedbf292654b4a52475208abd1623c.svg";
const imgArrow = "http://localhost:3845/assets/edc88a4d18a1ece080791cdd69969da7344d954e.svg";

export default function VerifyCard() {
  return (
    <div className="flex flex-col items-center gap-0 w-full max-w-[480px] mx-auto">
      {/* Branding */}
      <div className="flex flex-col items-center gap-3 pb-12">
        <div className="bg-[rgba(175,90,60,0.2)] border border-[rgba(175,90,60,0.3)] flex items-center justify-center p-3.5 rounded-3xl">
          <img src={imgLogo} alt="Comet" className="w-[30px] h-[30px] block" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <h1 className="font-bold text-[#f1f5f9] text-2xl tracking-[-0.6px]">Comet Navigation</h1>
          <p className="font-medium text-[#af5a3c] text-sm tracking-[1.4px] uppercase">Productivity Control Center</p>
        </div>
      </div>

      {/* Card */}
      <div className="backdrop-blur-lg bg-[rgba(61,54,50,0.6)] border border-[rgba(217,140,95,0.15)] rounded-3xl w-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden">
        {/* Email icon */}
        <div className="flex justify-center pt-16 pb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[rgba(217,140,95,0.2)] blur-[20px] rounded-full" />
            <div className="relative bg-[rgba(26,24,23,0.4)] border border-[rgba(217,140,95,0.3)] rounded-full w-24 h-24 flex items-center justify-center">
              <img src={imgEmailCheck} alt="Email" className="w-10 h-[34px] block" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-4 px-16 pb-8">
          <h2 className="font-semibold text-white text-[30px] tracking-[-0.75px] text-center">Verify Your Email</h2>
          <p className="text-[#94a3b8] text-base leading-[26px] text-center">
            We sent a verification link to your email address. Please confirm to proceed.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-8 px-16 pb-14">
          <Link href="/dashboard" className="w-full">
            <button className="w-full bg-[#b05b3d] text-white font-semibold text-sm tracking-[0.35px] py-2.5 rounded-2xl flex items-center justify-center gap-3 shadow-[0_20px_25px_-5px_rgba(176,91,61,0.1),0_8px_10px_-6px_rgba(176,91,61,0.1)] hover:bg-[#9a4f35] transition-colors cursor-pointer">
              Continue to Dashboard
              <img src={imgArrow} alt="" className="w-[12.5px] h-[12.5px] block" />
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[#64748b] text-sm font-medium">Didn&apos;t receive it?</span>
            <button className="text-[#d98c5f] text-sm font-bold underline decoration-[rgba(217,140,95,0.3)] hover:text-[#af5a3c] transition-colors cursor-pointer">
              Resend Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
