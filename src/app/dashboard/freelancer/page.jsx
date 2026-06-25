"use client";

import React, { useState, useEffect } from 'react';
import { freelancerAPI } from "@/lib/api";
import { Spinner, Card } from "@heroui/react";
import { Briefcase, ClipboardList, Clock, CheckCircle, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import TaskCard from "./components/TaskCard";
import ProposalModal from "./components/ProposalModal";

export default function FreelancerDashboardHomepage() {
  const [availableTasks, setAvailableTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, accepted: 0, earnings: 0 });
  const [loading, setLoading] = useState(true);

  // পেজিনেশনের জন্য স্টেটসমূহ
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const tasksPerPage = 9; 

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
  const loadDashboardData = async (page = 1) => {
    try {
      setLoading(true);
      const tasksData = await freelancerAPI.getAvailableTasks(page, tasksPerPage);
      
      if (tasksData && Array.isArray(tasksData.tasks)) {
        setAvailableTasks(tasksData.tasks);
        setTotalPages(tasksData.totalPages || 1);   
        setCurrentPage(tasksData.currentPage || 1); 
      } else {
        setAvailableTasks(Array.isArray(tasksData) ? tasksData : []);
      }

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
    loadDashboardData(currentPage);
  }, [currentPage]);

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
        loadDashboardData(currentPage); 
      } else {
        alert(res.msg || "Proposal submission failed!");
      }
    } catch (error) {
      console.error("Submit করতে সমস্যা হয়েছে:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[75vh] flex flex-col gap-4 items-center justify-center">
        <Spinner size="lg" color="primary" />
        <p className="text-zinc-500 dark:text-zinc-400 text-sm animate-pulse">Loading dashboard tools...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 min-h-screen text-zinc-900 dark:text-zinc-100 selection:bg-blue-500/30">
      
      {/* 🚀 স্ট্যাটস সেকশন (যেকোনো থিমে চমৎকার ফিট হবে) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        
        {/* Total Applications */}
        <Card className="p-5 flex flex-row items-center gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-2xl group transition-all">
          <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide uppercase">Total Applications</p>
            <p className="text-2xl font-bold mt-0.5">{stats.total}</p>
          </div>
        </Card>
        
        {/* Pending Approvals */}
        <Card className="p-5 flex flex-row items-center gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-2xl group transition-all">
          <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide uppercase">Pending Approvals</p>
            <p className="text-2xl font-bold mt-0.5">{stats.pending}</p>
          </div>
        </Card>

        {/* Accepted Tasks */}
        <Card className="p-5 flex flex-row items-center gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-2xl group transition-all">
          <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide uppercase">Accepted Tasks</p>
            <p className="text-2xl font-bold mt-0.5">{stats.accepted}</p>
          </div>
        </Card>

        {/* Total Earnings */}
        <Card className="p-5 flex flex-row items-center gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-2xl group transition-all">
          <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide uppercase">Total Earnings</p>
            <p className="text-2xl font-bold mt-0.5">${stats.earnings.toLocaleString()}</p>
          </div>
        </Card>
      </div>

      {/* 💼 মেইন টাস্ক সেকশন */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-500" />
            Available Tasks for You
          </h2>
        </div>

        {availableTasks.length === 0 ? (
          <Card className="p-12 text-center bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-2xl max-w-xl mx-auto">
            <Briefcase className="w-10 h-10 text-zinc-400 dark:text-zinc-600 mx-auto mb-3 stroke-1" />
            <p className="text-base font-semibold">No open tasks available right now</p>
            <p className="text-xs mt-1 text-zinc-400">Please check back later or refresh your workspace.</p>
          </Card>
        ) : (
          <>
            {/* 📱 🟢 এখানে গ্রিড সিস্টেম একদম পারফেক্ট করা হয়েছে, ছোট স্ক্রিনে ১টা করে কলাম দেখাবে */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableTasks.map((task) => (
                <TaskCard 
                  key={task._id} 
                  task={task} 
                  onApply={() => handleApplyClick(task)} 
                />
              ))}
            </div>

            {/* 🎯 স্লিম, কম্প্যাক্ট এবং সেন্টারড কাস্টম পেজিনেশন বাটন */}
            <div className="flex justify-center items-center gap-1.5 mt-12 pb-4">
              {/* Previous Button */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="p-1.5 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 disabled:opacity-40 rounded-lg text-zinc-600 dark:text-zinc-400 transition-all shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {/* Current Page Number */}
              <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white font-semibold rounded-lg text-xs shadow-md shadow-blue-600/20 select-none">
                {currentPage}
              </div>
              
              {/* Next Button */}
              <button
                disabled={currentPage === totalPages || totalPages <= 1}
                onClick={() => setCurrentPage((prev) => (totalPages ? Math.min(prev + 1, totalPages) : prev + 1))}
                className="p-1.5 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 disabled:opacity-40 rounded-lg text-zinc-600 dark:text-zinc-400 transition-all shadow-sm cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* প্রপোজাল সাবমিট মোডাল */}
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
        onSubmit={handleProposalSubmit}
        submitting={submitting}
      />
    </div>
  );
}