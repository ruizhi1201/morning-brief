import { NextResponse } from "next/server";

export const revalidate = 300;

export async function GET() {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ subscribers: 0, mrr: 0, error: "No API key" });
    }

    const response = await fetch(
      "https://api.stripe.com/v1/subscriptions?status=active&limit=100",
      {
        headers: {
          Authorization: `Basic ${Buffer.from(stripeKey + ":").toString("base64")}`,
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ subscribers: 0, mrr: 0, error: "Stripe error" });
    }

    const data = await response.json();
    const subscribers = data.data?.length ?? 0;
    const mrr = subscribers * 19;

    return NextResponse.json({ subscribers, mrr });
  } catch {
    return NextResponse.json({ subscribers: 0, mrr: 0, error: "Fetch failed" });
  }
}
