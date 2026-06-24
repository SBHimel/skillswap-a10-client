"use client";

import React from "react";
import { Card } from "@heroui/react";
import { Eye, Lock, Database, Cookie, BellRing, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 min-h-screen">
      
      {/* ব্যাক বাটন ও হেডার */}
      <div className="space-y-3">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>
        
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="size-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/40 mb-2">
            <Lock className="size-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Privacy Policy</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Last updated: June {currentYear}. Your privacy and data protection are our highest priorities.
          </p>
        </div>
      </div>

      {/* মেইন কন্টেন্ট কন্টেইনার */}
      <Card className="border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6 sm:p-8">
        <Card className="p-0 space-y-8 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
          
          {/* ১. কী কী ডাটা কালেক্ট করা হয় */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 tracking-tight">
              <Eye className="size-4 text-indigo-500 shrink-0" />
              1. Information We Collect
            </h2>
            <p>
              To provide a dynamic freelancing marketplace environment, SkillSwap collects necessary account details during registration and profile building:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Personal Profile Data:</strong> Full name, email address, profile bio, and specific technical skills.</li>
              <li><strong>Marketplace Activities:</strong> Task titles, descriptions, budgets, and bid prices submitted within standard client-freelancer contracts.</li>
            </ul>
          </div>

          <hr className="border-zinc-100 dark:border-zinc-800" />

          {/* ২. ডাটা কীভাবে ব্যবহার করা হয় */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 tracking-tight">
              <Database className="size-4 text-indigo-500 shrink-0" />
              2. How We Use Your Data
            </h2>
            <p>
              We process collected information to optimize ecosystem services and strictly prevent unauthorized access or spam:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To render active task lists and display verified freelancer public portfolios.</li>
              <li>To manage dynamic proposal pipelines securely between clients and developers.</li>
              <li>To monitor administrative system metrics and identify potential violations of our safety guidelines.</li>
            </ul>
          </div>

          <hr className="border-zinc-100 dark:border-zinc-800" />

          {/* ৩. কুকিজ এবং লোকাল স্টোরেজ (যা নিয়ে একটু আগে আমাদের ৪৩১ এরর হয়েছিল!) */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 tracking-tight">
              <Cookie className="size-4 text-indigo-500 shrink-0" />
              3. Cookies and Local Authorization Tokens
            </h2>
            <p>
              SkillSwap utilizes standard modern storage patterns (such as localStorage, session state, or cookies) exclusively to sustain your secure authenticated login session. These tokens transmit securely via headers (`Authorization: Bearer [token]`) to ensure nobody else can manipulate your active dashboard metrics.
            </p>
          </div>

          <hr className="border-zinc-100 dark:border-zinc-800" />

          {/* ৪. ডাটা সিকিউরিটি */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 tracking-tight">
              <Lock className="size-4 text-indigo-500 shrink-0" />
              4. Data Protection & Shielding
            </h2>
            <p>
              Your system security is guarded with industry-grade practices. We encrypt communication pathways and never engage in selling or trading user emails, proposal histories, or active operational task logs to malicious third-party companies.
            </p>
          </div>

          <hr className="border-zinc-100 dark:border-zinc-800" />

          {/* ৫. পলিসি পরিবর্তন */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 tracking-tight">
              <BellRing className="size-4 text-indigo-500 shrink-0" />
              5. Policy Updates
            </h2>
            <p>
              SkillSwap reserves the authority to introduce adjustments to this privacy framework as new microservices or advanced payment systems integrate. We recommend monitoring this dynamic section periodically to stay updated on our legal safeguards.
            </p>
          </div>

        </Card>
      </Card>

      {/* ফুটার কপিরাইট নোট */}
      <p className="text-center text-xs text-zinc-400 font-medium">
        &copy; {currentYear} SkillSwap Marketplace Inc. All rights reserved.
      </p>

    </div>
  );
}