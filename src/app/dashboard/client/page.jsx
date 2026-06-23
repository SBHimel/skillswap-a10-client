"use client";

import React, { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import StatCards from "@/components/dashboard/client/StatCards";

export default function ClientHomePage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadClientStats = async () => {
    try {
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

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      await loadClientStats();
      setLoading(false);
    };
    initData();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Spinner size="lg" color="primary" label="Loading dashboard data..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Client Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Welcome back! Monitor your project metrics and manage custom proposals.
        </p>
      </div>

      {/* রিকোয়ারমেন্টের ৪টি স্ট্যাটস কার্ড এখানে শো হবে */}
      <StatCards stats={stats} />
    </div>
  );
}