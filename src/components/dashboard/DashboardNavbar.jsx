"use client";

import React, { useEffect, useState } from "react";

import { authClient } from "@/lib/auth-client";

import {
  Button
} from "@heroui/react";
import { Sun, Moon, Bell } from "lucide-react";

export default function DashboardNavbar() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.add("dark");
  }, []);

  // থিম চেঞ্জ করার ফাংশন
  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.remove("dark");
      root.classList.add("light");
      setTheme("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      setTheme("dark");
    }
  };


  // 🟢 Better-Auth থেকে সেশন এবং ইউজার ডাটা ফেচ করা
  const { data: session, isPending, error } = authClient.useSession();



  // যদি সেশন লোড হতে সময় নেয় (Loading State)
  if (isPending) {
    return (
      <header className="flex h-16 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-6 w-full flex-shrink-0 animate-pulse">
        <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
        <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
      </header>
    );
  }

  // যদি কোনো কারণে ইউজার লগইন না থাকে বা সেশন না পায়
  const user = session?.user;

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md px-6 w-full flex-shrink-0">

      {/* বাম পাশ: ডাইনামিক নাম */}
      <div>
        <h1 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 ">
          Welcome,
          <span className="text-zinc-900 dark:text-white font-bold ml-1">
            {user?.name || "User"} ✨
          </span>
        </h1>
      </div>


      <div className="flex items-center gap-4">

        {/* 🟢 Welcome Badge */}
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full shadow-sm">
          Welcome
        </span>

        {/* নোটিফিকেশন */}
        <Button isIconOnly variant="light" radius="xl" size="sm">
          <Bell className="size-5 text-zinc-600 dark:text-zinc-400" />
        </Button>

        {/* রুট লেআউট চেঞ্জ করা ছাড়া সরাসরি ফাংশনাল থিম সুইচ বাটন */}
        <Button
          isIconOnly
          variant="light"
          radius="xl"
          size="sm"
          onPress={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="size-5 text-amber-500 transition-all" />
          ) : (
            <Moon className="size-5 text-zinc-600 transition-all" />
          )}
        </Button>

        {/* ডিভাইডার */}
        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />

      </div>
    </header>
  );
}