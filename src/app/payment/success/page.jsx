import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import SuccessClient from '@/components/SuccessClient';
import { Button } from '@heroui/react';
import { CheckCircle2, ArrowRight, DollarSign, Briefcase, User } from "lucide-react";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) throw new Error('Invalid session');

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items']
  });

  if (session.status === 'open') return redirect('/');

  if (session.status === 'complete') {
    
    // 🟢 ব্যাকএন্ডে পাঠানোর জন্য ডাটা অবজেক্ট তৈরি (তোমার আগের লজিক সেম রাখা হয়েছে)
    const sessionData = {
      sessionId: session_id,
      taskId: session.metadata.taskId,          
      proposalId: session.metadata.proposalId,  
      taskTitle: session.metadata.taskTitle,
      freelancerName: session.metadata.freelancerName,
      freelancerEmail: session.metadata.freelancerEmail || "",
      budget: session.amount_total / 100        
    };

    const formattedAmount = (session.amount_total / 100).toFixed(2);

    return (
      <div className="min-h-[85vh] w-full flex items-center justify-center p-4">
        {/* 🟢 ক্লায়েন্ট কম্পোনেন্টটি এখানে কল হলো এবং টোকেন ও ব্যাকএন্ডের কাজ সামলাবে */}
        <SuccessClient sessionData={sessionData} />

        <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl text-center space-y-6 transition-colors duration-200">
          
          {/* Animated Check Icon */}
          <div className="flex justify-center">
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl border border-emerald-500/20">
              <CheckCircle2 className="size-12" />
            </div>
          </div>

          {/* Success Title */}
          <div className="space-y-1.5">
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              Payment Successful!
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 px-2">
              Your funds are now securely held under escrow contract milestone protocols.
            </p>
          </div>

          {/* Order Details Receipt Meta */}
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800/60 text-left space-y-4">
            
            {/* Task Title Row */}
            <div className="flex items-start gap-2.5">
              <Briefcase className="size-4 text-zinc-400 mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Project Title</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2">
                  {session.metadata.taskTitle}
                </span>
              </div>
            </div>

            <div className="h-px bg-zinc-200/60 dark:bg-zinc-800/50 w-full" />

            {/* Assigned Worker & Amount Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5">
                <User className="size-4 text-zinc-400 mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Assigned Worker</span>
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 truncate max-w-[120px]">
                    {session.metadata.freelancerName}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 justify-end text-right">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Amount Paid</span>
                  <span className="text-sm font-black text-indigo-500 dark:text-indigo-400">
                    ${formattedAmount}
                  </span>
                </div>
                <DollarSign className="size-4 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" />
              </div>
            </div>

          </div>

          {/* Required Button Link */}
          <Link href="/dashboard/client" className="block w-full">
            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-semibold rounded-2xl shadow-lg h-11 flex items-center justify-center gap-2 transition-all duration-200"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>

        </div>
      </div>
    );
  }
}