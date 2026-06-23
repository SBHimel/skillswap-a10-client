"use client";

import React, { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import BannerSlider from "@/components/Banner";

// 🟢 হোমপেজের জন্য তৈরি করা নতুন সাব-কম্পোনেন্টসমূহ
import FeaturedTasks from "@/components/home/FeaturedTasks";
import TopFreelancers from "@/components/home/TopFreelancers";
import HowItWorks from "@/components/home/HowItWorks";
import PlatformStats from "@/components/home/PlatformStats";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [stats, setStats] = useState({ totalTasks: 0, totalUsers: 0, totalPayout: 0 });
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
        
        // ১. প্রতিটি রেসপন্স আলাদা করে নিয়ে চেক করা
        const resTasks = await fetch(`${baseURL}/tasks/open`);
        const resFreelancers = await fetch(`${baseURL}/users/freelancers`);
        const resStats = await fetch(`${baseURL}/platform-stats`);

        // 🟢 রেসপন্স টাইপ HTML কি না তা ভ্যালিডেট করা (ক্র্যাশ রোধ করতে)
        if (resTasks.ok && resTasks.headers.get("content-type")?.includes("application/json")) {
          const tasksData = await resTasks.json();
          setTasks(tasksData);
        } else {
          console.warn("Tasks API didn't return valid JSON");
        }

        if (resFreelancers.ok && resFreelancers.headers.get("content-type")?.includes("application/json")) {
          const freelancersData = await resFreelancers.json();
          setFreelancers(freelancersData);
        } else {
          console.warn("Freelancers API didn't return valid JSON");
        }

        if (resStats.ok && resStats.headers.get("content-type")?.includes("application/json")) {
          const statsData = await resStats.json();
          setStats(statsData);
        } else {
          console.warn("Stats API didn't return valid JSON");
        }

      } catch (error) {
        console.error("ডাটাবেজ থেকে হোমপেজের ডাটা লোড করতে সমস্যা:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* ১. হিরো ব্যানার সেকশন */}
      <BannerSlider />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner size="lg" label="Loading Marketplace Data..." color="indigo" />
        </div>
      ) : (
        <>
          {/* ২. লেটেস্ট ফিচারড টাস্ক ডাইনামিক সেকশন */}
          <FeaturedTasks tasks={tasks} />

          {/* ৩. টপ ফ্রিল্যান্সার ডাইনামিক সেকশন */}
          <TopFreelancers freelancers={freelancers} />

          {/* ৪. হাউ ইট ওয়ার্কস এক্সট্রা সেকশন */}
          <HowItWorks />

          {/* ৫. প্ল্যাটফর্ম স্ট্যাটিস্টিকস এক্সট্রা সেকশন */}
          <PlatformStats stats={stats} />
        </>
      )}
    </div>
  );
}