"use client";

import React, { useState, useEffect } from 'react';
import { Briefcase, FileText } from "lucide-react";
import { freelancerAPI } from "@/lib/api";

// 🟢 নতুন তৈরি করা কম্পোনেন্টগুলো ইম্পোর্ট করলাম
import TaskCard from "./components/TaskCard";
import ProposalCard from "./components/ProposalCard";
import ProposalModal from "./components/ProposalModal";

export default function FreelancerDashboardHomepage() {
  const [activeTab, setActiveTab] = useState("browse-tasks");
  const [availableTasks, setAvailableTasks] = useState([]);
  const [myProposals, setMyProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetTaskId, setTargetTaskId] = useState("");
  const [targetTaskTitle, setTargetTaskTitle] = useState("");
  const [targetClientEmail, setTargetClientEmail] = useState("");
  
  const [bidBudget, setBidBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadAvailableTasks = async () => {
    try {
      setLoading(true);
      const data = await freelancerAPI.getAvailableTasks();
      setAvailableTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Tasks load করতে समस्या:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMyProposals = async () => {
    try {
      const data = await freelancerAPI.getMyProposals();
      setMyProposals(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Proposals load করতে সমস্যা:", error);
    }
  };

  useEffect(() => {
    loadAvailableTasks();
    loadMyProposals();
  }, []);

  const handleApplyClick = (task) => {
    setTargetTaskId(task._id);
    setTargetTaskTitle(task.title);
    setTargetClientEmail(task.client_email || task.clientEmail);
    setBidBudget(task.budget);
    setIsModalOpen(true);
  };

  const handleProposalSubmit = async () => {
    if (!bidBudget || !duration || !message) return alert("সবগুলো ফিল্ড পূরণ করো!");

    try {
      setSubmitting(true);
      const res = await freelancerAPI.submitProposal({
        taskId: targetTaskId,
        taskTitle: targetTaskTitle,
        clientEmail: targetClientEmail,
        budget: Number(bidBudget),
        duration: Number(duration),
        message: message
      });

      if (res.success) {
        alert("Proposal Submitted successfully! 🎉");
        setDuration("");
        setMessage("");
        setIsModalOpen(false);
        loadAvailableTasks();
        loadMyProposals();
      } else {
        alert(res.msg || "Proposal submission failed!");
      }
    } catch (error) {
      console.error("Submit করতে ঝামেলা হয়েছে:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex justify-between items-center bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Freelancer Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1">Browse open jobs, submit proposals, and track your earnings.</p>
        </div>
      </div>

      {/* Tabs List */}
      <div className="w-full border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab("browse-tasks")}
            className={`pb-3 relative transition-all ${activeTab === "browse-tasks" ? "text-indigo-600 dark:text-indigo-400 font-bold" : "text-zinc-500"}`}
          >
            <span className="flex items-center gap-2"><Briefcase className="size-4" /> Browse Tasks</span>
            {activeTab === "browse-tasks" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 rounded-full" />}
          </button>
          
          <button
            onClick={() => setActiveTab("my-proposals")}
            className={`pb-3 relative transition-all ${activeTab === "my-proposals" ? "text-indigo-600 dark:text-indigo-400 font-bold" : "text-zinc-500"}`}
          >
            <span className="flex items-center gap-2"><FileText className="size-4" /> My Proposals</span>
            {activeTab === "my-proposals" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 rounded-full" />}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-4">
        {loading ? (
          <p className="text-zinc-400 text-sm">Loading available jobs...</p>
        ) : (
          <>
            {/* TAB 1: Browse Tasks */}
            {activeTab === "browse-tasks" && (
              <div className="space-y-4">
                {availableTasks.length === 0 ? (
                  <p className="text-zinc-400 text-sm text-center py-10">No open tasks available right now.</p>
                ) : (
                  availableTasks.map((task) => (
                    <TaskCard key={task._id} task={task} onApply={handleApplyClick} />
                  ))
                )}
              </div>
            )}

            {/* TAB 2: My Proposals */}
            {activeTab === "my-proposals" && (
              <div className="space-y-4">
                {myProposals.length === 0 ? (
                  <p className="text-zinc-400 text-sm text-center py-10">You haven't submitted any proposals yet.</p>
                ) : (
                  myProposals.map((proposal) => (
                    <ProposalCard key={proposal._id} proposal={proposal} />
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* 🟢 মোডাল কম্পোনেন্ট */}
      <ProposalModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskTitle={targetTaskTitle}
        bidBudget={bidBudget}
        setBidBudget={setBidBudget}
        duration={duration}
        setDuration={setDuration}
        message={message}
        setMessage={setMessage}
        submitting={submitting}
        onSubmit={handleProposalSubmit}
      />
    </div>
  );
}