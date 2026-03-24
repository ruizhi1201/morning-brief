"use client";

import { useEffect, useState } from "react";

const TASKS = [
  "Connect NextSport to real AI analysis pipeline",
  "Create $14.99/mo Stripe price for NextSport",
  "Check Meta ad account reinstatement",
  "Wire swing analysis into NextSport /api/analyze",
  "Set up nextsportai.com domain",
];

function getTodayKey() {
  const d = new Date();
  return `mb_tasks_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`;
}

export default function TaskList() {
  const [checked, setChecked] = useState<boolean[]>(new Array(TASKS.length).fill(false));

  useEffect(() => {
    const key = getTodayKey();
    try {
      const stored = localStorage.getItem(key);
      if (stored) setChecked(JSON.parse(stored));
    } catch {}
  }, []);

  const toggle = (i: number) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
    try {
      localStorage.setItem(getTodayKey(), JSON.stringify(next));
    } catch {}
  };

  const done = checked.filter(Boolean).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-white font-semibold text-base">Today&apos;s Focus</h2>
        <span className="text-xs text-gray-500">
          {done}/{TASKS.length} done
        </span>
      </div>
      <div
        style={{ background: "#111827", border: "1px solid #1f2937" }}
        className="rounded-2xl p-4 space-y-3"
      >
        {TASKS.map((task, i) => (
          <label
            key={i}
            className="flex items-start gap-3 cursor-pointer group"
            onClick={() => toggle(i)}
          >
            <div
              className="mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all"
              style={{
                borderColor: checked[i] ? "#F59E0B" : "#374151",
                background: checked[i] ? "#F59E0B" : "transparent",
              }}
            >
              {checked[i] && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="#0A0F1E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span
              className="text-sm leading-snug transition-all"
              style={{ color: checked[i] ? "#6B7280" : "#D1D5DB", textDecoration: checked[i] ? "line-through" : "none" }}
            >
              {task}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
