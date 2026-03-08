import { auth } from "@/utils/firebase";
import Link from "next/link";
import React, { useState } from "react";

export default function SurveyPage() {
  const [major, setMajor] = useState<string>("");
  const [belief, setBelief] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [clubs, setClubs] = useState<string>("");
  const [workPreference, setWorkPreference] = useState<string>("");
  const [goals, setGoals] = useState<string>("");

  const toggleHobby = (hobby: string) => {
    setHobbies(prev =>
      prev.includes(hobby) ? prev.filter(h => h !== hobby) : [...prev, hobby]
    );
  };

  async function handleSubmit() {
    const user = auth.currentUser!;

    const res = await fetch("127.0.0.1:8000/onboarding/update-survey", {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "uid": user.uid,
          "major": major,
          "belief": belief,
          "nationality": nationality,
          "hobbies": hobbies,
          clubs,
          "work_preference": workPreference,
          "goals": goals,
        }),
    });

    if (!res.ok) {
      console.error("Failed to submit survey");
    }
  }

  return (
    <div className="min-h-screen flex justify-center px-6 py-20 bg-[radial-gradient(circle_at_top,rgba(175,90,60,0.15),transparent_60%),#0f0f0f]">
      <main className="w-full max-w-[440px]">
        <div className="backdrop-blur-md bg-[rgba(61,54,50,0.4)] border border-[rgba(175,90,60,0.2)] rounded-3xl p-5 sm:p-8 flex flex-col gap-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">

          <div className="text-center flex flex-col gap-2">
            <h1 className="text-white font-bold text-2xl">Initialize Your Mission</h1>
            <p className="text-[#94a3b8] text-sm">Complete your profile to begin your assignment.</p>
          </div>

          <form className="flex flex-col gap-6">

            {/* Major */}
            <div className="flex flex-col gap-2">
              <label className="text-[#94a3b8] text-xs font-semibold uppercase">What's your major?</label>
              <select
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="bg-[rgba(26,24,23,0.5)] border border-[#334155] rounded-2xl px-4 py-4 text-[#f1f5f9] focus:border-[#af5a3c] outline-none">
                <option value="">Select your major</option>
                <option>Business</option>
                <option>Computer Science</option>
                <option>Bio Engineering</option>
                <option>Pre-Med</option>
                <option>Other</option>
              </select>
            </div>

            {/* Belief */}
            <div className="flex flex-col gap-2">
              <label className="text-[#94a3b8] text-xs font-semibold uppercase">What's your belief?</label>
              <select
                value={belief}
                onChange={(e) => setBelief(e.target.value)}
                className="bg-[rgba(26,24,23,0.5)] border border-[#334155] rounded-2xl px-4 py-4 text-[#f1f5f9] focus:border-[#af5a3c] outline-none">
                <option value="">Select belief</option>
                <option>Christian</option>
                <option>Muslim</option>
                <option>Hindu</option>
                <option>Astrology</option>
                <option>Non-Believing</option>
                <option>Other</option>
              </select>
            </div>

            {/* Nationality */}
            <div className="flex flex-col gap-2">
              <label className="text-[#94a3b8] text-xs font-semibold uppercase">What's your nationality?</label>
              <input
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                placeholder="African American, Hispanic, Filipino..."
                className="bg-[rgba(26,24,23,0.5)] border border-[#334155] rounded-2xl px-4 py-4 text-[#f1f5f9] placeholder-[#475569] focus:border-[#af5a3c] outline-none"
              />
            </div>

            {/* Hobbies */}
            <div className="flex flex-col gap-3">
              <label className="text-[#94a3b8] text-xs font-semibold uppercase">Any hobbies?</label>
              <div className="flex flex-wrap gap-4 text-[#f1f5f9] text-sm">
                {["Music", "Gaming", "Volunteering", "Physical Activity"].map(hobby => (
                  <label key={hobby} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hobbies.includes(hobby)}
                      onChange={() => toggleHobby(hobby)}
                    />
                    {hobby}
                  </label>
                ))}
              </div>
            </div>

            {/* Clubs */}
            <div className="flex flex-col gap-2">
              <label className="text-[#94a3b8] text-xs font-semibold uppercase">Past Clubs</label>
              <input
                value={clubs}
                onChange={(e) => setClubs(e.target.value)}
                placeholder="Chess Club, Robotics Club..."
                className="bg-[rgba(26,24,23,0.5)] border border-[#334155] rounded-2xl px-4 py-4 text-[#f1f5f9] placeholder-[#475569] focus:border-[#af5a3c] outline-none"
              />
            </div>

            {/* Work Preference */}
            <div className="flex flex-col gap-2">
              <label className="text-[#94a3b8] text-xs font-semibold uppercase">Day or night person?</label>
              <select
                value={workPreference}
                onChange={(e) => setWorkPreference(e.target.value)}
                className="bg-[rgba(26,24,23,0.5)] border border-[#334155] rounded-2xl px-4 py-4 text-[#f1f5f9] focus:border-[#af5a3c] outline-none">
                <option value="">Select preference</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Night</option>
                <option>Late Night</option>
              </select>
            </div>

            {/* Goals */}
            <div className="flex flex-col gap-2">
              <label className="text-[#94a3b8] text-xs font-semibold uppercase">Academic / Personal Goals</label>
              <textarea
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                rows={4}
                placeholder="What do you hope to achieve?"
                className="bg-[rgba(26,24,23,0.5)] border border-[#334155] rounded-2xl px-4 py-4 text-[#f1f5f9] placeholder-[#475569] focus:border-[#af5a3c] outline-none resize-none"
              />
            </div>

            {/* Button */}
            <Link href="/dashboard"
              onClick={handleSubmit}
              className="w-full bg-[#af5a3c] text-white font-bold py-4 rounded-2xl hover:bg-[#9a4f35] transition-colors text-center">
              Continue Mission
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
}