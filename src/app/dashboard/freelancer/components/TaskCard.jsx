"use client";

import React from 'react';
import { Calendar, User, DollarSign, Tag } from "lucide-react";

export default function TaskCard({ task, onApply }) {
  return (
    // 🟢 md:flex-row এবং justify-between সরিয়ে দেওয়া হয়েছে যাতে কার্ডের সব কন্টেন্ট উপর-নিচে সুন্দরভাবে বসে
    <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between min-h-[220px] hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group">
      
      {/* উপরের টেক্সট ও ডাটা সেকশন */}
      <div className="space-y-3">
        <div>
          <h3 className="font-bold text-xl text-zinc-900 dark:text-zinc-100 line-clamp-1">{task.title}</h3>
          
          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-zinc-500">
            <span className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded-md text-xs">
              <Tag className="size-3.5 text-indigo-500" /> {task.category}
            </span>
            <span className="flex items-center gap-1 font-semibold text-zinc-700 dark:text-zinc-300">
              <DollarSign className="size-4 text-emerald-500" /> Budget: ${task.budget}
            </span>
          </div>
        </div>

        {/* ডেডলাইন এবং ক্লায়েন্ট ইনফো */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5 text-amber-500" /> Deadline: {task.deadline || "N/A"}
          </span>
          <span className="flex items-center gap-1">
            <User className="size-3.5 text-blue-500" /> Client: {task.clientName || task.clientEmail || "Platform Client"}
          </span>
        </div>
      </div>
      
      {/* 🎯 বাটনটি এখন নিখুঁতভাবে কার্ডের একদম নিচে ফুল-উইডথ নিয়ে বসবে */}
      <div className="mt-8"> 
        <button 
          onClick={onApply}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-blue-600/10 dark:shadow-indigo-600/10 active:scale-[0.98] cursor-pointer"
        >
          Add Proposal
        </button>
      </div>

    </div>
  );
}