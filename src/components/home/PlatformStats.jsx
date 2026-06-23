"use client";

import React from "react";
import { Card } from "@heroui/react";
import { Layers, Users, BarChart3 } from "lucide-react";

export default function PlatformStats({ stats }) {
  return (
    <section className="grid gap-6 sm:grid-cols-3">
      <Card className="p-6 border border-zinc-100 dark:border-zinc-800 bg-linear-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 rounded-2xl text-center space-y-2 shadow-sm">
        <div className="p-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl size-11 mx-auto flex items-center justify-center"><Layers className="size-5" /></div>
        <p className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">{stats.totalTasks || 0}</p>
        <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Total Tasks Posted</p>
      </Card>

      <Card className="p-6 border border-zinc-100 dark:border-zinc-800 bg-linear-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 rounded-2xl text-center space-y-2 shadow-sm">
        <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl size-11 mx-auto flex items-center justify-center"><Users className="size-5" /></div>
        <p className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">{stats.totalUsers || 0}</p>
        <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Registered Users</p>
      </Card>

      <Card className="p-6 border border-zinc-100 dark:border-zinc-800 bg-linear-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 rounded-2xl text-center space-y-2 shadow-sm">
        <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl size-11 mx-auto flex items-center justify-center"><BarChart3 className="size-5" /></div>
        <p className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">${stats.totalPayout || 0}</p>
        <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Total Payout Completed</p>
      </Card>
    </section>
  );
}