import Link from "next/link";

const imgLogo = "/assets/66fbdce0468157c30a2bf4eea33f97c3f7199d0b.svg";
const imgEmailIcon = "/assets/c833ac234546f881ebe1dec796ca5fdc14f2ac27.svg";
const imgLockIcon = "/assets/1be06f62cc082e6148146c521a9482184c0cb193.svg";
const imgShieldIcon = "/assets/723592846210f7dcaba3af3170c8d13657b7b89a.svg";
const imgUserIcon = "/assets/d1a1ca28ae57339f85c103a54a8b571b3cbf4695.svg";

export default function SignUpCard() {
  return (
    <div className="flex flex-col gap-0 w-full max-w-[480px] mx-auto">
      {/* Branding */}
      <div className="flex flex-col items-center gap-3 pb-10">
        <div className="bg-[rgba(175,90,60,0.2)] border border-[rgba(175,90,60,0.3)] flex items-center justify-center p-3.5 rounded-3xl">
          <img src={imgLogo} alt="Comet" className="w-[30px] h-[30px] block" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <h1 className="font-bold text-[#f1f5f9] text-2xl tracking-[-0.6px]">Comet Navigation</h1>
          <p className="font-medium text-[#af5a3c] text-sm tracking-[1.4px] uppercase">Productivity Control Center</p>
        </div>
      </div>

      {/* Card */}
      <div
        className="backdrop-blur-md border border-white/5 rounded-[32px] p-10 flex flex-col gap-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8),0_0_20px_0_rgba(176,91,61,0.05)]"
        style={{ background: "linear-gradient(145deg, rgba(61,54,50,0.8) 0%, rgba(44,40,38,0.9) 100%)" }}
      >
        {/* Header */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#d98c5f]" />
            <h2 className="font-bold text-white text-2xl tracking-[-0.6px]">Create Explorer Profile</h2>
          </div>
          <p className="text-[#94a3b8] text-sm leading-[22.75px]">
            Establish your credentials for the planetary navigation network.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[#64748b] text-[11px] font-bold tracking-[1.65px] uppercase px-1">
              Communication Channel (Email)
            </label>
            <div className="relative">
              <img src={imgEmailIcon} alt="" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-4 block" />
              <input
                type="email"
                placeholder="explorer@colony.mars"
                className="w-full bg-[#121110] border-2 border-[#4a423e] rounded-3xl pl-[50px] pr-[18px] py-5 text-base text-[#f1f5f9] placeholder-[#475569] outline-none focus:border-[#af5a3c] transition-colors shadow-[inset_0_2px_4px_2px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-[#64748b] text-[11px] font-bold tracking-[1.65px] uppercase px-1">
              Access Protocol (Password)
            </label>
            <div className="relative">
              <img src={imgLockIcon} alt="" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-5 block" />
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full bg-[#121110] border-2 border-[#4a423e] rounded-3xl pl-[50px] pr-[18px] py-5 text-base text-[#f1f5f9] placeholder-[#475569] outline-none focus:border-[#af5a3c] transition-colors shadow-[inset_0_2px_4px_2px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label className="text-[#64748b] text-[11px] font-bold tracking-[1.65px] uppercase px-1">
              Verify Protocol
            </label>
            <div className="relative">
              <img src={imgShieldIcon} alt="" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-5 block" />
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full bg-[#121110] border-2 border-[#4a423e] rounded-3xl pl-[50px] pr-[18px] py-5 text-base text-[#f1f5f9] placeholder-[#475569] outline-none focus:border-[#af5a3c] transition-colors shadow-[inset_0_2px_4px_2px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Link href="/verify">
              <button className="w-full bg-[#b05b3d] border-b-4 border-black/20 text-white font-bold text-sm tracking-[0.35px] uppercase py-5 rounded-3xl flex items-center justify-center gap-3 shadow-[0_10px_15px_-3px_rgba(176,91,61,0.2),0_4px_6px_-4px_rgba(176,91,61,0.2)] hover:bg-[#9a4f35] transition-colors cursor-pointer">
                Initialize Authorization
                <img src={imgUserIcon} alt="" className="w-[16.667px] h-[13.667px] block" />
              </button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/5 pt-8 flex items-center justify-center gap-1">
          <span className="text-[#64748b] text-sm">Already registered with Comet Navigator?</span>
          <Link href="/login" className="text-[#d98c5f] text-sm font-bold underline decoration-[rgba(217,140,95,0.3)] hover:text-[#af5a3c] transition-colors ml-1">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
