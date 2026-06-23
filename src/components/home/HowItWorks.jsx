"use client";

import React from "react";

export default function HowItWorks() {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60 rounded-3xl p-8 sm:p-12 transition-all duration-500">
      <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
        <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">How SkillSwap Works</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Your secure and rapid 3-step micro-task system.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 relative">
        <div className="text-center space-y-3 relative group">
          <div className="size-12 mx-auto rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-110 transition-transform">1</div>
          <h4 className="font-bold text-zinc-900 dark:text-white text-base">Post a Task</h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto">Define your custom technical specs, target timeline, and available milestone budget configuration.</p>
        </div>

        <div className="text-center space-y-3 relative group">
          <div className="size-12 mx-auto rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-110 transition-transform">2</div>
          <h4 className="font-bold text-zinc-900 dark:text-white text-base">Get Proposals</h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto">Receive real-time custom proposals from verified global technicians instantly.</p>
        </div>

        <div className="text-center space-y-3 relative group">
          <div className="size-12 mx-auto rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-110 transition-transform">3</div>
          <h4 className="font-bold text-zinc-900 dark:text-white text-base">Hire and Pay</h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto">Accept the best fit bid, trigger secure Stripe execution, and release funds only upon review approvals.</p>
        </div>
      </div>
    </section>
  );
}