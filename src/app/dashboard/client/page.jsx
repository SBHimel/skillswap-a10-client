"use client";

import React, { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import { Briefcase, FileText } from "lucide-react";
import StatCards from "@/components/dashboard/client/StatCards";
import { clientAPI } from "@/lib/api";

// 🟢 আমরা এইমাত্র যে কার্ডটি বানিয়ে রেখেছি সেটা ইম্পোর্ট করলাম
import ClientProposalCard from "./components/ClientProposalCard";

export default function ClientHomePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🟢 ১. লাইভ ব্যাকএন্ড থেকে স্ট্যাটস লোড করার ফাংশন
  const loadClientStats = async () => {
    try {
      // তোমার api.js এ গ্লোবাল headers অলরেডি আছে, আমরা ডিরেক্ট ফেচ মারছি বা চাইলে এক্সপোর্ট করতে পারো
      // এখানে সরাসরি তোমার সার্ভার এপিআই কল করা হলো
      const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
      const { authClient } = require("@/lib/auth-client");
      const { data: tokenData } = await authClient.token();
      
      const res = await fetch(`${baseURL}/client-stats`, {
        headers: {
          "authorization": `Bearer ${tokenData?.token}`
        }
      }).then(r => r.json());

      setStats(res);
    } catch (error) {
      console.error("Stats load করতে সমস্যা:", error);
    }
  };

  // 🟢 ২. ফ্রিল্যান্সারদের পাঠানো সব প্রপোজাল লোড করার ফাংশন
  const loadProposals = async () => {
    try {
      const data = await clientAPI.getClientProposals();
      setProposals(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Proposals load করতে সমস্যা:", error);
    }
  };

  // পেজ লোড হলে সব ডাটা একসাথে ব্যাকগ্রাউন্ডে আসবে
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      await Promise.all([loadClientStats(), loadProposals()]);
      setLoading(false);
    };
    initData();
  }, []);

  // 🟢 ৩. প্রপোজাল রিজেক্ট করার ফাংশন
  const handleRejectProposal = async (id) => {
    if (!confirm("Are you sure you want to reject this proposal?")) return;
    try {
      const res = await clientAPI.rejectProposal(id);
      alert("Proposal Rejected successfully!");
      loadProposals(); // লিস্ট রিফ্রেশ
    } catch (error) {
      console.error("Reject করতে ঝামেলা:", error);
    }
  };

  // 🟢 ৪. প্রপোজাল অ্যাকসেপ্ট করার ফাংশন (স্ট্রাইপ পেমেন্ট নেক্সট ধাপে আসবে)
// 🟢 প্রপোজাল অ্যাকসেপ্ট করে স্ট্রাইপ চেকআউটে রিডাইরেক্ট করার ফাংশন
  const handleAcceptProposal = async (proposal) => {
    try {
      // নেক্সট-জেএস ইন্টারনাল এপিআই রাউটে হিট করছি
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: proposal.taskId,
          proposalId: proposal._id, // প্রপোজালের মঙ্গোডিবি আইডি
          taskTitle: proposal.taskTitle,
          freelancerName: proposal.freelancerName || "Expert Freelancer",
          budget: proposal.budget,
        }),
      });

      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url; // 🚀 স্ট্রাইপের অফিশিয়াল সিকিউর পেমেন্ট পেজে রিডাইরেক্ট
      } else {
        alert(data.error || "Stripe session creation failed!");
      }
    } catch (error) {
      console.error("Payment শুরু করতে সমস্যা:", error);
      alert("Something went wrong with the payment gateway.");
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Spinner size="lg" color="primary" label="Loading dashboard data..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Client Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Welcome back! Monitor your project metrics and manage custom proposals.
          </p>
        </div>
      </div>

      {/* Tabs List */}
      <div className="w-full border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 relative transition-all ${activeTab === "overview" ? "text-indigo-600 dark:text-indigo-400 font-bold" : "text-zinc-500"}`}
          >
            <span className="flex items-center gap-2"><Briefcase className="size-4" /> Overview & Stats</span>
            {activeTab === "overview" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 rounded-full" />}
          </button>
          
          <button
            onClick={() => setActiveTab("manage-proposals")}
            className={`pb-3 relative transition-all ${activeTab === "manage-proposals" ? "text-indigo-600 dark:text-indigo-400 font-bold" : "text-zinc-500"}`}
          >
            <span className="flex items-center gap-2"><FileText className="size-4" /> Manage Proposals ({proposals.filter(p => p.status === "Pending").length})</span>
            {activeTab === "manage-proposals" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 rounded-full" />}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-4">
        {/* TAB 1: Overview & Statistics */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <StatCards stats={stats} />
            <div className="p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
              <h3 className="font-bold text-lg mb-2">Quick Actions</h3>
              <p className="text-sm text-zinc-400">
                Switch to the "Manage Proposals" tab above to review incoming offers from freelancers in real-time.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: Manage Proposals */}
        {activeTab === "manage-proposals" && (
          <div className="space-y-4">
            {proposals.length === 0 ? (
              <p className="text-zinc-400 text-sm text-center py-10">No proposals received yet for your tasks.</p>
            ) : (
              proposals.map((proposal) => (
                <ClientProposalCard 
                  key={proposal._id} 
                  proposal={proposal} 
                  onReject={handleRejectProposal}
                  onAccept={handleAcceptProposal}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}