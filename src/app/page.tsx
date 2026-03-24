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

export default async function Home() {
  const metrics = await getMetrics();
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
      <Dashboard metrics={metrics} lastUpdated={lastUpdated} />
    </PasswordGate>
  );
}
