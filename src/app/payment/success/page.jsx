import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import SuccessClient from '@/components/SuccessClient';
import { Button } from '@heroui/react';
 

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
      <div className="max-w-md mx-auto mt-16 p-8 border border-zinc-100 dark:border-zinc-800 text-center bg-white dark:bg-zinc-900 shadow-xl rounded-3xl transition-colors duration-200">
        
        {/* 🟢 ক্লায়েন্ট কম্পোনেন্টটি এখানে কল হলো এবং টোকেন ও ব্যাকএন্ডের কাজ সামলাবে */}
        <SuccessClient sessionData={sessionData} />

        {/* সাকসেস হেডার - ডার্ক মোডেও গ্রিন কালার ঠিক থাকবে */}
        <h2 className="text-2xl font-black text-green-600 dark:text-green-400 mb-6 flex items-center justify-center gap-2">
          Payment Successful! 🎉
        </h2>
        
        {/* ডাটা কন্টেইনার - লাইট মোডে হালকা অফ-হোয়াইট, ডার্ক মোডে ডার্ক-গ্রে ব্যাকগ্রাউন্ড */}
        <div className="text-left space-y-3 my-6 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-100/50 dark:border-zinc-800/50">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            <strong className="text-zinc-900 dark:text-zinc-600 font-bold mr-1">Task:</strong> 
            {session.metadata.taskTitle}
          </p>
          
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            <strong className="text-zinc-900 dark:text-zinc-600 font-bold mr-1">Freelancer:</strong> 
            {session.metadata.freelancerName}
          </p>
          
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            <strong className="text-zinc-900 dark:text-zinc-600 font-bold mr-1">Amount Paid:</strong> 
            <span className="text-green-600 dark:text-green-400 font-semibold">${(session.amount_total / 100).toFixed(2)}</span>
          </p>
        </div>

        {/* ড্যাশবোর্ড বাটন */}
        <Link href="/dashboard/client" className="block w-full">
          <Button className="w-full bg-indigo-600 dark:bg-indigo-500 text-white font-medium py-2.5 rounded-xl shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    );
  }
}