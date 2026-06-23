"use client";

import React from "react";
import Image from "next/image";
import { Card, Chip } from "@heroui/react";
import { Star, CheckCircle } from "lucide-react";

export default function TopFreelancers({ freelancers }) {
  return (
    <section className="space-y-6 transition-all duration-500 delay-100 animate-in fade-in slide-in-from-bottom-5">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
          <Star className="text-amber-500 size-6 fill-amber-500" /> Top Freelancers
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Connect with expert sellers possessing exceptional completion ratings.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {freelancers.length > 0 ? (
          freelancers.map((freelancer) => (
            <Card key={freelancer._id} className="p-6 border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center">
              <div className="relative size-16 rounded-full overflow-hidden ring-4 ring-zinc-50 dark:ring-zinc-800">
                <Image 
                  src={freelancer.image || "https://i.pravatar.cc/150"} 
                  alt={freelancer.name} 
                  fill 
                  className="object-cover" 
                />
              </div>

              <h3 className="mt-4 font-bold text-lg text-zinc-900 dark:text-white">{freelancer.name}</h3>
              
              <div className="mt-2 flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1 text-amber-500">
                  <Star className="size-3.5 fill-amber-500" /> {freelancer.avgRating || "5.0"}
                </span>
                <span className="text-zinc-400 dark:text-zinc-500">|</span>
                <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                  <CheckCircle className="size-3.5 text-emerald-500" /> {freelancer.completedJobs || 0} Finished Jobs
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
  {freelancer.skills ? (
    (() => {
      // যদি skills স্ট্রিং হয়, তবে সেটিকে কমা দিয়ে স্প্লিট করে অ্যারে বানাও
      const skillsArray = Array.isArray(freelancer.skills) 
        ? freelancer.skills 
        : typeof freelancer.skills === 'string' 
          ? freelancer.skills.split(',').map(s => s.trim()) 
          : [];

      return skillsArray.length > 0 ? (
        skillsArray.map((skill, i) => (
          <Chip key={i} size="sm" variant="flat" className="text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            {skill}
          </Chip>
        ))
      ) : (
        <Chip size="sm" variant="flat" className="text-[10px] bg-zinc-50 dark:bg-zinc-800 text-zinc-400">General IT</Chip>
      );
    })()
  ) : (
    <Chip size="sm" variant="flat" className="text-[10px] bg-zinc-50 dark:bg-zinc-800 text-zinc-400">General IT</Chip>
  )}
</div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center p-8 border border-dashed rounded-2xl text-zinc-400">
            No elite freelancers discovered yet.
          </div>
        )}
      </div>
    </section>
  );
}