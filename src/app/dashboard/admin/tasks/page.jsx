"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { ClipboardList, Trash2, Calendar, DollarSign, Tag } from "lucide-react";
import { adminAPI } from "@/lib/api";

export default function ManageTasksPage() {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);


    const loadTasks = async () => {
        try {
            setLoading(true);
            const data = await adminAPI.getTasks();
            setTasks(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Tasks load করতে সমস্যা:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadTasks();
    }, []);

    const handleDeleteTask = async (taskId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task for violating platform safety guidelines?");
        if (!confirmDelete) return;

        try {
            const res = await adminAPI.deleteTask(taskId);
            if (res.success || res.deletedCount > 0) {
                setTasks(tasks.filter(task => task._id !== taskId));
            }
        } catch (error) {
            console.error("Task delete করতে সমস্যা:", error);
        }
    };

    return (
        <div className="space-y-6 px-2 sm:px-4">
            {/* Top Header */}
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center gap-2.5">
                <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl">
                    <ClipboardList className="size-5" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-zinc-900 dark:text-white">Manage Platform Tasks</h2>
                    <p className="text-xs text-zinc-400 mt-0.5">Review website feeds and moderate items breaking safety terms.</p>
                </div>
            </div>

            {/* 📱 ১. মোবাইল ও ট্যাবলেট ভিউ (lg ব্রেকপয়েন্টের নিচে ২-কলামের জোস গ্রিড কার্ড, কাটবে না) */}
            <div className="block lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tasks.map((task) => (
                    <div key={task._id} className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                                    <Tag className="size-2.5" /> {task.category}
                                </span>
                                <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border ${task.status === "open" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                                    }`}>
                                    {task.status}
                                </span>
                            </div>
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm line-clamp-2 leading-snug">
                                {task.title}
                            </h3>
                        </div>

                        <div className="space-y-3">
                            <div className="h-px bg-zinc-100 dark:bg-zinc-800/60 w-full" />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-zinc-400 font-medium uppercase">Budget</span>
                                        <span className="text-xs font-bold text-zinc-900 dark:text-white">${task.budget}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-zinc-400 font-medium uppercase">Deadline</span>
                                        <span className="text-xs font-medium text-zinc-500">{new Date(task.deadline).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    isIconOnly
                                    className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 rounded-xl h-8 w-8 min-w-0"
                                    onClick={() => handleDeleteTask(task._id)}
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 🖥️ ২. ডেক্সটপ ভিউ (বড় স্ক্রিনে একদম ফর্মাল ক্লিন অ্যাডমিন টেবিল) */}
            <div className="hidden lg:block bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm table-fixed">
                    <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-800">
                        <tr>
                            <th className="px-6 py-4 font-bold w-[45%]">Task Title / Category</th>
                            <th className="px-6 py-4 font-bold w-[15%]">Budget Size</th>
                            <th className="px-6 py-4 font-bold w-[15%]">Due Date</th>
                            <th className="px-6 py-4 font-bold w-[13%]">Live Status</th>
                            <th className="px-6 py-4 font-bold w-[12%] text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                        {tasks.map((task) => (
                            <tr key={task._id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col max-w-full">
                                        <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate block">{task.title}</span>
                                        <span className="text-xs text-zinc-400 mt-0.5">{task.category}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-bold text-zinc-900 dark:text-white">${task.budget}</td>
                                <td className="px-6 py-4 text-zinc-500 text-xs">{new Date(task.deadline).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider border ${task.status === "open" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                                        }`}>
                                        {task.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <Button
                                        size="sm"
                                        className="bg-rose-600/10 hover:bg-rose-600/20 text-rose-500 border border-rose-500/20 rounded-xl font-semibold text-xs h-8 px-3"
                                        onClick={() => handleDeleteTask(task._id)}
                                    >
                                        <div className="flex items-center gap-1">
                                            <Trash2 className="size-3.5" />
                                            Delete
                                        </div>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}