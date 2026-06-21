
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const userSession = await auth.api.getSession({
      headers: await headers(),
    });
    const user = userSession?.user;

    // 🟢 proposalId-সহ বডি ডাটা রিসিভ করছি
    const { taskId, proposalId, taskTitle, freelancerName, budget } = await request.json();

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: taskTitle,
              description: `Payment for Freelancer: ${freelancerName}`,
            },
            unit_amount: Math.round(Number(budget) * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        taskId: taskId,
        proposalId: proposalId, // 🟢 এটি যুক্ত হলো ডাটাবেজ ট্র্যাকিংয়ের জন্য
        taskTitle: taskTitle,
        freelancerName: freelancerName,
        clientEmail: user.email,
        amount: budget,
      },
      mode: "payment",
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/client`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}