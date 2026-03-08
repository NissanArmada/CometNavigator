"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { StudyRec } from "./dashboard/data";

export type AddedSession = {
  day: number;      // 0 = Mon … 6 = Sun (matches CalendarGrid col)
  start: string;    // "15:00"
  end: string;      // "17:00"
  label: string;
  sublabel?: string;
};

type CalendarContextType = {
  addedSessions:  AddedSession[];
  addSession:     (s: AddedSession) => void;
  removeSession:  (day: number, start: string) => void;
  hasSession:     (day: number, start: string) => boolean;
  confirmedRecs:  number[];                    // confirmed study rec indices
  confirmRec:     (rec: StudyRec) => void;     // confirm & add to calendar
  isConfirmed:    (index: number) => boolean;
};

const CalendarContext = createContext<CalendarContextType>({
  addedSessions: [],
  addSession:    () => {},
  removeSession: () => {},
  hasSession:    () => false,
  confirmedRecs: [],
  confirmRec:    () => {},
  isConfirmed:   () => false,
});

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [addedSessions, setAddedSessions] = useState<AddedSession[]>([]);
  const [confirmedRecs, setConfirmedRecs] = useState<number[]>([]);

  const addSession = (s: AddedSession) =>
    setAddedSessions(prev => [
      ...prev.filter(x => !(x.day === s.day && x.start === s.start)),
      s,
    ]);

  const removeSession = (day: number, start: string) =>
    setAddedSessions(prev => prev.filter(x => !(x.day === day && x.start === start)));

  const hasSession = (day: number, start: string) =>
    addedSessions.some(x => x.day === day && x.start === start);

  const confirmRec = (rec: StudyRec) => {
    setConfirmedRecs(prev =>
      prev.includes(rec.index) ? prev : [...prev, rec.index],
    );
    addSession({ day: rec.col, start: rec.start, end: rec.end, label: rec.label });
  };

  const isConfirmed = (index: number) => confirmedRecs.includes(index);

  return (
    <CalendarContext.Provider
      value={{ addedSessions, addSession, removeSession, hasSession, confirmedRecs, confirmRec, isConfirmed }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export const useCalendar = () => useContext(CalendarContext);
