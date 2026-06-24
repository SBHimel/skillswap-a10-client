"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { PlusCircle, Search, ArrowRight } from "lucide-react";

export default function Banner() {
  return (
    <div className="relative overflow-hidden rounded-3xl mt-6 bg-zinc-900 text-white border border-zinc-800 shadow-2xl">
      
      {/* Smooth Background Animation Blocks / Glow Effect */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-indigo-600/20 blur-[100px] animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-emerald-600/10 blur-[100px] animate-pulse duration-[4000ms]" />

      <div className="relative max-w-4xl mx-auto px-6 py-20 md:py-28 text-center flex flex-col items-center">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-800/40 text-xs font-medium text-zinc-300 mb-8 transition-all hover:border-zinc-600">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-zinc-200">SkillSwap Marketplace</span> — Connect & Collaborate
        </div>

        {/* Official Main Title from Docs */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.15] drop-shadow-sm">
          Get your tasks done by{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            skilled freelancers
          </span>
        </h1>

        {/* Short Sub-text explaining how the marketplace works */}
        <p className="mt-6 text-sm sm:text-xl text-zinc-400 max-w-2xl leading-relaxed">
          Post your custom micro-tasks in minutes, receive competitive proposals from top talents, and release payments securely via Stripe milestones only when the work is done.
        </p>

        {/* Two Action Buttons from Docs with Visual Transitions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full justify-center sm:w-auto">
          
          {/* Post a Task (For Clients) */}
          <Link href="/dashboard/client/post-task" className="w-full sm:w-auto">
            <Button 
              className="w-full sm:w-52 bg-white text-black font-bold h-12 text-sm shadow-xl rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusCircle className="h-4 w-4 text-indigo-600" /> Post a Task
            </Button>
          </Link>

          {/* Browse Tasks (For Freelancers) */}
          <Link href="/browse-tasks" className="w-full sm:w-auto">
            <Button 
              className="w-full sm:w-52 bg-zinc-800 border border-zinc-700 font-bold h-12 text-sm text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:bg-zinc-700 hover:border-zinc-500 hover:scale-[1.02] active:scale-[0.98]"
            >
              Browse Tasks <ArrowRight className="h-4 w-4 text-zinc-400" />
            </Button>
          </Link>

        </div>

        {/* Feature Triggers Indicator */}
        <div className="mt-12 pt-8 border-t border-zinc-800/60 w-full grid grid-cols-3 gap-2 text-center text-xs text-zinc-500">
          <div>Step 1: Post Task</div>
          <div>Step 2: Get Proposals</div>
          <div>Step 3: Secure Stripe Pay</div>
        </div>

      </div>
    </div>
  );
}