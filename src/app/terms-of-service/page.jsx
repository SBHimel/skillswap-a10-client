"use client";

import React from "react";
import { Card, Button } from "@heroui/react";
import { ShieldCheck, Scale, FileText, UserCheck, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
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
            <ShieldCheck className="size-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Terms of Service</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Last updated: June {currentYear}. Please read these terms carefully before using SkillSwap.
          </p>
        </div>
      </div>

      {/* মেইন কন্টেন্ট কার্ড */}
      <Card className="border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6 sm:p-8">
        <Card className="p-0 space-y-8 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
          
          {/* ১. সাধারণ নিয়মাবলী */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 tracking-tight">
              <Scale className="size-4 text-indigo-500 shrink-0" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using the SkillSwap platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from using or accessing this marketplace website.
            </p>
          </div>

          <hr className="border-zinc-100 dark:border-zinc-800" />

          {/* ২. অ্যাকাউন্ট এবং সিকিউরিটি */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 tracking-tight">
              <UserCheck className="size-4 text-indigo-500 shrink-0" />
              2. User Accounts & Roles
            </h2>
            <p>
              To fully utilize our marketplace, you must register an account and choose a specific role (<strong>Client</strong> or <strong>Freelancer</strong>). 
            </p>
            <ul className="list-disc pl-5 space-y-1.5 market-list">
              <li>You are responsible for safeguarding your account credentials and tokens.</li>
              <li>Clients are authorized to post legal, safe, and descriptive technical tasks.</li>
              <li>Freelancers are permitted to place dynamic bids, send proposals, and deliver work honestly.</li>
            </ul>
          </div>

          <hr className="border-zinc-100 dark:border-zinc-800" />

          {/* ৩. পেমেন্ট ও ট্রানজেকশন */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 tracking-tight">
              <FileText className="size-4 text-indigo-500 shrink-0" />
              3. Dynamic Bidding & Secure Payments
            </h2>
            <p>
              All contract financial amounts agreed upon during proposal submission are binding. SkillSwap integrates secure, audited automated gateways (such as Stripe) to process transactions safely. Admin holds the authority to review active project ledger flows to ensure platform security.
            </p>
          </div>

          <hr className="border-zinc-100 dark:border-zinc-800" />

          {/* ৪. রেস্ট্রিকশন ও পলিসি */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 tracking-tight">
              <AlertTriangle className="size-4 text-indigo-500 shrink-0" />
              4. Prohibited Behaviors & Account Termination
            </h2>
            <p>
              We maintain strict marketplace integrity. The SkillSwap administration reserves the complete right to block/unblock users or delete active tasks instantly without notice if we detect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Fraudulent, spam, or malicious code distributions.</li>
              <li>Posting irrelevant categories or misleading project descriptions.</li>
              <li>Circumventing platform safety channels or harassment of other users.</li>
            </ul>
          </div>

          <hr className="border-zinc-100 dark:border-zinc-800" />

          {/* ৫. সমাপনী বক্তব্য */}
          <div className="space-y-2 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 p-4 rounded-xl">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Thank you for keeping SkillSwap a trusted ecosystem for global freelancers. If you have any compliance questions regarding these terms, contact us through our verification panel.
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