"use client";

import React, { useEffect, useState } from "react";
import { Spinner, Card, Button } from "@heroui/react";
import { Search, Filter, Briefcase, DollarSign, Tag, ArrowRight } from "lucide-react";
import { freelancerAPI } from "@/lib/api"; 
import Link from "next/link"; 

const categories = [
  { key: "All", label: "All Categories" },
  { key: "Design", label: "Design" },
  { key: "Writing", label: "Writing" },
  { key: "Development", label: "Development" },
  { key: "Marketing", label: "Marketing" },
  { key: "Other", label: "Other" },
];

export default function BrowseTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Challenge 1 States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await freelancerAPI.getAvailableTasks(); 
        setTasks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Tasks লোড করতে সমস্যা:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const isOpen = task.status?.toLowerCase() === "open" || !task.status;
    const matchesSearch = task.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || task.category === selectedCategory;
    return isOpen && matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 px-2 sm:px-4 max-w-7xl mx-auto py-6">
      
      {/* হেডার */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Browse Active Tasks</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Explore open contracts, filter by domain categories, and apply with your terms.
        </p>
      </div>

      {/* 🔍 Search & Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div className="sm:col-span-2 relative flex items-center">
          <Search className="size-4 text-zinc-400 absolute left-4 pointer-events-none z-10" />
          <input
            type="text"
            placeholder="Search tasks by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2.5 pr-12 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
            style={{ paddingLeft: "3rem" }} 
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-4 text-xs font-bold text-zinc-400 hover:text-zinc-600 transition-colors z-10">
              Clear
            </button>
          )}
        </div>

        <div className="relative flex items-center">
          <Filter className="size-4 text-zinc-400 absolute left-4 pointer-events-none z-10" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pr-8 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer transition-colors"
            style={{ paddingLeft: "3rem" }}
          >
            {categories.map((cat) => (
              <option key={cat.key} value={cat.key} className="bg-white dark:bg-zinc-900">
                {cat.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 pointer-events-none text-zinc-400 text-[10px] z-10">▼</div>
        </div>
      </div>

      {/* 💼 টাস্ক লিস্ট */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" color="indigo" label="Loading live marketplace tasks..." />
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <Briefcase className="size-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">No matching active tasks found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredTasks.map((task) => (
              /* 🟢 এখানে ডাবল কার্ড রেন্ডার না করে ভেতরের অংশকে সাধারণ div বানিয়ে ক্লাস সেট করে দেওয়া হয়েছে */
              <Card key={task._id} className="border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:border-indigo-500/30 transition-all duration-200 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 w-full">
                  
                  <div className="space-y-2.5 max-w-2xl w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40 flex items-center gap-1">
                        <Tag className="size-3" />
                        {task.category || "General"}
                      </span>
                      <span className="text-xs text-zinc-400 font-medium">
                        Posted by: {task.clientEmail?.split("@")[0] || "Client"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">{task.title}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">{task.description}</p>
                  </div>

                  <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800 gap-3 shrink-0">
                    <div className="flex items-center text-zinc-900 dark:text-white">
                      <DollarSign className="size-5 text-emerald-500 font-bold shrink-0" />
                      <span className="text-2xl font-black tracking-tight">{task.budget}</span>
                    </div>
                    
                    {/* 🟢 সরাসরি Link দিয়ে বাটনটি র‍্যাপ করা হলো যাতে ১০০% ক্লিক কাজ করে */}
                    <Link href={`/browse-tasks/${task._id}`}>
                      <Button
                        size="md"
                        className="bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold rounded-xl shadow-sm flex items-center gap-1.5 hover:scale-[1.02] transition-all text-xs"
                      >
                        <span>View Details</span>
                        <ArrowRight className="size-3.5" />
                      </Button>
                    </Link>
                  </div>

                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}