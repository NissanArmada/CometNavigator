import LoginCard from "./components/LoginCard";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#1a1817] flex items-center justify-center px-4 py-[150px] relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-[-102px] right-[-128px] w-[512px] h-[410px] bg-[rgba(175,90,60,0.1)] blur-[60px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-51px] left-[-64px] w-[384px] h-[307px] bg-[rgba(175,90,60,0.05)] blur-[50px] rounded-full pointer-events-none" />
      <LoginCard />
    </div>
  );
}
