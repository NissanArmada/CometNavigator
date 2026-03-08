import SignUpCard from "./components/SignUpCard";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#1a1817] flex items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-[-214px] left-[-128px] w-[768px] h-[643px] bg-[rgba(176,91,61,0.05)] blur-[70px] rounded-full pointer-events-none" />
      <SignUpCard />
    </div>
  );
}
