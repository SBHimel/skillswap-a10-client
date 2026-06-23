"use client";

import React, { useState, useEffect } from 'react';
import { freelancerAPI } from "@/lib/api";
import { Spinner, Card } from "@heroui/react";
import { Briefcase, ClipboardList, Clock, CheckCircle, DollarSign } from "lucide-react";
import TaskCard from "./components/TaskCard";
import ProposalModal from "./components/ProposalModal";

export default function FreelancerDashboardHomepage() {
  const [availableTasks, setAvailableTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, accepted: 0, earnings: 0 });
  const [loading, setLoading] = useState(true);

  // মোডাল স্টেটসমূহ
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetTaskId, setTargetTaskId] = useState("");
  const [targetTaskTitle, setTargetTaskTitle] = useState("");
  const [targetClientEmail, setTargetClientEmail] = useState("");
  const [bidBudget, setBidBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // এপিআই থেকে ডাটা লোড করা
const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // তোমার সেন্ট্রালাইজড এপিআই লেয়ার ব্যবহার করে ডাটা লোড
      const tasksData = await freelancerAPI.getAvailableTasks();
      setAvailableTasks(Array.isArray(tasksData) ? tasksData : []);

      const statsData = await freelancerAPI.getFreelancerStats();
      if (statsData && !statsData.msg) {
        setStats(statsData);
      }
    } catch (error) {
      console.error("Dashboard data load করতে সমস্যা:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
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
        loadDashboardData(); // ডাটা রিফ্রেশ
      } else {
        alert(res.msg || "Proposal submission failed!");
      }
    } catch (error) {
      console.error("Submit করতে সমস্যা হয়েছে:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Spinner size="lg" color="primary" label="Loading available jobs..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Freelancer Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">Monitor your applications and browse fresh opportunities.</p>
      </div>

      {/* 🟢 রিকোয়ারমেন্টের ৪টি মেইন স্ট্যাটিস্টিকস কার্ড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border border-zinc-100 dark:border-zinc-800/80 shadow-sm flex flex-row items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 rounded-xl"><ClipboardList /></div>
          <div><p className="text-xs text-zinc-400 font-medium">Total Proposals</p><p className="text-xl font-black">{stats.total}</p></div>
        </Card>
        <Card className="p-4 border border-zinc-100 dark:border-zinc-800/80 shadow-sm flex flex-row items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-600 rounded-xl"><Clock /></div>
          <div><p className="text-xs text-zinc-400 font-medium">Pending Proposals</p><p className="text-xl font-black">{stats.pending}</p></div>
        </Card>
        <Card className="p-4 border border-zinc-100 dark:border-zinc-800/80 shadow-sm flex flex-row items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 rounded-xl"><CheckCircle /></div>
          <div><p className="text-xs text-zinc-400 font-medium">Accepted Proposals</p><p className="text-xl font-black">{stats.accepted}</p></div>
        </Card>
        <Card className="p-4 border border-zinc-100 dark:border-zinc-800/80 shadow-sm flex flex-row items-center gap-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 rounded-xl"><DollarSign /></div>
          <div><p className="text-xs text-zinc-400 font-medium">Total Earnings</p><p className="text-xl font-black">${stats.earnings}</p></div>
        </Card>
      </div>

      {/* 🟢 Browse Tasks View */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <Briefcase className="size-5 text-zinc-700 dark:text-zinc-300" />
          <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">Browse Open Tasks</h2>
        </div>
        
        {availableTasks.length === 0 ? (
          <p className="text-zinc-400 text-sm text-center py-10">No open tasks available right now.</p>
        ) : (
          availableTasks.map((task) => (
            <TaskCard key={task._id} task={task} onApply={handleApplyClick} />
          ))
        )}
      </div>

      {/* Proposal submission Form Modal */}
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