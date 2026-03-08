import Link from "next/link";

const imgLogo = "/assets/66fbdce0468157c30a2bf4eea33f97c3f7199d0b.svg";
const imgUserIcon = "/assets/49f093c9fabb4443ade4861b5c5cb2e057e5e291.svg";
const imgLockIcon = "/assets/b16637946c9f7951ab4749fe525ac290dc78ee02.svg";
const imgArrowIcon = "/assets/9076dd6e4c1895d69009143f7dd6c131e31d8c88.svg";

export default function LoginCard() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[440px] mx-auto">
      {/* Branding */}
      <div className="flex flex-col items-center gap-3">
        <div className="bg-[rgba(175,90,60,0.2)] border border-[rgba(175,90,60,0.3)] flex items-center justify-center p-3.5 rounded-3xl">
          <img src={imgLogo} alt="Comet" className="w-[30px] h-[30px] block" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <h1 className="font-bold text-[#f1f5f9] text-2xl tracking-[-0.6px]">Comet Navigation</h1>
          <p className="font-medium text-[#af5a3c] text-sm tracking-[1.4px] uppercase">Productivity Control Center</p>
        </div>
      </div>

      {/* Card */}
      <div className="backdrop-blur-md bg-[rgba(61,54,50,0.4)] border border-[rgba(175,90,60,0.2)] rounded-3xl p-8 flex flex-col gap-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-white text-xl leading-7">Mission Login</h2>
          <p className="text-[#94a3b8] text-sm leading-5">Initialize your session to access the tactical dashboard.</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6">
          {/* NetID */}
          <div className="flex flex-col gap-2">
            <label className="text-[#94a3b8] text-xs font-semibold tracking-[0.6px] uppercase px-1">NetID</label>
            <div className="relative">
              <img src={imgUserIcon} alt="" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 block" />
              <input
                type="text"
                placeholder="Enter your NetID"
                className="w-full bg-[rgba(26,24,23,0.5)] border border-[#334155] rounded-2xl pl-12 pr-4 py-[17px] text-base text-[#f1f5f9] placeholder-[#475569] outline-none focus:border-[#af5a3c] transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <label className="text-[#94a3b8] text-xs font-semibold tracking-[0.6px] uppercase">Password</label>
              <button className="text-[#af5a3c] text-xs font-medium hover:text-[#d98c5f] transition-colors">Forgot Password?</button>
            </div>
            <div className="relative">
              <img src={imgLockIcon} alt="" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-[21px] block" />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-[rgba(26,24,23,0.5)] border border-[#334155] rounded-2xl pl-12 pr-4 py-[17px] text-base text-[#f1f5f9] placeholder-[#475569] outline-none focus:border-[#af5a3c] transition-colors"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Link href="/onboard-survey">
              <button className="w-full bg-[#af5a3c] text-white font-bold text-base py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_10px_15px_-3px_rgba(175,90,60,0.2),0_4px_6px_-4px_rgba(175,90,60,0.2)] hover:bg-[#9a4f35] transition-colors cursor-pointer">
                Begin Mission
                <img src={imgArrowIcon} alt="" className="w-[15px] h-[15px] block" />
              </button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[rgba(51,65,85,0.5)] pt-6 flex items-center justify-center gap-1">
          <span className="text-[#94a3b8] text-sm">New explorer?</span>
          <Link href="/signup" className="text-[#d98c5f] text-sm font-bold underline decoration-[rgba(217,140,95,0.3)] hover:text-[#af5a3c] transition-colors">
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
}
