"use client";

import { useState, useEffect, useRef } from "react";

const EVENT_TYPES = [
  { value: "class",   label: "Class",          color: "#af5a3c" },
  { value: "study",   label: "Study Session",  color: "#3c7abf" },
  { value: "club",    label: "Club Meeting",   color: "#6a3cbf" },
  { value: "personal",label: "Personal",       color: "#3cbf7a" },
  { value: "exam",    label: "Exam / Quiz",    color: "#bf3c3c" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddEventModal({ open, onClose }: Props) {
  const [name,      setName]      = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime,   setEndTime]   = useState("");
  const [type,      setType]      = useState("class");
  const [visible,   setVisible]   = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  // drive enter/exit animation
  useEffect(() => {
    if (open) {
      // mount first, then trigger animation next frame
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [open]);

  // close on backdrop click
  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === backdropRef.current) onClose();
  }

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open && !visible) return null;

  const selected = EVENT_TYPES.find(t => t.value === type)!;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to actual event store
    onClose();
    setName(""); setStartTime(""); setEndTime(""); setType("class");
  }

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        transition: "opacity 220ms ease",
        opacity: visible ? 1 : 0,
      }}
    >
      <div
        style={{
          background: "rgba(28,24,22,0.95)",
          border: "1px solid rgba(175,90,60,0.25)",
          borderRadius: "18px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
          width: "min(420px, calc(100vw - 32px))",
          transition: "transform 260ms cubic-bezier(0.34,1.4,0.64,1), opacity 220ms ease",
          transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3">
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: `${selected.color}22`,
              border: `1px solid ${selected.color}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 200ms, border 200ms",
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: selected.color, transition: "background 200ms" }} />
            </div>
            <span style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 15, letterSpacing: "-0.3px" }}>
              New Event
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 28, height: 28, borderRadius: 7,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              color: "#64748b", fontSize: 16, lineHeight: 1,
              transition: "background 150ms, color 150ms",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "#f1f5f9"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "#64748b"; }}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">

          {/* Event name */}
          <div className="flex flex-col gap-[6px]">
            <label style={{ color: "#94a3b8", fontSize: 11, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase" }}>
              Event Name
            </label>
            <input
              required
              type="text"
              placeholder="e.g. PHYS 301 Lecture"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                padding: "10px 14px",
                color: "#f1f5f9",
                fontSize: 14,
                outline: "none",
                transition: "border-color 150ms",
                width: "100%",
                boxSizing: "border-box",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = `${selected.color}88`)}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>

          {/* Event type */}
          <div className="flex flex-col gap-[6px]">
            <label style={{ color: "#94a3b8", fontSize: 11, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase" }}>
              Event Type
            </label>
            <div className="flex gap-2 flex-wrap">
              {EVENT_TYPES.map(t => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setType(t.value)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 150ms",
                    border: type === t.value
                      ? `1px solid ${t.color}88`
                      : "1px solid rgba(255,255,255,0.08)",
                    background: type === t.value
                      ? `${t.color}22`
                      : "rgba(255,255,255,0.03)",
                    color: type === t.value ? t.color : "#64748b",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Time row */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-[6px] flex-1">
              <label style={{ color: "#94a3b8", fontSize: 11, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase" }}>
                Start Time
              </label>
              <input
                required
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  padding: "10px 14px",
                  color: "#f1f5f9",
                  fontSize: 14,
                  outline: "none",
                  transition: "border-color 150ms",
                  width: "100%",
                  boxSizing: "border-box",
                  colorScheme: "dark",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = `${selected.color}88`)}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>
            <div className="flex flex-col gap-[6px] flex-1">
              <label style={{ color: "#94a3b8", fontSize: 11, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase" }}>
                End Time
              </label>
              <input
                required
                type="time"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  padding: "10px 14px",
                  color: "#f1f5f9",
                  fontSize: 14,
                  outline: "none",
                  transition: "border-color 150ms",
                  width: "100%",
                  boxSizing: "border-box",
                  colorScheme: "dark",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = `${selected.color}88`)}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#94a3b8",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 150ms",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 2,
                padding: "10px",
                borderRadius: 10,
                background: selected.color,
                border: "none",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                transition: "opacity 150ms",
                letterSpacing: "0.2px",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
