// Derived from sample data/study_recs.json (firebase_uid_001)
// and sample data/calendars.json (firebase_uid_001)

export type StudyRec = {
  index:  number;
  col:    number;   // 0=Mon … 6=Sun
  start:  string;   // "HH:MM"
  end:    string;
  label:  string;
  course: string;
  reason: string;
};

export type CalEvent = {
  col:      number;
  title:    string;
  subtitle: string;
  start:    string;
  end:      string;
  type:     "class" | "study" | "club" | "personal" | "exam";
};

// Dates: 2026-03-02=Mon(0), 03=Tue(1), 04=Wed(2), 05=Thu(3), 06=Fri(4)
export const studyRecs: StudyRec[] = [
  {
    index: 1, col: 0, start: "15:30", end: "17:00",
    label: "CS 3345 – Graphs & Trees",
    course: "CS 3345 – Data Structures & Algorithms",
    reason: "You have a free block after your last class. Good time to review Graphs and Trees before the weekend.",
  },
  {
    index: 2, col: 1, start: "14:00", end: "15:30",
    label: "MATH 2418 – Eigenvalues",
    course: "MATH 2418 – Linear Algebra",
    reason: "Your afternoon is open after your study group ends. Eigenvalues review aligns with your MATH 2418 coursework.",
  },
  {
    index: 3, col: 1, start: "16:00", end: "17:30",
    label: "CS 4349 – Dynamic Programming",
    course: "CS 4349 – Algorithm Analysis",
    reason: "CS 4349 Dynamic Programming session fits your free window before the AIS meetup at 18:00.",
  },
  {
    index: 4, col: 3, start: "14:30", end: "16:00",
    label: "CS 3345 – Sorting Algorithms",
    course: "CS 3345 – Data Structures & Algorithms",
    reason: "Post-lunch free block. You missed the morning session — this is the next available slot to catch up on CS 3345 sorting algorithms.",
  },
  {
    index: 5, col: 4, start: "15:30", end: "17:00",
    label: "CS 4349 – Greedy Algorithms",
    course: "CS 4349 – Algorithm Analysis",
    reason: "Friday afternoon opens up after MATH class. Greedy Algorithms review is a good wind-down for the week.",
  },
];

// From calendars.json (firebase_uid_001) — mirrors the hardcoded events in CalendarGrid
export const calendarEvents: CalEvent[] = [
  // MON
  { col: 0, title: "PHYS 2325",            subtitle: "ECSS 2.410",        start: "09:00", end: "09:50", type: "class"    },
  { col: 0, title: "CS 3345",              subtitle: "ECSS 4.619",        start: "10:00", end: "11:15", type: "class"    },
  { col: 0, title: "MATH 2418",            subtitle: "SOM 2.901",         start: "14:00", end: "15:15", type: "class"    },
  // TUE
  { col: 1, title: "CS 3345",              subtitle: "ECSS 4.619",        start: "10:00", end: "11:15", type: "class"    },
  { col: 1, title: "CS 3345 Midterm Prep", subtitle: "JSOM 1.118",        start: "12:00", end: "13:30", type: "study"    },
  { col: 1, title: "AIS Weekly Meetup",    subtitle: "ECSS 2.203",        start: "18:00", end: "19:30", type: "club"     },
  // WED
  { col: 2, title: "PHYS 2325",            subtitle: "ECSS 2.410",        start: "09:00", end: "09:50", type: "class"    },
  { col: 2, title: "MATH 2418",            subtitle: "SOM 2.901",         start: "14:00", end: "15:15", type: "class"    },
  { col: 2, title: "Gym",                  subtitle: "",                  start: "16:00", end: "17:00", type: "personal" },
  // THU
  { col: 3, title: "CS 3345",              subtitle: "ECSS 4.619",        start: "10:00", end: "11:15", type: "class"    },
  { col: 3, title: "PHYS 2325 Homework",   subtitle: "McDermott Library", start: "13:00", end: "14:00", type: "study"    },
  { col: 3, title: "Robotics Build Night", subtitle: "ECSS 1.202",        start: "19:00", end: "20:30", type: "club"     },
  // FRI
  { col: 4, title: "PHYS 2325",            subtitle: "ECSS 2.410",        start: "09:00", end: "09:50", type: "class"    },
  { col: 4, title: "CS 3345 Midterm Exam", subtitle: "ECSS 2.415",        start: "11:00", end: "12:30", type: "exam"     },
  { col: 4, title: "MATH 2418",            subtitle: "SOM 2.901",         start: "14:00", end: "15:15", type: "class"    },
];
