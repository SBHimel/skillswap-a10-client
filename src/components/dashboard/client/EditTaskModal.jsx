"use client";

import React from "react";

export default function EditTaskModal({ isOpen, onClose, selectedTask, onTaskUpdated }) {
  
  if (!isOpen || !selectedTask) return null; // মোডাল ওপেন না থাকলে কিছুই রেন্ডার হবে না

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = {
      title: formData.get("title"),
      category: formData.get("category"),
      budget: Number(formData.get("budget")),
      deadline: formData.get("deadline"),
    };

    try {
      await onTaskUpdated(selectedTask._id, updatedData);
      onClose(); // আপডেট সফল হলে মোডাল বন্ধ হবে
    } catch (error) {
      console.error("Error updating task inside component:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* মোডাল হেডার */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h3 className="text-xl font-bold tracking-tight text-white">Edit Task Details</h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-xl font-bold p-1 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* মোডাল ফর্ম বডি */}
        <form onSubmit={handleUpdateTask} className="mt-4 space-y-4">
          
          {/* টাস্ক টাইটেল */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Task Title</label>
            <input 
              type="text" 
              name="title"
              defaultValue={selectedTask?.title} 
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          {/* ক্যাটাগরি */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Category</label>
            <input 
              type="text" 
              name="category"
              defaultValue={selectedTask?.category} 
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          {/* বাজেট */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Budget (USD)</label>
            <input 
              type="number" 
              name="budget"
              defaultValue={selectedTask?.budget} 
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          {/* ডেডলাইন */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Deadline</label>
            <input 
              type="date" 
              name="deadline"
              defaultValue={selectedTask?.deadline} 
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          {/* মোডাল ফুটার বাটনসমূহ */}
          <div className="flex justify-end gap-3 border-t border-zinc-800 pt-4 mt-6">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-sm font-medium rounded-xl text-zinc-300 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-sm text-white font-medium rounded-xl shadow-md shadow-indigo-500/10 transition-colors"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}