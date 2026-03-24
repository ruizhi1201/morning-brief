"use client";

import LiveClock from "./LiveClock";
import TaskList from "./TaskList";
import { useRouter } from "next/navigation";

interface MetricsData {
  subscribers: number;
  mrr: number;
  error?: string;
}

interface MemoData {
  date: string;
  preview: string;
  url: string;
  logsUrl: string;
}

interface DashboardProps {
  metrics: MetricsData;
  lastUpdated: string;
  latestMemo: MemoData | null;
}

const PROJECTS = [
  {
    name: "Dayryz",
    status: "live" as const,
    url: "https://dayryz.com",
    statusColor: "#10B981",
    statusLabel: "Live",
  },
  {
    name: "NextSport",
    status: "building" as const,
    url: "https://nextsport-i82eo57mq-ruizhi1201s-projects.vercel.app",
    statusColor: "#F59E0B",
    statusLabel: "Building",
  },
  {
    name: "Sonny Logs",
    status: "building" as const,
    url: "https://github.com/ruizhi1201/sonny-logs",
    statusColor: "#3B82F6",
    statusLabel: "Active",
  },
];

const DECISIONS = [
  {
    text: "NextSport: mobile web first, native app later",
    date: "Mar 24",
  },
  {
    text: "NextSport price: $14.99/mo",
    date: "Mar 24",
  },
  {
    text: "Dayryz paid ads: Meta, $250 pilot, 3 creatives ready",
    date: "Mar 23",
  },
];

const QUICK_LINKS = [
  { label: "Dayryz", url: "https://dayryz.com", emoji: "🌐" },
  { label: "NextSport", url: "https://nextsport-i82eo57mq-ruizhi1201s-projects.vercel.app", emoji: "⚾" },
  { label: "Stripe", url: "https://dashboard.stripe.com", emoji: "💳" },
  { label: "Supabase (D)", url: "https://supabase.com", emoji: "🗄️" },
  { label: "Supabase (N)", url: "https://supabase.com", emoji: "🗄️" },
  { label: "GitHub", url: "https://github.com/ruizhi1201", emoji: "🐙" },
  { label: "Vercel", url: "https://vercel.com", emoji: "▲" },
  { label: "Sonny Logs", url: "https://github.com/ruizhi1201/sonny-logs", emoji: "📓" },
];

export default function Dashboard({ metrics, lastUpdated, latestMemo }: DashboardProps) {
  const router = useRouter();

  return (
    <div
      className="min-h-screen px-4 pb-10"
      style={{ background: "#0A0F1E" }}
    >
      <div className="max-w-sm mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between pt-5 pb-5">
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">☀️ Morning Brief</h1>
          </div>
          <div className="flex items-center gap-3">
            <LiveClock />
            <button
              onClick={() => router.refresh()}
              className="text-xs px-2 py-1 rounded-lg transition-all active:scale-95"
              style={{ background: "#1f2937", color: "#9CA3AF" }}
            >
              ↻
            </button>
          </div>
        </div>

        <div className="space-y-6">

          {/* Section 1 — Projects */}
          <section>
            <h2 className="text-white font-semibold text-base mb-3">Projects</h2>
            <div className="grid grid-cols-3 gap-2">
              {PROJECTS.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl p-3 transition-all active:scale-95"
                  style={{ background: "#111827", border: "1px solid #1f2937" }}
                >
                  <div
                    className="w-2 h-2 rounded-full mb-2"
                    style={{ background: p.statusColor }}
                  />
                  <div className="text-white text-xs font-medium leading-tight">{p.name}</div>
                  <div className="text-xs mt-1" style={{ color: p.statusColor }}>
                    {p.statusLabel}
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Section 2 — Live Metrics */}
          <section>
            <h2 className="text-white font-semibold text-base mb-3">Live Metrics</h2>
            <div
              className="rounded-2xl p-4 space-y-3"
              style={{ background: "#111827", border: "1px solid #1f2937" }}
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">💳 Dayryz Pro subscribers</span>
                <span className="text-white font-semibold text-sm">
                  {metrics.error ? "—" : metrics.subscribers}
                </span>
              </div>
              <div className="h-px" style={{ background: "#1f2937" }} />
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">💰 MRR</span>
                <span className="font-semibold text-sm" style={{ color: "#10B981" }}>
                  {metrics.error ? "—" : `$${metrics.mrr}`}
                </span>
              </div>
              <div className="h-px" style={{ background: "#1f2937" }} />
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">📱 Meta Ads</span>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#451a03", color: "#F59E0B" }}>
                  Pending reinstatement
                </span>
              </div>
              <div className="h-px" style={{ background: "#1f2937" }} />
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">📅 Content Pipeline</span>
                <span className="text-gray-400 text-xs">Last run: today 8am ET</span>
              </div>
            </div>
          </section>

          {/* Section 3 — R&D Team Memo */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-semibold text-base">🧠 R&D Team Memo</h2>
              {latestMemo && (
                <a
                  href={latestMemo.logsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs"
                  style={{ color: "#6B7280" }}
                >
                  Sonny Logs →
                </a>
              )}
            </div>
            <div
              className="rounded-2xl p-4"
              style={{ background: "#111827", border: "1px solid #1f2937" }}
            >
              {latestMemo ? (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "#1e3a5f", color: "#60a5fa" }}>
                      {latestMemo.date}
                    </span>
                    <span className="text-xs" style={{ color: "#6B7280" }}>
                      Alex 🚀 Sam 🎯 Maya 💰 Dev 🔬 Zara 📊
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed mt-2 line-clamp-6" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {latestMemo.preview}
                  </p>
                  <a
                    href={latestMemo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-xs font-medium"
                    style={{ color: "#60a5fa" }}
                  >
                    Read Full Memo →
                  </a>
                </>
              ) : (
                <p className="text-gray-600 text-xs text-center py-2">No memo yet — runs every Sunday 7am ET</p>
              )}
            </div>
          </section>

          {/* Section 4 — Tasks */}
          <section>
            <TaskList />
          </section>

          {/* Section 5 — Recent Decisions */}
          <section>
            <h2 className="text-white font-semibold text-base mb-3">Recent Decisions</h2>
            <div
              className="rounded-2xl p-4 space-y-3"
              style={{ background: "#111827", border: "1px solid #1f2937" }}
            >
              {DECISIONS.map((d, i) => (
                <div key={i}>
                  {i > 0 && <div className="h-px mb-3" style={{ background: "#1f2937" }} />}
                  <div className="flex gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: "#F59E0B" }}
                    />
                    <div>
                      <p className="text-gray-300 text-sm leading-snug">{d.text}</p>
                      <p className="text-gray-600 text-xs mt-1">— {d.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6 — Quick Links */}
          <section>
            <h2 className="text-white font-semibold text-base mb-3">Quick Links</h2>
            <div className="grid grid-cols-4 gap-2">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 py-3 rounded-2xl transition-all active:scale-95"
                  style={{ background: "#111827", border: "1px solid #1f2937" }}
                >
                  <span className="text-xl">{link.emoji}</span>
                  <span className="text-gray-400 text-xs text-center leading-tight">{link.label}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center pt-2 pb-4 space-y-1">
            <p className="text-gray-600 text-xs">Last updated: {lastUpdated}</p>
            <p className="text-gray-600 text-xs">Built by Sonny 🧭</p>
          </footer>

        </div>
      </div>
    </div>
  );
}
