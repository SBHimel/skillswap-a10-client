"use client";

import React, { useEffect, useState } from "react";
import StatCards from "@/components/dashboard/client/StatCards";
import { Spinner } from "@heroui/react";

export default function ClientHomePage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // এখানে তোমার ব্যাকএন্ড এপিআই কল হবে (যেমন: fetch('/api/client/stats'))
    // আপাতত অ্যাসাইনমেন্টের রিকোয়ারমেন্ট টেস্ট করার জন্য ডেমো ডাটা সেট করা হলো
    const fetchStats = async () => {
      try {
        setLoading(true);
        // ডেমো রেসপন্স টাইম সিমুলেট করার জন্য ১ সেকেন্ড লেট করা হয়েছে
        setTimeout(() => {
          setStats({
            totalTasks: 12,
            openTasks: 5,
            inProgressTasks: 4,
            totalSpent: 1450,
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Spinner size="lg" color="primary" label="Loading dashboard statistics..." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
          Client Dashboard
        </h1>
        <p className="text-zinc-500 mt-1">
          Welcome back! Here is a live breakdown of your posted projects and financial summary.
        </p>
      </div>

      {/* Main Statistics Cards Component */}
      <StatCards stats={stats} />

      {/* এর নিচে তুমি চাইলে সাম্প্রতিক কোনো অ্যাক্টিভিটি বা ছোট চার্ট দিতে পারো (Wow Factor এর জন্য) */}
      <div className="p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
        <h3 className="font-bold text-lg mb-2">Quick Actions</h3>
        <p className="text-sm text-zinc-400">
          Navigate to (Manage Tasks) from the sidebar to publish new jobs or review freelancer proposals.
        </p>
      </div>
    </div>
  );
}