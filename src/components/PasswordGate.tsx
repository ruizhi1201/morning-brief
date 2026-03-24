"use client";

import { useEffect, useState, useCallback } from "react";

const CORRECT_PASSWORD = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || "ruizhi2026";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    try {
      const val = localStorage.getItem("mb_authed");
      setAuthed(val === "true");
    } catch {
      setAuthed(false);
    }
  }, []);

  const submit = useCallback(() => {
    if (input === CORRECT_PASSWORD) {
      localStorage.setItem("mb_authed", "true");
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setInput("");
    }
  }, [input]);

  // Loading state
  if (authed === null) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0A0F1E" }}
      >
        <div className="w-6 h-6 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (authed) return <>{children}</>;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#0A0F1E" }}
    >
      <div
        className={`w-full max-w-sm transition-transform ${shake ? "animate-bounce" : ""}`}
        style={{ animation: shake ? "shake 0.4s ease" : undefined }}
      >
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">☀️</div>
          <h1 className="text-white text-2xl font-bold mb-1">Morning Brief</h1>
          <p className="text-gray-500 text-sm">Good morning, Ruizhi</p>
        </div>

        <div
          style={{ background: "#111827", border: "1px solid #1f2937" }}
          className="rounded-2xl p-5"
        >
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Password"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none text-sm transition-all"
              style={{
                background: "#0A0F1E",
                border: `1px solid ${error ? "#EF4444" : "#1f2937"}`,
              }}
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-xs text-center">Incorrect password</p>
            )}
            <button
              onClick={submit}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
              style={{ background: "#F59E0B", color: "#0A0F1E" }}
            >
              Enter
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}
