"use client";

import { useEffect, useState } from "react";

const TASKS = [
  // ✅ Done by Sonny overnight (Mar 24):
  // - GPT-4o vision analysis wired into NextSport /api/analyze
  // - Stripe product + $14.99/mo price created (price_1TEO46BomMd7h7rZq2OKgn2Z)
  // - Stripe checkout updated to use real price ID
  "Run supabase/schema.sql in Supabase SQL editor (czfwjtkntetqgodndhmc)",
  "Register Stripe webhook in Stripe dashboard → /api/stripe/webhook",
  "Check Meta ad account reinstatement (appeal submitted Mar 23)",
  "Test NextSport live: upload a swing video and verify AI analysis works",
  "Set up nextsportai.com domain (optional)",
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
