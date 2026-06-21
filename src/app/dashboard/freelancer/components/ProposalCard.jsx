"use client";
import React from 'react';
import { Card, Chip } from "@heroui/react"; 
import { Clock, DollarSign } from "lucide-react";

export default function ProposalCard({ proposal }) {
  return (
    <Card className="p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100">{proposal.taskTitle}</h3>
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
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl">
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">Your Message:</span> {proposal.message}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
          <span className="flex items-center gap-1"><DollarSign className="size-3.5 text-indigo-500" /> Your Bid: ${proposal.budget}</span>
          <span className="flex items-center gap-1"><Clock className="size-3.5 text-amber-500" /> Duration: {proposal.duration} Days</span>
          <span className="text-zinc-500">Client: {proposal.clientEmail}</span>
        </div>
      </div>
    </Card>
  );
}