"use client";

import React from 'react';
import { Calendar, User, DollarSign, Tag } from "lucide-react";

export default function TaskCard({ task, onApply }) {
  return (
    <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
      <div className="space-y-2">
        <div>
          <h3 className="font-bold text-xl text-zinc-900 dark:text-zinc-100">{task.title}</h3>
          <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-zinc-500">
            <span className="flex items-center gap-1">
              <Tag className="size-4 text-indigo-500" /> {task.category}
            </span>
            <span className="flex items-center gap-1 font-semibold text-zinc-700 dark:text-zinc-300">
              <DollarSign className="size-4 text-emerald-500" /> Budget: ${task.budget}
            </span>
          </div>
        </div>

        {/* 🟢 রিকোয়ারমেন্টের ডেডলাইন এবং ক্লায়েন্ট নেম এখানে যুক্ত হলো */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800/60">
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5 text-amber-500" /> Deadline: {task.deadline || "N/A"}
          </span>
          <span className="flex items-center gap-1">
            <User className="size-3.5 text-blue-500" /> Client: {task.clientName || task.clientEmail || "Platform Client"}
          </span>
        </div>
      </div>
      
      <div>
        <button 
          onClick={() => onApply(task)}
          className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-indigo-500/10 text-sm"
        >
          Add Proposal
        </button>
      </div>
    </div>
  );
}