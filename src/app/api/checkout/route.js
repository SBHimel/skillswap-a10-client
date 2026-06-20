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

    // ক্লায়েন্ট সাইড থেকে বডি-তে dynamic data পাঠানো হবে
    const { taskId, taskTitle, freelancerName, budget } = await request.json();

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
            unit_amount: Number(budget) * 100, // সেন্ট-এ কনভার্ট করার জন্য (যেমন: $50 = 5000)
          },
          quantity: 1,
        },
      ],
      metadata: {
        taskId: taskId,
        taskTitle: taskTitle,
        freelancerName: freelancerName,
        clientEmail: user.email,
        amount: budget,
      },
      mode: "payment", // 'subscription' বদলে 'payment' হবে
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/client`,
    });

    return NextResponse.json({ url: session.url }); // ক্লায়েন্টে URL রিটার্ন করা
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}