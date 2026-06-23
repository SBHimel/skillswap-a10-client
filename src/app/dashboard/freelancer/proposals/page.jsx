"use client";

import React, { useEffect, useState } from "react";
import { freelancerAPI } from "@/lib/api";
import { Spinner } from "@heroui/react";
import { ClipboardList, Calendar, DollarSign } from "lucide-react";

export default function MyProposalsPage() {
  const [myProposals, setMyProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMyProposals = async () => {
    try {
      setLoading(true);
      const data = await freelancerAPI.getMyProposals();
      setMyProposals(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Proposals load করতে সমস্যা:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyProposals();
  }, []);

  return (
    <div className="space-y-6 max-w-full px-2 sm:px-4">
      {/* Top Header */}
      <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2">
          <ClipboardList className="size-5 sm:size-6 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
            My Proposals
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          Track the status of all your submitted job applications.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Spinner label="Loading your proposals..." color="primary" />
        </div>
      ) : myProposals.length === 0 ? (
        <p className="text-zinc-400 text-sm text-center py-12">
          You haven't submitted any proposals yet.
        </p>
      ) : (
        <>
          {/* 📱 ১. মোবাইল ও ট্যাবলেট ভিউ (lg ব্রেকপয়েন্টের নিচে এটা গ্রিড কার্ড আকারে দেখাবে, কাটবে না) */}
          <div className="block lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 space-y-0">
            {myProposals.map((proposal) => (
              <div 
                key={proposal._id} 
                className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3"
              >
                {/* Title & Status */}
                <div className="flex justify-between items-start gap-3">
                  <h2 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm line-clamp-2">
                    {proposal.taskTitle}
                  </h2>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize tracking-wide border shrink-0 ${
                    proposal.status?.toLowerCase() === "accepted" ? "bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" :
                    proposal.status?.toLowerCase() === "rejected" ? "bg-red-50 text-red-700 border-red-200/50 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20" :
                    "bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                  }`}>
                    {proposal.status || "Pending"}
                  </span>
                </div>

                {/* Divider & Info */}
                <div className="space-y-3 pt-1">
                  <div className="h-px bg-zinc-100 dark:bg-zinc-800/60 w-full" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                      <DollarSign className="size-3.5 text-zinc-400" />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-400 uppercase font-medium">Bid</span>
                        <span className="text-xs font-semibold">${proposal.budget}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                      <Calendar className="size-3.5 text-zinc-400" />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-400 uppercase font-medium">Sent</span>
                        <span className="text-xs font-medium">
                          {proposal.createdAt ? new Date(proposal.createdAt).toLocaleDateString() : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 🖥️ ২. ডেক্সটপ ভিউ (শুধুমাত্র ১০২৪ পিক্সেলের বড় স্ক্রিনে টেবিল দেখাবে) */}
          <div className="hidden lg:block bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm table-fixed">
              <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-800">
                <tr>
                  <th className="px-6 py-4 font-bold w-[45%]">Task Title</th>
                  <th className="px-6 py-4 font-bold w-[20%]">Budget Bid</th>
                  <th className="px-6 py-4 font-bold w-[20%]">Date Sent</th>
                  <th className="px-6 py-4 font-bold w-[15%]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {myProposals.map((proposal) => (
                  <tr 
                    key={proposal._id} 
                    className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100 break-words whitespace-normal">
                      {proposal.taskTitle}
                    </td>
                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 font-medium">
                      ${proposal.budget}
                    </td>
                    <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 text-xs">
                      {proposal.createdAt ? new Date(proposal.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize border ${
                        proposal.status?.toLowerCase() === "accepted" ? "bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" :
                        proposal.status?.toLowerCase() === "rejected" ? "bg-red-50 text-red-700 border-red-200/50 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20" :
                        "bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                      }`}>
                        {proposal.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}