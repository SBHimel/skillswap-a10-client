"use client";
import { useEffect, useState } from "react";
import { freelancerAPI } from "@/lib/api";

export default function ProfileInfoCard({ sessionUser, role }) {
  const [dbUser, setDbUser] = useState({
    name: "Loading...",
    image: "https://i.pravatar.cc/150",
  });

  useEffect(() => {
    if (sessionUser?.email) {
      freelancerAPI.getProfile(sessionUser.email).then((data) => {
        // 🔴 ব্রাউজারের কনসোলে চেক করার জন্য এই লগটি দেওয়া হলো
        console.log("Database Response for Sidebar:", data);
        
        if (data) {
          setDbUser({
            name: data.name || "Guest User",
            // এখানে অবজেক্টের কী নাম আসছে তা কনসোল দেখে নিশ্চিত হতে হবে
            image: data.image || data.photo || "https://i.pravatar.cc/150",
          });
        }
      });
    }
  }, [sessionUser?.email]);

  return (
    <div className="p-4 mx-3 my-4 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/40 flex items-center gap-3">
      <img
        src={dbUser.image}
        width={40}
        height={40}
        className="rounded-full object-cover border border-indigo-500 h-10 w-10"
        alt="user-avatar"
        onError={(e) => {
          e.target.src = "https://i.pravatar.cc/150";
        }}
      />
      
      <div className="flex flex-col overflow-hidden">
        <span className="text-sm font-bold truncate">
          {dbUser.name}
        </span>
        <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 capitalize bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md w-fit mt-0.5">
          {role}
        </span>
      </div>
    </div>
  );
}