"use client";

import React, { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import ClientProposalCard from "../components/ClientProposalCard";
import { clientAPI } from "@/lib/api";

export default function ManageProposalsPage() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProposals = async () => {
    try {
      const data = await clientAPI.getClientProposals();
      setProposals(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Proposals load করতে সমস্যা:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProposals();
  }, []);

  const handleRejectProposal = async (id) => {
    if (!confirm("Are you sure you want to reject this proposal?")) return;
    try {
      await clientAPI.rejectProposal(id);
      alert("Proposal Rejected successfully!");
      loadProposals();
    } catch (error) {
      console.error("Reject করতে ঝামেলা:", error);
    }
  };

  const handleAcceptProposal = async (proposal) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: proposal.taskId,
          proposalId: proposal._id,
          taskTitle: proposal.taskTitle,
          freelancerName: proposal.freelancerName || "Expert Freelancer",
          budget: proposal.budget,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Stripe রিডাইরেক্ট
      } else {
        alert(data.error || "Stripe session creation failed!");
      }
    } catch (error) {
      console.error("Payment শুরু করতে সমস্যা:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Manage Proposals</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Review live applications from freelancers and hire the best match.
        </p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-6"><Spinner /></div>
        ) : proposals.length === 0 ? (
          <p className="text-zinc-400 text-sm text-center py-10">No proposals received yet for your tasks.</p>
        ) : (
          proposals.map((proposal) => (
            <ClientProposalCard 
              key={proposal._id} 
              proposal={proposal} 
              onReject={handleRejectProposal}
              onAccept={handleAcceptProposal}
            />
          ))
        )}
      </div>
    </div>
  );
}