import ProfileBanner from "./components/ProfileBanner";
import AcademicPortfolio from "./components/AcademicPortfolio";
import SpecialInterests from "./components/SpecialInterests";
import TaskForces from "./components/TaskForces";

export default function ProfilePage() {
  return (
    <div className="p-8 max-w-[1280px] mx-auto flex flex-col gap-6">
      <ProfileBanner />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column */}
        <AcademicPortfolio />

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <SpecialInterests />
          <TaskForces />
        </div>
      </div>

      <div className="border-t border-white/5 h-16" />
    </div>
  );
}
