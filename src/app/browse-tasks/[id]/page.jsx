"use client";

import React, { useEffect, useState } from "react";
import { Spinner, Button,  Card } from "@heroui/react";
import { DollarSign, Tag, Send, FileText, ArrowLeft, Mail, Lock } from "lucide-react";
import { freelancerAPI } from "@/lib/api";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function TaskDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params?.id;
  
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [proposalBudget, setProposalBudget] = useState("");
  const [proposalBid, setProposalBid] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 🔒 অথেনটিকেশন স্টেট (তোমার প্রজেক্টের Context, LocalStorage বা Redux অনুযায়ী এটা চেঞ্জ হবে)
  // উদাহরণ হিসেবে এখানে ধরে নিচ্ছি ইউজার লগইন আছে কি না তা চেক করার জন্য:
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userRole, setUserRole] = useState("guest"); // e.g., "freelancer", "client", "guest"

  useEffect(() => {
    // এখানে তোমার অথেনটিকেশন চেক বসাতে পারো, যেমন:
    const token = localStorage.getItem("token"); // বা তোমার প্রজেক্টের নিয়ম অনুযায়ী
    const role = localStorage.getItem("role"); // যদি রোল সেভ করা থাকে
    
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role || "freelancer"); // টেস্টের জন্য ডিফল্ট ফ্রিল্যান্সার দিলাম
    }

    const fetchSingleTask = async () => {
      try {
        setLoading(true);
        const allTasks = await freelancerAPI.getAvailableTasks();
        const foundTask = allTasks?.find((t) => t._id === taskId);
        
        if (foundTask) {
          setTask(foundTask);
          setProposalBudget(foundTask.budget);
        } else {
          alert("Task not found or no longer active!");
          router.push("/browse-tasks");
        }
      } catch (error) {
        console.error("Task details লোড করতে সমস্যা:", error);
      } finally {
        setLoading(false);
      }
    };
    if (taskId) fetchSingleTask();
  }, [taskId, router]);

  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    
    // সাবমিট করার আগেও আরেকবার সিকিউরিটি চেক
    if (!isLoggedIn || userRole !== "freelancer") {
      alert("Only logged in freelancers can submit proposals!");
      return;
    }

    if (!proposalBudget || !proposalBid) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      setSubmitting(true);
      const proposalData = {
        taskId: task._id,
        taskTitle: task.title,
        clientEmail: task.clientEmail,
        budget: Number(proposalBudget),
        bid: proposalBid,
      };

      const res = await freelancerAPI.submitProposal(proposalData);
      
      if (res?.error) {
        alert(res.error);
      } else {
        alert("Proposal submitted successfully!");
        setProposalBid("");
        router.push("/browse-tasks");
      }
    } catch (error) {
      console.error("Proposal পাঠাতে সমস্যা:", error);
      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-3">
        <Spinner size="lg" color="indigo" />
        <p className="text-sm text-zinc-400 font-medium">Loading task details...</p>
      </div>
    );
  }

  if (!task) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* ব্যাক বাটন */}
      <Link 
        href="/browse-tasks" 
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium group"
      >
        <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Active Tasks
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* বাম পাশ: সবার জন্য উন্মুক্ত টাস্ক ডেসক্রিপশন */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6">
            <Card className="p-0 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40 flex items-center gap-1 w-fit">
                  <Tag className="size-3" />
                  {task.category || "General"}
                </span>
              </div>

              <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight leading-snug">
                {task.title}
              </h1>

              <hr className="border-zinc-100 dark:border-zinc-800" />

              <div className="space-y-2">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Project Description</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap leading-relaxed">
                  {task.description}
                </p>
              </div>

              <hr className="border-zinc-100 dark:border-zinc-800" />
              
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 w-fit">
                <Mail className="size-3.5 text-zinc-400" />
                <span>Client Contact: {task.clientEmail}</span>
              </div>
            </Card>
          </Card>
        </div>

        {/* ডান পাশ: বাজেট এবং কন্ডিশনাল প্রপোজাল ফর্ম */}
        <div className="space-y-6">
          <Card className="border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6 sticky top-6">
            <Card className="p-0 space-y-5">
              
              <div className="text-center bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-900/30 rounded-xl p-4">
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Client Budget</p>
                <div className="flex items-center justify-center text-zinc-900 dark:text-white mt-1">
                  <DollarSign className="size-6 text-emerald-500 font-bold" />
                  <span className="text-3xl font-black tracking-tight">{task.budget}</span>
                </div>
              </div>

              {/* 🔒 কন্ডিশনাল রেন্ডারিং: লগইন করা ফ্রিল্যান্সার হলে ফর্ম দেখাবে, নাহলে ওয়ার্নিং */}
              {isLoggedIn && userRole === "freelancer" ? (
                <form onSubmit={handleProposalSubmit} className="space-y-4">
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="size-4 text-zinc-400" /> Submit Proposal
                  </h3>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide">Your Bid Price ($)</label>
                    <div className="relative flex items-center">
                      <DollarSign className="size-4 text-zinc-400 absolute left-3" />
                      <input
                        type="number"
                        required
                        placeholder="Amount"
                        value={proposalBudget}
                        onChange={(e) => setProposalBudget(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide">Cover Letter</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe your plan, expertise, and timeline..."
                      value={proposalBid}
                      onChange={(e) => setProposalBid(e.target.value)}
                      className="w-full p-3 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-indigo-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm shadow-md shadow-indigo-600/10 hover:bg-indigo-700 h-11 transition-all"
                  >
                    {submitting ? <Spinner size="sm" color="white" /> : <><span>Send Proposal</span><Send className="size-3.5" /></>}
                  </Button>
                </form>
              ) : (
                /* 🚫 লগইন না থাকলে এই কার্ডটি দেখাবে */
                <div className="text-center p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl space-y-3">
                  <Lock className="size-5 text-amber-600 dark:text-amber-500 mx-auto" />
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-medium leading-relaxed">
                    You must be logged in as a <strong>Freelancer</strong> to submit a proposal for this task.
                  </p>
                  <Link href="/signin" className="block">
                    <Button size="sm" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs">
                      Log In Now
                    </Button>
                  </Link>
                </div>
              )}

            </Card>
          </Card>
        </div>

      </div>
    </div>
  );
}