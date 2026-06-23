"use client";

import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { ShieldAlert, ShieldCheck, Mail, UserCheck, ShieldX } from "lucide-react";
import { adminAPI } from "@/lib/api";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Users load করতে সমস্যা:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleBlockStatus = async (userId, currentStatus) => {
    try {
      const nextStatus = !currentStatus;
      const res = await adminAPI.toggleUserBlock(userId, nextStatus);

      if (res.success || res.modifiedCount > 0 || res._id) {
        setUsers(users.map(u => u._id === userId ? { ...u, isBlocked: nextStatus } : u));
      }
    } catch (error) {
      console.error("Status update করতে সমস্যা:", error);
    }
  };

  return (
    <div className="space-y-6 px-2 sm:px-4 max-w-full">
      {/* Header Panel */}
      <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
            Manage Platform Users
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Overview profiles, roles, and administrative access permissions.
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-500 self-start sm:self-center">
          Total Registered: <span className="text-indigo-500 font-bold">{users.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner label="Fetching registered accounts..." color="primary" />
        </div>
      ) : users.length === 0 ? (
        <p className="text-center text-zinc-400 py-16 text-sm">No accounts registered on the database.</p>
      ) : (
        /* 📱🖥️ ব্রেকপয়েন্ট ফিক্সড: xl (১২৮০ পিক্সেল) এর নিচে আসলেই এটা ১ কলাম হয়ে যাবে, কাটাকাটির সুযোগই নেই */
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className={`bg-white dark:bg-zinc-900 p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-4 h-auto shadow-sm hover:shadow-md ${
                user.isBlocked
                  ? "border-rose-200 dark:border-rose-950/50 bg-rose-50/10 dark:bg-rose-950/5"
                  : "border-zinc-100 dark:border-zinc-800"
              }`}
            >
              {/* Top Section: Avatar, Meta Info, and Role Badge */}
              <div className="flex items-start justify-between gap-3 w-full">
                <div className="flex items-center gap-3 min-w-0 w-full">
                  {/* Avatar Icon */}
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 border ${
                    user.isBlocked 
                      ? "bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/40 text-rose-500" 
                      : "bg-zinc-50 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-300"
                  }`}>
                    {user.isBlocked ? <ShieldX className="size-5" /> : <UserCheck className="size-5" />}
                  </div>
                  
                  {/* Name and Email */}
                  <div className="flex flex-col min-w-0 w-full">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm block truncate">
                      {user.name}
                    </span>
                    <div className="flex items-center gap-1 text-zinc-400 text-xs mt-0.5 w-full">
                      <Mail className="size-3 shrink-0" />
                      <span className="truncate block w-full">{user.email}</span>
                    </div>
                  </div>
                </div>

                {/* Role Badge */}
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shrink-0 ${
                  user.role?.toLowerCase() === "client"
                    ? "bg-blue-50 text-blue-600 border-blue-200/60 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
                    : "bg-purple-50 text-purple-600 border-purple-200/60 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20"
                }`}>
                  {user.role}
                </span>
              </div>

              {/* Bottom Section: Status Indicator & Action Button */}
              <div className="space-y-3 w-full">
                <div className="h-px bg-zinc-100 dark:bg-zinc-800/60 w-full" />
                <div className="flex items-center justify-between gap-2 w-full">
                  {/* Status Indicator */}
                  <span className={`text-[11px] font-semibold flex items-center gap-1 shrink-0 ${
                    user.isBlocked ? "text-rose-500" : "text-emerald-500"
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${user.isBlocked ? "bg-rose-500" : "bg-emerald-500 animate-pulse"}`} />
                    {user.isBlocked ? "Blocked" : "Active Member"}
                  </span>

                  {/* Block / Unblock Button */}
                  <Button
                    size="sm"
                    className={`font-bold rounded-xl text-xs px-4 h-8 transition-all duration-200 shrink-0 ${
                      user.isBlocked
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                        : "bg-rose-600/10 hover:bg-rose-600/20 text-rose-500 border border-rose-500/20"
                    }`}
                    onClick={() => toggleBlockStatus(user._id, user.isBlocked)}
                  >
                    {user.isBlocked ? (
                      <div className="flex items-center gap-1">
                        <ShieldCheck className="size-3.5" /> Unblock
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <ShieldAlert className="size-3.5" /> Block
                      </div>
                    )}
                  </Button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}