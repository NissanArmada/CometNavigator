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
  confirmedRecs:  number[];
  confirmRec:     (rec: StudyRec) => void;
  isConfirmed:    (index: number) => boolean;
  deletedKeys:    Set<string>;                 // "col-start" keys of deleted calendar events
  deleteEvent:    (key: string) => void;
  isDeleted:      (key: string) => boolean;
};

const CalendarContext = createContext<CalendarContextType>({
  addedSessions: [],
  addSession:    () => {},
  removeSession: () => {},
  hasSession:    () => false,
  confirmedRecs: [],
  confirmRec:    () => {},
  isConfirmed:   () => false,
  deletedKeys:   new Set(),
  deleteEvent:   () => {},
  isDeleted:     () => false,
});

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [addedSessions, setAddedSessions] = useState<AddedSession[]>([]);
  const [confirmedRecs, setConfirmedRecs] = useState<number[]>([]);
  const [deletedKeys,   setDeletedKeys]   = useState<Set<string>>(new Set());

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

  const deleteEvent = (key: string) =>
    setDeletedKeys(prev => new Set([...prev, key]));

  const isDeleted = (key: string) => deletedKeys.has(key);

  return (
    <CalendarContext.Provider
      value={{ addedSessions, addSession, removeSession, hasSession, confirmedRecs, confirmRec, isConfirmed, deletedKeys, deleteEvent, isDeleted }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export const useCalendar = () => useContext(CalendarContext);
