"use client";
import React from 'react';
import { Card, Chip, Button } from "@heroui/react"; 
import { Clock, DollarSign, User, XCircle, CheckCircle } from "lucide-react";

export default function ClientProposalCard({ proposal, onAccept, onReject }) {
  return (
    <Card className="p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div className="space-y-1.5 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100">
            {proposal.taskTitle}
          </h3>
          <Chip 
            size="sm" 
            variant="flat" 
            color={
              proposal.status === "Accepted" ? "success" : 
              proposal.status === "Rejected" ? "danger" : "warning"
            } 
            className="capitalize"
          >
            {proposal.status}
          </Chip>
        </div>

        {/* ফ্রিল্যান্সার ইনফো */}
        <div className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
          <User className="size-4 text-indigo-500" />
          <span>Freelancer: {proposal.freelancerName} ({proposal.freelancerEmail})</span>
        </div>

        {/* কভার লেটার / মেসেজ */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/80">
          <span className="font-bold text-zinc-700 dark:text-zinc-300 block mb-0.5">Cover Letter:</span> 
          {proposal.message}
        </p>

        {/* বাজেট ও ডেডলাইন */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
          <span className="flex items-center gap-1 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-lg font-medium">
            <DollarSign className="size-3.5" /> Bid Amount: ${proposal.budget}
          </span>
          <span className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-lg font-medium">
            <Clock className="size-3.5" /> Duration: {proposal.duration} Days
          </span>
        </div>
      </div>

      {/* অ্যাকশন বাটনসমূহ (শুধুমাত্র Pending প্রপোজালের জন্য দেখাবে) */}
      {proposal.status === "Pending" && (
        <div className="flex sm:flex-col md:flex-row gap-2 self-end md:self-auto pt-2 md:pt-0">
          <Button 
            size="sm" 
            color="danger" 
            variant="flat" 
            className="rounded-xl font-medium"
            onPress={() => onReject(proposal._id)}
          >
            <XCircle className="size-4 mr-1" /> Reject
          </Button>
          <Button 
            size="sm" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md font-medium"
            onPress={() => onAccept(proposal)}
          >
            <CheckCircle className="size-4 mr-1" /> Accept & Pay
          </Button>
        </div>
      )}
    </Card>
  );
}