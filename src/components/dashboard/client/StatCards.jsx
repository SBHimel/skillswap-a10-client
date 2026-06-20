"use client";

import { Card } from "@heroui/react";
import { Briefcase, FolderOpen, Loader2, DollarSign } from "lucide-react";
import React from "react";

export default function StatCards({ stats }) {
  const cardData = [
    {
      title: "Total Tasks",
      value: stats?.totalTasks || 0,
      icon: Briefcase,
      color: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600",
    },
    {
      title: "Open Tasks",
      value: stats?.openTasks || 0,
      icon: FolderOpen,
      color: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600",
    },
    {
      title: "Tasks In Progress",
      value: stats?.inProgressTasks || 0,
      icon: Loader2,
      color: "bg-amber-50 dark:bg-amber-950/40 text-amber-600",
    },
    {
      title: "Total Spent (USD)",
      value: `$${stats?.totalSpent || 0}`,
      icon: DollarSign,
      color: "bg-rose-50 dark:bg-rose-950/40 text-rose-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map((card, index) => (
        <Card key={index} shadow="sm" className="border border-zinc-100 dark:border-zinc-800 p-5">
          {/* CardBody এর বদলে সরাসরি এখানে ফ্লেক্স লেআউট ব্যবহার করলাম */}
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${card.color}`}>
              <card.icon className="size-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-400">{card.title}</span>
              <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
                {card.value}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}