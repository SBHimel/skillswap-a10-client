"use client";

import React, { useState, useEffect } from 'react';
import AddTaskModal from '@/components/dashboard/client/AddTaskModal';
import EditTaskModal from '@/components/dashboard/client/EditTaskModal';

import { Card, Chip, Button } from "@heroui/react";
import { Edit2, Trash2, Check, X, ArrowUpRight } from "lucide-react";
import { useRouter } from 'next/navigation';
import { authClient } from "@/lib/auth-client";

export default function ClientTasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("my-tasks");


  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const loadClientData = async () => {
    try {
      const { data: token } = await authClient.token();
      const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

      const resTasks = await fetch(`${baseURL}/client-tasks`, {
        headers: { authorization: `Bearer ${token?.token}` }
      });
      const tasksData = await resTasks.json();
      setTasks(Array.isArray(tasksData) ? tasksData : []);

      const resProposals = await fetch(`${baseURL}/client-proposals`, {
        headers: { authorization: `Bearer ${token?.token}` }
      });
      const proposalsData = await resProposals.json();
      setProposals(Array.isArray(proposalsData) ? proposalsData : []);

    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cascading render আটকাতে অ্যাসিনক্রোনাস সেফ কল
  useEffect(() => {
    const fetchData = async () => {
      await loadClientData();
    };
    fetchData();
  }, []);

  const handleTaskUpdatedInState = async (id, updatedData) => {
    try {
      const { data: token } = await authClient.token();
      const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

      const res = await fetch(`${baseURL}/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token?.token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        setTasks((prev) =>
          prev.map((t) => (t._id === id ? { ...t, ...updatedData } : t))
        );
      } else {
        alert("Failed to update task");
      }
    } catch (error) {
      console.error("Error inside main patch handler:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const { data: token } = await authClient.token();
      const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

      const res = await fetch(`${baseURL}/tasks/${id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${token?.token}` }
      });

      if (res.ok) {
        setTasks((prev) => prev.filter((task) => task._id !== id));
      } else {
        alert("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };


  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsEditOpen(true);
  };

  const handleRejectProposal = async (proposalId) => {
    try {
      const { data: token } = await authClient.token();
      const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

      const res = await fetch(`${baseURL}/proposals/reject/${proposalId}`, {
        method: "PATCH",
        headers: { authorization: `Bearer ${token?.token}` }
      });

      if (res.ok) {
        loadClientData();
      }
    } catch (error) {
      console.error("Error rejecting proposal:", error);
    }
  };

  const handleAcceptProposal = (proposalId, taskId) => {
    router.push(`/payment/checkout?proposalId=${proposalId}&taskId=${taskId}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex justify-between items-center bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Manage Tasks</h1>
          <p className="text-sm text-zinc-500 mt-1">Create tasks, track live statuses, and hire developers.</p>
        </div>
        <div>
          <AddTaskModal onTaskAdded={loadClientData} />
        </div>
      </div>

      {/* Tabs List */}
      <div className="w-full border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab("my-tasks")}
            className={`pb-3 relative transition-all ${activeTab === "my-tasks" ? "text-indigo-600 dark:text-indigo-400 font-bold" : "text-zinc-500"}`}
          >
            My Tasks View
            {activeTab === "my-tasks" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 rounded-full" />}
          </button>
          <button
            onClick={() => setActiveTab("proposals")}
            className={`pb-3 relative transition-all ${activeTab === "proposals" ? "text-indigo-600 dark:text-indigo-400 font-bold" : "text-zinc-500"}`}
          >
            Manage Proposals
            {activeTab === "proposals" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 rounded-full" />}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-4">
        {loading ? (
          <p className="text-zinc-400 text-sm">Loading data...</p>
        ) : (
          <>
            {/* TAB 1: My Tasks */}
            {activeTab === "my-tasks" && (
              <div className="space-y-4">
                {tasks.length === 0 ? (
                  <p className="text-zinc-400 text-sm text-center py-6">No tasks posted yet.</p>
                ) : (
                  tasks.map((task) => (
                    <Card key={task._id} className="p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100">{task.title}</h3>
                          <Chip size="sm" variant="flat" color={task.status === "open" ? "success" : "warning"}>
                            {task.status}
                          </Chip>
                        </div>
                        <p className="text-xs text-zinc-400">Category: {task.category} | Budget: ${task.budget} | Deadline: {task.deadline}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="flat" isDisabled={task.status !== "open"} className="rounded-xl" onPress={() => openEditModal(task)}>
                          <Edit2 className="size-4 mr-1" /> Edit
                        </Button>
                        <Button size="sm" variant="flat" color="danger" isDisabled={task.status !== "open"} className="rounded-xl" onPress={() => handleDeleteTask(task._id)}>
                          <Trash2 className="size-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}

            {/* TAB 2: Proposals */}
            {activeTab === "proposals" && (
              <div className="space-y-4">
                {proposals.length === 0 ? (
                  <p className="text-zinc-400 text-sm text-center py-6">No proposals submitted yet.</p>
                ) : (
                  proposals.map((prop) => (
                    <Card key={prop._id} className="p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-base text-zinc-800 dark:text-zinc-200">{prop.freelancerName}</span>
                            <Chip size="sm" variant="dot" color="secondary">For: {prop.taskTitle}</Chip>

                            {/* 🟢 ১. প্রপোজালের লাইভ স্ট্যাটাস চিপ */}
                            <Chip
                              size="sm"
                              variant="flat"
                              color={prop.status === "Accepted" ? "success" : prop.status === "Rejected" ? "danger" : "warning"}
                            >
                              {prop.status || "Pending"}
                            </Chip>
                          </div>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">Bid Amount: ${prop.budget} | Delivery: {prop.duration} Days</p>
                          <p className="text-sm text-zinc-400 italic bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/50 mt-2">"{prop.message}"</p>
                        </div>

                        <div className="flex md:flex-col lg:flex-row gap-2 self-end md:self-auto">

                          {/* 🟢 ২. রিজেক্ট বাটন (লক সিস্টেম সহ) */}
                          <Button
                            size="sm"
                            color="danger"
                            variant="flat"
                            className="rounded-xl"
                            isDisabled={prop.status === "Rejected" || prop.status === "Accepted"} // লক কন্ডিশন
                            onClick={() => handleRejectProposal(prop._id)}
                          >
                            <X className="size-4 mr-1" /> Reject
                          </Button>

                          {/* 🟢 ৩. এক্সেপ্ট বাটন (প্যারামিটারে taskId সহ এবং লক সিস্টেম) */}
                          {/* 🟢 এক্সেপ্ট বাটন (প্যারামিটারে taskId সহ এবং লক সিস্টেম) */}
                          <Button
                            size="sm"
                            className="bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-500/10"
                            isDisabled={prop.status === "Rejected" || prop.status === "Accepted"} // লক কন্ডিশন
                            onClick={() => handleAcceptProposal(prop._id, prop.taskId)} // এখানে taskId-ও পাস করলাম
                          >
                            <Check className="size-4 mr-1" /> Accept & Pay <ArrowUpRight className="size-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* 🟢 কন্ডিশনাল রেন্ডারিং যোগ করা হলো: শুধুমাত্র ওপেন হলেই মোডালটি মাউন্ট হবে */}
      {isEditOpen && selectedTask && (
        <EditTaskModal
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedTask(null); // ক্লোজ হলে স্টেট রিসেট
          }}
          selectedTask={selectedTask}
          onTaskUpdated={handleTaskUpdatedInState}
        />
      )}

    </div>
  );
}