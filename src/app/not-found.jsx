"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { MoveLeft, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 bg-linear-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 transition-colors duration-200">
      <div className="text-center max-w-md mx-auto space-y-6">
        
        {/* 404 Badge & Icon */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/20 blur-xl rounded-full size-28 mx-auto" />
          <span className="text-8xl font-black tracking-tighter text-indigo-600 dark:text-indigo-400 select-none animate-pulse">
            404
          </span>
        </div>

        {/* Error Messages */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
            Page Not Found
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Oops! The page you are looking for doesn't exist or has been moved to another universe. Let's get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          {/* হোমপেজে ফেরার বাটন */}
          <Link href="/" className="w-full sm:w-auto">
            <Button 
              className="w-full bg-indigo-600 dark:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-xl shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
            >
              <MoveLeft className="size-4" />
              Back to Home
            </Button>
          </Link>

          {/* সাপোর্ট বা ড্যাশবোর্ডে যাওয়ার বাটন */}
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button 
              variant="bordered" 
              className="w-full font-medium px-6 py-2.5 rounded-xl border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-center gap-2"
            >
              <HelpCircle className="size-4" />
              Go to Dashboard
            </Button>
          </Link>
        </div>

        {/* Footer info */}
        <p className="text-xs text-zinc-400 dark:text-zinc-500 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          SkillSwap Ecosystem • All Rights Reserved.
        </p>
      </div>
    </div>
  );
}