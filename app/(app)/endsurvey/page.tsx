"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SwipeCardStack, type SwipeCard } from "@/components/ui/swipe-card-stack";

const imgLogo = "/assets/941b64066fe68786ba4f0c782c9cd092f2088c8a.svg";

const cards: SwipeCard[] = [
  {
    id: "ais",
    clubName: "Artificial Intelligence Society (AIS)",
    question: "Have you attended the Intro to Neural Networks Workshop or AIS Weekly Meetup?",
    match: 94,
    reason: "Matches your interest in Machine Learning and Python from your CS coursework.",
    events: [
      { day: "Tuesday",  name: "Intro to Neural Networks Workshop", time: "7:00–8:30 PM" },
      { day: "Thursday", name: "Project Group Meetup",              time: "6:00–7:00 PM" },
    ],
    color: "rgba(175,90,60,0.08)",
  },
  {
    id: "acm",
    clubName: "Association for Computing Machinery (ACM)",
    question: "Have you attended ACM's Weekly General Meeting or Competitive Programming Practice?",
    match: 88,
    reason: "Top CS club on campus. Aligns with your CS 3345 and CS 4349 courses.",
    events: [
      { day: "Wednesday", name: "Weekly General Meeting",          time: "6:00–7:00 PM" },
      { day: "Friday",    name: "Competitive Programming Practice", time: "7:00–9:00 PM" },
    ],
    color: "rgba(59,130,246,0.05)",
  },
  {
    id: "robotics",
    clubName: "Robotics Club",
    question: "Have you been to a Robotics Club Build Night or Competition Strategy Meeting?",
    match: 81,
    reason: "Strong overlap with embedded systems and algorithms. Great for CS/EE students.",
    events: [
      { day: "Monday",    name: "Build Night",                  time: "7:00–9:00 PM" },
      { day: "Wednesday", name: "Competition Strategy Meeting", time: "5:00–6:00 PM" },
    ],
    color: "rgba(107,114,128,0.06)",
  },
  {
    id: "sps",
    clubName: "Society of Physics Students (SPS)",
    question: "Have you joined a Physics Colloquium or the Research Interest Panel?",
    match: 75,
    reason: "You are enrolled in PHYS 2325. Peer support and research opportunities available.",
    events: [
      { day: "Tuesday",  name: "Physics Colloquium Watch Party", time: "4:00–5:30 PM" },
      { day: "Thursday", name: "Research Interest Panel",        time: "6:30–7:30 PM" },
    ],
    color: "rgba(217,140,95,0.05)",
  },
  {
    id: "ccc",
    clubName: "Comet Coding Collective (CCC)",
    question: "Have you participated in an Open Hack Night or Project Demo Day with CCC?",
    match: 70,
    reason: "Casual coding community for project collaboration and hackathon prep.",
    events: [
      { day: "Friday",   name: "Open Hack Night",  time: "8:00–11:00 PM" },
      { day: "Saturday", name: "Project Demo Day", time: "3:00–5:00 PM"  },
    ],
    color: "rgba(34,197,94,0.04)",
  },
  {
    id: "ieee",
    clubName: "IEEE Student Branch",
    question: "Have you attended an IEEE Tech Talk or the Student Engineering Conference?",
    match: 79,
    reason: "Great for EE+CS crossover. Networking events & industry speakers.",
    events: [
      { day: "Monday",    name: "Tech Talk",                     time: "5:30–6:30 PM" },
      { day: "Wednesday", name: "Student Engineering Conference", time: "4:00–6:00 PM" },
    ],
    color: "rgba(0,122,204,0.05)",
  },
  {
    id: "wic",
    clubName: "Women in Computing (WiC)",
    question: "Have you joined a WiC Mentorship Circle or Career Prep Workshop?",
    match: 85,
    reason: "Inclusive community supporting underrepresented students in tech.",
    events: [
      { day: "Tuesday",  name: "Mentorship Circle",     time: "6:00–7:00 PM" },
      { day: "Thursday", name: "Career Prep Workshop",  time: "5:00–6:30 PM" },
    ],
    color: "rgba(219,39,119,0.05)",
  },
  {
    id: "datascience",
    clubName: "Data Science @ UTD",
    question: "Have you attended a Data Deep Dive or Kaggle Competition Night?",
    match: 90,
    reason: "Perfect match for your ML interests and stats background.",
    events: [
      { day: "Wednesday", name: "Data Deep Dive",          time: "7:00–8:30 PM" },
      { day: "Friday",    name: "Kaggle Competition Night", time: "6:00–9:00 PM" },
    ],
    color: "rgba(124,58,237,0.05)",
  },
  {
    id: "cybersec",
    clubName: "Cybersecurity Club",
    question: "Have you tried a CTF Practice Session or the Security Workshop?",
    match: 77,
    reason: "Hands-on security training. Complements OS and networking knowledge.",
    events: [
      { day: "Monday",   name: "CTF Practice Session", time: "7:00–9:00 PM" },
      { day: "Thursday", name: "Security Workshop",    time: "6:30–8:00 PM" },
    ],
    color: "rgba(16,185,129,0.05)",
  },
  {
    id: "entrepreneur",
    clubName: "UTD Entrepreneur Society",
    question: "Have you attended a Pitch Night or Startup Mixer?",
    match: 72,
    reason: "Bridge tech skills with business. Great for side-project founders.",
    events: [
      { day: "Tuesday",  name: "Pitch Night",    time: "7:00–8:30 PM" },
      { day: "Saturday", name: "Startup Mixer",  time: "2:00–4:00 PM" },
    ],
    color: "rgba(245,158,11,0.05)",
  },
];

export default function EndSurveyPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, "yes" | "no">>({});

  const handleAnswer = (id: string, answer: "yes" | "no") => {
    setAnswers(prev => ({ ...prev, [id]: answer }));
  };

  const handleComplete = () => {
    // Could persist answers — for now navigate to clubs after a short delay
    setTimeout(() => router.push("/clubs"), 1800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-10 pb-16 relative">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[rgba(175,90,60,0.08)] blur-[80px] rounded-full" />
      </div>

      {/* Header */}
      <div className="flex flex-col items-center gap-3 mb-8 z-10">
        <div className="bg-[rgba(175,90,60,0.2)] border border-[rgba(175,90,60,0.3)] flex items-center justify-center p-2.5 rounded-2xl">
          <img src={imgLogo} alt="Comet" className="w-6 h-6 block" />
        </div>
        <div className="text-center">
          <h1 className="font-extrabold text-white text-2xl tracking-[-0.6px]">Club Check-In</h1>
          <p className="text-[#9ca3af] text-sm mt-1">
            Swipe <span className="text-[#22c55e] font-semibold">right</span> if you've tried it,{" "}
            <span className="text-[#ef4444] font-semibold">left</span> if not yet
          </p>
        </div>
      </div>

      {/* Swipe deck */}
      <div className="w-full max-w-[400px] z-10">
        <SwipeCardStack
          cards={cards}
          onAnswer={handleAnswer}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}
