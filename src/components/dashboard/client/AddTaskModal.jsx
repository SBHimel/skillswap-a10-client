"use client";

import React, { useState } from "react";
import { addTask } from "@/lib/api/task";
import { imageUpload } from "@/lib/imgUpload";
import { Button, Input, TextArea } from "@heroui/react";
import { X } from "lucide-react";

export default function AddTaskModal({ onTaskAdded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      let imageUrl = "";
      if (data.image && data.image.name) {
        const image = await imageUpload(data.image);
        imageUrl = image?.url || "";
      }

      const task = {
        title: data.title,
        category: data.category,
        description: data.description,
        budget: Number(data.budget),
        deadline: data.deadline,
        image: imageUrl,
        status: "open",
      };

      const result = await addTask(task);
      if (result) {
        onTaskAdded?.();
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onPress={() => setIsOpen(true)}
        className="bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20"
      >
        Post a New Task
      </Button>

      {/* 🟢 কাস্টম এরর-ফ্রি ওভারলে এবং সাইড ড্রয়ার */}
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex justify-end">
          {/* ব্যাকড্রপ ব্লার (বাইরে ক্লিক করলে বন্ধ হবে) */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* প্রধান ড্রয়ার বডি (ডার্ক মোডে zinc-900, লাইট মোডে zinc-50 ব্যাকগ্রাউন্ড) */}
          <div className="relative w-full max-w-md h-full bg-zinc-50 dark:bg-zinc-900 shadow-2xl border-l border-zinc-200 dark:border-zinc-800 flex flex-col z-10 animate-in slide-in-from-right duration-300">

            {/* হেডার */}
            <div className="flex justify-between items-center p-5 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
              <h2 className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
                Post a New Task
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* ফর্ম বডি (স্ক্রলযোগ্য) */}
            <div className="flex-grow p-6 overflow-y-auto">
              <form
                id="task-form"
                onSubmit={onSubmit}
                className="flex flex-col gap-5"
              >
                <Input
                  name="title"
                  type="text"
                  label="Task Title"
                  placeholder="Task Title"
                  variant="bordered"
                  radius="xl"
                  required // 🟢 'isRequired' এর বদলে শুধু 'required'
                />

                <Input
                  name="category"
                  type="text"
                  label="Category"
                  placeholder="Category"
                  variant="bordered"
                  radius="xl"
                  required // 🟢 জাস্ট 'required'
                />

                <TextArea
                  name="description"
                  label="Task Description"
                  placeholder="Describe your project requirements..."
                  variant="bordered"
                  radius="xl"
                  required // 🟢 জাস্ট 'required'
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="budget"
                    type="number"
                    label="Budget (USD)"
                    placeholder="Budget (USD)"
                    variant="bordered"
                    radius="xl"
                    required // 🟢 জাস্ট 'required'
                  />

                  <Input
                    name="deadline"
                    type="date"
                    label="Deadline"
                    variant="bordered"
                    radius="xl"
                    required // 🟢 জাস্ট 'required'
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                    Project Sample Image (Optional)
                  </label>
                  <input
                    name="image"
                    type="file"
                    className="text-sm mt-1 block w-full text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 dark:file:bg-zinc-800 dark:file:text-indigo-400 cursor-pointer"
                  // নিশ্চিত করো এখানে যেন কোনো required বা isRequired না থাকে
                  />
                </div>
              </form>
            </div>

            {/* ফুটার */}
            <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex justify-end gap-3">
              <Button
                variant="flat"
                color="danger"
                radius="xl"
                onPress={() => setIsOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                form="task-form"
                isLoading={loading}
                radius="xl"
                className="bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/20"
              >
                {loading ? "Publishing..." : "Post Task"}
              </Button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}