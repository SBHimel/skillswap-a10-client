import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import SuccessClient from '@/components/SuccessClient';
 

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) throw new Error('Invalid session');

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items']
  });

  if (session.status === 'open') return redirect('/');

  if (session.status === 'complete') {
    
    // 🟢 ব্যাকএন্ডে পাঠানোর জন্য ডাটা অবজেক্ট তৈরি
    const sessionData = {
      sessionId: session_id,
      taskId: session.metadata.taskId,          
      proposalId: session.metadata.proposalId,  
      taskTitle: session.metadata.taskTitle,
      freelancerName: session.metadata.freelancerName,
      budget: session.amount_total / 100        
    };

    return (
      <div className="max-w-md mx-auto mt-10 p-6 border rounded-3xl text-center bg-white shadow">
        
        {/* 🟢 ক্লায়েন্ট কম্পোনেন্টটি এখানে কল হলো এবং টোকেন ও ব্যাকএন্ডের কাজ সামলাবে */}
        <SuccessClient sessionData={sessionData} />

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