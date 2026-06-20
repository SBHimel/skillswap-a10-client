import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) throw new Error('Invalid session');

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items']
  });

  if (session.status === 'open') return redirect('/');

  if (session.status === 'complete') {
    // এখানে তোমার ব্যাকেন্ডের নতুন পেমেন্ট কনফার্মেশন API বা অ্যাকশন কল করবে
    // যেমন: await confirmPayment({ sessionId: session_id, ...session.metadata })

    return (
      <div className="max-w-md mx-auto mt-10 p-6 border rounded-3xl text-center bg-white shadow">
        <h2 className="text-2xl font-bold text-green-6xl mb-4">Payment Successful! 🎉</h2>
        <div className="text-left space-y-2 my-4">
          <p><strong>Task:</strong> {session.metadata.taskTitle}</p>
          <p><strong>Freelancer:</strong> {session.metadata.freelancerName}</p>
          <p><strong>Amount Paid:</strong> ${(session.amount_total / 100).toFixed(2)}</p>
        </div>
        <Link href="/dashboard/client">
          <button className="w-full bg-primary text-white py-2 rounded-xl mt-4">
            Go to Dashboard
          </button>
        </Link>
      </div>
    );
  }
}