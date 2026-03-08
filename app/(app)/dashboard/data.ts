// Derived from sample data/study_recs.json (firebase_uid_001)
// and sample data/calendars.json (firebase_uid_001)
import studyRecsRaw from "../../../sample data/study_recs.json";

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
function mapDateToCol(dayStr: string): number {
  const date = new Date(dayStr);
  const day = date.getDay(); 
  return day === 0 ? 6 : day - 1;
}

const labelsByIndex: Record<number, { label: string; course: string }> = {
  1: { label: "CS 3345 – Graphs & Trees", course: "CS 3345 – Data Structures & Algorithms" },
  2: { label: "MATH 2418 – Eigenvalues", course: "MATH 2418 – Linear Algebra" },
  3: { label: "CS 4349 – Dynamic Programming", course: "CS 4349 – Algorithm Analysis" },
  4: { label: "CS 3345 – Sorting Algorithms", course: "CS 3345 – Data Structures & Algorithms" },
  5: { label: "CS 4349 – Greedy Algorithms", course: "CS 4349 – Algorithm Analysis" },
};

const userZeroRecs = studyRecsRaw[0].recommendations;

export const studyRecs: StudyRec[] = userZeroRecs.map((r) => ({
  index: r.index,
  col: mapDateToCol(r.date),
  start: r.start_time,
  end: r.end_time,
  label: labelsByIndex[r.index]?.label || "Study Session",
  course: labelsByIndex[r.index]?.course || "Study Course",
  reason: r.reason,
}));

// From calendars.json (firebase_uid_001) — mirrors the hardcoded events in CalendarGrid
// We preserve this export in case other components were reliant on it.
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
