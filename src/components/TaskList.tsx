"use client";

import { useEffect, useState } from "react";

const TASKS = [
  // ✅ Done by Sonny overnight (Mar 24):
  // - GPT-4o vision analysis wired into NextSport /api/analyze
  // - Stripe product + $14.99/mo price created (price_1TEO46BomMd7h7rZq2OKgn2Z)
  // - Stripe checkout updated to use real price ID
  //
  // ✅ Done by Sonny overnight (Mar 25):
  // - Stripe webhook for NextSport CREATED (we_1TEkYQBomMd7h7rZrzmJlJO9) → /api/stripe/webhook ✅
  // - STRIPE_WEBHOOK_SECRET updated in Vercel + redeployed ✅
  // - Referral tracking fixed: signup/?ref=CODE now records referrals in DB ✅
  // - Dashboard shows Premium upgrade success toast ✅
  // - Weekly token refill cron added (vercel.json, every Mon 9am UTC) ✅
  // - Stuck "processing" analysis from Mar 24 cleaned up (marked failed, no tokens charged) ✅
  // - 2 users already signed up in the DB! ✅
  //
  // ✅ Done by Sonny overnight (Mar 29):
  // - Aris Chronicles Ep 6 "Devon Sends a Link" fully produced & scheduled:
  //   → TTS audio (onyx, 8.3 min), video rendered (10.8 MB), uploaded to Post Bridge
  //   → Scheduled April 6 at 7am ET (Post Bridge Post ID: 7b13cf97)
  //   → Plugs the content gap after Ep 5 (Apr 3) → Ep 6 (Apr 6)
  // - GitHub repo cleaned: orphan branch, .gitignore for media, API keys scrubbed
  // - Discovered: Post Bridge API is api.post-bridge.com (not api.postbridge.io)
  //
  // ✅ Done by Sonny overnight (Mar 30):
  // - Aris Chronicles Ep 7 "What Devon Built" fully produced & scheduled:
  //   → TTS audio (onyx voice, 7.5 min), video rendered (9.9 MB), uploaded to Post Bridge
  //   → Scheduled April 7 at 7am ET (Post Bridge Post ID: d1034a4d)
  //   → Script + status pushed to GitHub ruizhi1201/aris-chronicles
  //   → Schedule now: Ep5(Apr3) → Ep6(Apr6) → Ep7(Apr7) — 3 posts locked in ahead
  //   → Eps 8-10 still need production (written, target Apr 8-13)
  // - NOTE: Main OpenAI API key (sk-proj-b5uVg...) returned 401 — may need rotation
  "Check Meta ad account reinstatement (appeal submitted Mar 23) — restart Dayryz ads when clear",
  "Test NextSport end-to-end: sign up → onboard → upload swing → check AI analysis works",
  "Verify NextSport Stripe checkout → premium upgrade flow (Stripe webhook now live)",
  "Consider adding nextsportai.com custom domain to NextSport Vercel project",
  "Check Supabase email auth settings — disable confirmation email if users aren't activating",
  "🎬 Aris Chronicles: Episodes 8-10 still need production (written, no video yet) — target Apr 8, 9, 13",
  "🔑 Rotate main OpenAI API key — it returned 401 tonight (used SensForge key as fallback)",
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
