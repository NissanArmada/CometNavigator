import ClubCard from "./components/ClubCard";

const imgGradCapIcon = "/assets/29260df46ef9baa6c39f06b1689cfc3b0f1afe8a.svg";
const imgQuantumIcon = "/assets/ee732cf4fa2314812fc26c9caa8cb3b8151bf697.svg";
const imgGearIcon    = "/assets/f3d58c36969de219035f8384f9bfd34f7064524d.svg";
const imgDomeIcon    = "/assets/7bc124676c5809172f1761e2fb57147e17d87fc3.svg";

// User's weekly schedule from calendars.json (firebase_uid_001)
const userCalendar: Record<string, { name: string; start: string; end: string; type: string }[]> = {
  Monday: [
    { name: "PHYS 2325",           start: "09:00", end: "09:50", type: "Class"         },
    { name: "CS 3345",             start: "10:00", end: "11:15", type: "Class"         },
    { name: "MATH 2418",           start: "14:00", end: "15:15", type: "Class"         },
  ],
  Tuesday: [
    { name: "CS 3345",             start: "10:00", end: "11:15", type: "Class"         },
    { name: "CS 3345 Midterm Prep",start: "12:00", end: "13:30", type: "Study Session" },
    { name: "AIS Weekly Meetup",   start: "18:00", end: "19:30", type: "Club Meeting"  },
  ],
  Wednesday: [
    { name: "PHYS 2325",           start: "09:00", end: "09:50", type: "Class"         },
    { name: "MATH 2418",           start: "14:00", end: "15:15", type: "Class"         },
    { name: "Gym",                 start: "16:00", end: "17:00", type: "Personal"      },
  ],
  Thursday: [
    { name: "CS 3345",             start: "10:00", end: "11:15", type: "Class"         },
    { name: "PHYS 2325 Homework",  start: "13:00", end: "14:00", type: "Study Session" },
    { name: "Robotics Build Night",start: "19:00", end: "20:30", type: "Club Meeting"  },
  ],
  Friday: [
    { name: "PHYS 2325",           start: "09:00", end: "09:50", type: "Class"         },
    { name: "CS 3345 Midterm Exam",start: "11:00", end: "12:30", type: "Exam"          },
    { name: "MATH 2418",           start: "14:00", end: "15:15", type: "Class"         },
  ],
  Saturday: [],
  Sunday:   [],
};

const clubs = [
  {
    icon: imgGradCapIcon,
    iconBg: "bg-[rgba(176,91,61,0.2)]",
    name: "Artificial Intelligence Society (AIS)",
    match: "94%",
    whyText: "Matches your interest in Machine Learning and Python from your CS coursework.",
    slots: [
      {
        label: "Tuesday",
        events: [{ name: "INTRO NEURAL NETWORKS", start: "19:00", end: "20:30", color: "orange" as const }],
        calendarEvents: userCalendar.Tuesday,
      },
      {
        label: "Thursday",
        events: [{ name: "PROJECT GROUP MEETUP",  start: "18:00", end: "19:00", color: "gold"   as const }],
        calendarEvents: userCalendar.Thursday,
      },
    ],
  },
  {
    icon: imgQuantumIcon,
    iconBg: "bg-[rgba(59,130,246,0.2)]",
    name: "Association for Computing Machinery (ACM)",
    match: "88%",
    whyText: "Top CS club on campus. Aligns with your CS 3345 and CS 4349 courses.",
    slots: [
      {
        label: "Wednesday",
        events: [{ name: "WEEKLY GENERAL MEETING",  start: "18:00", end: "19:00", color: "orange" as const }],
        calendarEvents: userCalendar.Wednesday,
      },
      {
        label: "Friday",
        events: [{ name: "COMPETITIVE PROGRAMMING", start: "19:00", end: "21:00", color: "gold"   as const }],
        calendarEvents: userCalendar.Friday,
      },
    ],
  },
  {
    icon: imgGearIcon,
    iconBg: "bg-[rgba(107,114,128,0.2)]",
    name: "Robotics Club",
    match: "81%",
    whyText: "Strong overlap with embedded systems and algorithms. Great for CS/EE students.",
    slots: [
      {
        label: "Monday",
        events: [{ name: "BUILD NIGHT",          start: "19:00", end: "21:00", color: "orange" as const }],
        calendarEvents: userCalendar.Monday,
      },
      {
        label: "Wednesday",
        events: [{ name: "COMPETITION STRATEGY", start: "17:00", end: "18:00", color: "gold"   as const }],
        calendarEvents: userCalendar.Wednesday,
      },
    ],
  },
  {
    icon: imgDomeIcon,
    iconBg: "bg-[rgba(217,140,95,0.2)]",
    name: "Society of Physics Students (SPS)",
    match: "75%",
    whyText: "You are enrolled in PHYS 2325. Peer support and research opportunities available.",
    slots: [
      {
        label: "Tuesday",
        events: [{ name: "PHYSICS COLLOQUIUM",      start: "16:00", end: "17:30", color: "orange" as const }],
        calendarEvents: userCalendar.Tuesday,
      },
      {
        label: "Thursday",
        events: [{ name: "RESEARCH INTEREST PANEL", start: "18:30", end: "19:30", color: "gold"   as const }],
        calendarEvents: userCalendar.Thursday,
      },
    ],
  },
  {
    icon: imgQuantumIcon,
    iconBg: "bg-[rgba(34,197,94,0.2)]",
    name: "Comet Coding Collective (CCC)",
    match: "70%",
    whyText: "Casual coding community for project collaboration and hackathon prep.",
    slots: [
      {
        label: "Friday",
        events: [{ name: "OPEN HACK NIGHT",  start: "20:00", end: "23:00", color: "orange" as const }],
        calendarEvents: userCalendar.Friday,
      },
      {
        label: "Saturday",
        events: [{ name: "PROJECT DEMO DAY", start: "15:00", end: "17:00", color: "gold"   as const }],
        calendarEvents: userCalendar.Saturday,
      },
    ],
  },
];

export default function ClubsPage() {
  return (
    <div className="p-8 max-w-[1280px] mx-auto flex flex-col gap-10">
      {/* Header */}
      <div className="flex items-end justify-between">
        <h1 className="font-extrabold text-white text-[clamp(32px,4vw,48px)] tracking-[-1.2px]">
          Club Recommendations
        </h1>
        <button className="backdrop-blur-md bg-[rgba(44,40,38,0.45)] border border-[rgba(176,91,61,0.2)] text-[#d1d5db] text-xs font-bold tracking-[1.2px] uppercase px-6 py-3 rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/10 transition-colors cursor-pointer">
          View All Clubs
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {clubs.map((club) => (
          <ClubCard key={club.name} {...club} />
        ))}
      </div>
    </div>
  );
}
