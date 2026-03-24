import PasswordGate from "@/components/PasswordGate";
import Dashboard from "@/components/Dashboard";

export const revalidate = 300;

async function getMetrics() {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) return { subscribers: 0, mrr: 0, error: "No key" };

    const res = await fetch(
      "https://api.stripe.com/v1/subscriptions?status=active&limit=100",
      {
        headers: {
          Authorization: `Basic ${Buffer.from(stripeKey + ":").toString("base64")}`,
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) return { subscribers: 0, mrr: 0, error: "Stripe error" };

    const data = await res.json();
    const subscribers = data.data?.length ?? 0;
    return { subscribers, mrr: subscribers * 19 };
  } catch {
    return { subscribers: 0, mrr: 0, error: "Fetch failed" };
  }
}

async function getLatestMemo(): Promise<{ date: string; preview: string; url: string; logsUrl: string } | null> {
  try {
    const ghToken = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };
    if (ghToken) headers["Authorization"] = `token ${ghToken}`;

    const listRes = await fetch(
      "https://api.github.com/repos/ruizhi1201/sonny-logs/contents/memos",
      { headers, next: { revalidate: 300 } }
    );
    if (!listRes.ok) return null;

    const files = await listRes.json();
    if (!Array.isArray(files) || files.length === 0) return null;

    const sorted = files
      .filter((f: { name: string }) => f.name.endsWith(".md"))
      .sort((a: { name: string }, b: { name: string }) => b.name.localeCompare(a.name));

    if (sorted.length === 0) return null;

    const latest = sorted[0];
    const fileRes = await fetch(latest.url, { headers, next: { revalidate: 300 } });
    if (!fileRes.ok) return null;

    const fileData = await fileRes.json();
    const content = Buffer.from(fileData.content, "base64").toString("utf-8");
    const preview = content.slice(0, 500);
    const date = latest.name.replace(".md", "");

    return {
      date,
      preview,
      url: latest.html_url,
      logsUrl: "https://github.com/ruizhi1201/sonny-logs",
    };
  } catch {
    return null;
  }
}

export default async function Home() {
  const metrics = await getMetrics();
  const latestMemo = await getLatestMemo();
  const lastUpdated = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/New_York",
  }) + " ET";

  return (
    <PasswordGate>
      <Dashboard metrics={metrics} lastUpdated={lastUpdated} latestMemo={latestMemo} />
    </PasswordGate>
  );
}
