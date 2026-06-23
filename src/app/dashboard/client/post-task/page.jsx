"use client";

import React from 'react';
import AddTaskModal from '@/components/dashboard/client/AddTaskModal';
import { Card } from "@heroui/react";
import { PlusCircle } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function PostTaskPage() {
  const router = useRouter();

  const handleTaskAdded = () => {
    alert("Task published successfully!");
    // টাস্ক পোস্ট হওয়ার পর তাকে সরাসরি 'My Tasks' ভিউতে পাঠিয়ে দেওয়া হবে
    router.push('/dashboard/client/my-tasks');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Post a Task</h1>
        <p className="text-sm text-zinc-500 mt-1">Publish a new job block on the website for freelancers.</p>
      </div>

      <Card className="p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center text-center max-w-2xl mx-auto py-12">
        <div className="h-12 w-12 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
          <PlusCircle className="size-6" />
        </div>
        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-1">Ready to find an expert?</h3>
        <p className="text-sm text-zinc-400 max-w-sm mb-6">
          Fill out the task title, category, description, budget, and deadline to publish your job.
        </p>
        
        {/* তোমার তৈরি ফর্ম মোডালটি এখানে ওপেন হবে */}
        <AddTaskModal onTaskAdded={handleTaskAdded} />
      </Card>
    </div>
  );
}