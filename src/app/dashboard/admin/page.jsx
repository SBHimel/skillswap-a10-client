"use client";

import React, { useEffect, useState } from "react";
import { Users, ClipboardList, DollarSign, Activity } from "lucide-react";
import { Spinner } from "@heroui/react";
import { adminAPI } from "@/lib/api";
// তোমার তৈরি করা API হ্যান্ডলার ইম্পোর্ট করো (যেমন: adminAPI)

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    totalRevenue: 0,
    activeTasks: 0,
  });
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getStats();
      // ব্যাকএন্ড থেকে আসা অবজেক্ট স্টেটে সেট হবে
      setStats({
        totalUsers: data?.totalUsers || 0,
        totalTasks: data?.totalTasks || 0,
        totalRevenue: data?.totalRevenue || 0,
        activeTasks: data?.activeTasks || 0,
      });
    } catch (error) {
      console.error("Stats load করতে সমস্যা:", error);
    } finally {
      setLoading(false);
    }
  };
  loadStats();
}, []);

  const statCards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-500" },
    { label: "Total Tasks", value: stats.totalTasks, icon: ClipboardList, color: "text-indigo-500" },
    { label: "Total Revenue (USD)", value: `$${stats.totalRevenue}`, icon: DollarSign, color: "text-emerald-500" },
    { label: "Active Tasks", value: stats.activeTasks, icon: Activity, color: "text-amber-500" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner label="Loading admin insights..." color="primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-full px-2 sm:px-4">
      {/* Welcome Header */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Admin Control Center</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Monitor users, manage tasks safety guidelines, and track secure Stripe checkout histories.
        </p>
      </div>

      {/* Grid Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">{card.label}</span>
              <span className="text-2xl font-bold text-zinc-900 dark:text-white">{card.value}</span>
            </div>
            <div className={`p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 ${card.color}`}>
              <card.icon className="size-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}