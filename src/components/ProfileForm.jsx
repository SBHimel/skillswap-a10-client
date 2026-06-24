"use client";

import React, { useState } from "react";
import { Mail, Shield, User, FileText, Check, Loader2, Calendar, Camera } from "lucide-react";
import { createAuthClient } from "better-auth/react";

const { updateUser } = createAuthClient();

export default function ProfileForm({ initialUser }) {
  const [name, setName] = useState(initialUser?.name || "");
  const [bio, setBio] = useState(initialUser?.bio || initialUser?.metadata?.bio || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageError, setImageError] = useState(false);

  const joinDate = initialUser?.createdAt 
    ? new Date(initialUser.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) 
    : "Recent";

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const response = await updateUser({
        name: name,
        bio: bio,
      });

      if (response?.error) throw new Error(response.error.message);

      alert("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  const getInitials = (fullName) => {
    if (!fullName) return "U";
    const words = fullName.trim().split(" ");
    return words.length > 1 ? (words[0][0] + words[1][0]).toUpperCase() : words[0][0].toUpperCase();
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl overflow-hidden transition-all duration-300">
      
      {/* 🌟 মডার্ন মিনিমালিস্টিক টপ ব্যানার */}
      <div className="h-28 bg-gradient-to-r from-indigo-950 via-zinc-900 to-purple-950 relative">
        {initialUser?.role && (
          <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Shield className="size-3 text-indigo-400 fill-indigo-400/10" />
            {initialUser.role}
          </div>
        )}
      </div>

      {/* 👤 প্রোফাইল হেডার - ছবি ছোট ও কিউট করা হয়েছে */}
      <div className="px-6 sm:px-8 pb-6 relative flex flex-col sm:flex-row sm:items-center gap-4 -mt-10">
        
        {/* 📸 প্রোফাইল ছবির কন্টেইনার - সাইজ কমিয়ে একদম নিখুঁত করা হয়েছে */}
        <div className="relative size-20 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-4 border-white dark:border-zinc-950 shadow-lg shrink-0 group">
          {!imageError && initialUser?.image ? (
            <img 
              src={initialUser.image} 
              alt={name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center text-xl font-black">
              {getInitials(name)}
            </div>
          )}
          {/* হোভার ইফেক্ট ক্যামেরা আইকন */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
            <Camera className="size-4 text-white" />
          </div>
        </div>

        {/* নাম, ইমেইল ও জয়েনিং ডেট */}
        <div className="space-y-0.5 pt-2 sm:pt-6">
          <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            {initialUser?.name || "User Profile"}
          </h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
            <span className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-900/50 px-2 py-0.5 rounded-md border border-zinc-100 dark:border-zinc-800/60">
              <Mail className="size-3 text-zinc-400" /> {initialUser?.email}
            </span>
            <span className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-900/50 px-2 py-0.5 rounded-md border border-zinc-100 dark:border-zinc-800/60">
              <Calendar className="size-3 text-zinc-400" /> Joined {joinDate}
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-8">
        <div className="h-px bg-zinc-100 dark:bg-zinc-900 w-full" />
      </div>

      {/* 📝 এডিট ফর্ম */}
      <div className="p-6 sm:p-8">
        <form onSubmit={handleUpdate} className="space-y-5">
          <div className="space-y-0.5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Settings</h3>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">Keep your account details up to date.</p>
          </div>

          <div className="space-y-4">
            {/* নাম ইনপুট */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="size-3 text-zinc-400" /> Account Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all duration-200"
              />
            </div>

            {/* বায়ো ইনপুট */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="size-3 text-zinc-400" /> Bio / Headline
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all duration-200 resize-none leading-relaxed"
                placeholder="Tell us a little about yourself..."
              />
            </div>
          </div>

          {/* সেভ চেঞ্জেস বাটন */}
          <div className="flex items-center justify-end pt-3 border-t border-zinc-100 dark:border-zinc-900">
            <button
              type="submit"
              disabled={isUpdating}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 text-white disabled:text-zinc-400 text-xs font-bold rounded-xl px-4 py-2.5 flex items-center gap-1.5 transition-all duration-200 shadow-md shadow-indigo-600/10 active:scale-[0.98]"
            >
              {isUpdating ? <Loader2 className="animate-spin size-3.5" /> : <Check className="size-3.5" />}
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}