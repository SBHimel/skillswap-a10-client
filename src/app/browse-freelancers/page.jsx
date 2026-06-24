"use client";

import { freelancerAPI, adminAPI } from "@/lib/api";
import React, { useEffect, useState } from "react";
import { Spinner, Card, Button } from "@heroui/react";
import { Search, Filter, User, Mail, Award, ArrowRight } from "lucide-react";

import Link from "next/link";

// ফিল্টারিংয়ের জন্য কিছু কমন স্কিল ক্যাটাগরি
const skillCategories = [
  { key: "All", label: "All Skills" },
  { key: "React", label: "React / Next.js" },
  { key: "Node", label: "Node.js / Backend" },
  { key: "UI/UX", label: "UI/UX Design" },
  { key: "Marketing", label: "Digital Marketing" },
];

export default function BrowseFreelancersPage() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setLoading(true);
        // 🟢 এখানে পরিবর্তন করা হলো:
        const data = await adminAPI.getUsers(); 
        setFreelancers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Freelancers লোড করতে সমস্যা:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancers();
  }, []);

  // সার্চ এবং স্কিল ফিল্টার লজিক
  const filteredFreelancers = freelancers.filter((user) => {
    const matchesSearch = user.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // স্কিলস অ্যারে বা স্ট্রিং চেক করা
    const hasSkill = selectedSkill === "All" || 
      user.skills?.some(skill => skill.toLowerCase().includes(selectedSkill.toLowerCase())) ||
      user.skills?.toString().toLowerCase().includes(selectedSkill.toLowerCase());

    return matchesSearch && hasSkill;
  });

  return (
    <div className="space-y-6 px-2 sm:px-4 max-w-7xl mx-auto py-6">
      
      {/* হেডার */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Find Expert Freelancers</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Hire top talents, filter by technical skills, and collaborate on projects.
        </p>
      </div>

      {/* 🔍 Search & Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div className="sm:col-span-2 relative flex items-center">
          <Search className="size-4 text-zinc-400 absolute left-4 pointer-events-none z-10" />
          <input
            type="text"
            placeholder="Search freelancers by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2.5 pr-12 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
            style={{ paddingLeft: "3rem" }} 
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-4 text-xs font-bold text-zinc-400 hover:text-zinc-600 z-10">Clear</button>
          )}
        </div>

        <div className="relative flex items-center">
          <Filter className="size-4 text-zinc-400 absolute left-4 pointer-events-none z-10" />
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="w-full pr-8 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer transition-colors"
            style={{ paddingLeft: "3rem" }}
          >
            {skillCategories.map((skill) => (
              <option key={skill.key} value={skill.key} className="bg-white dark:bg-zinc-900">
                {skill.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 pointer-events-none text-zinc-400 text-[10px] z-10">▼</div>
        </div>
      </div>

      {/* 👥 Freelancers Grid */}
      <div>
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" color="indigo" label="Discovering talented experts..." />
          </div>
        ) : filteredFreelancers.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <User className="size-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">No freelancers found matching the criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFreelancers.map((freelancer) => (
              <Card key={freelancer._id} className="border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:border-indigo-500/30 transition-all duration-200 p-5 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  {/* প্রোফাইল প্রাকদর্শন হেডার */}
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200/50 dark:border-zinc-700/50">
                      <User className="size-6 text-zinc-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-white text-base tracking-tight">{freelancer.name}</h3>
                      <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5"><Mail className="size-3" /> {freelancer.email}</p>
                    </div>
                  </div>

                  {/* বায়ো বা ডেসক্রিপশন */}
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {freelancer.bio || "No professional bio provided yet. Expert freelancer ready for assignment."}
                  </p>

                  {/* 🟢 একদম এই কোডটি ওখানে পেস্ট করে দাও */}
<div className="flex flex-wrap gap-1.5 pt-1">
  {(() => {
    let skillsArray = [];
    if (Array.isArray(freelancer.skills)) {
      skillsArray = freelancer.skills;
    } else if (typeof freelancer.skills === "string" && freelancer.skills.trim() !== "") {
      skillsArray = freelancer.skills.split(",").map(s => s.trim());
    }

    if (skillsArray.length === 0) {
      return <span className="text-[10px] text-zinc-400 italic">General Skills</span>;
    }

    return (
      <>
        {skillsArray.slice(0, 3).map((skill, index) => (
          <span key={index} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 border border-zinc-200/30 dark:border-zinc-700/30">
            {skill}
          </span>
        ))}
        {skillsArray.length > 3 && (
          <span className="text-[10px] text-indigo-500 font-bold self-center">+{skillsArray.length - 3} more</span>
        )}
      </>
    );
  })()}
</div>
                </div>

                {/* অ্যাকশন বাটন - পাবলিক প্রোফাইলে যাওয়ার লিংক */}
                <div className="pt-5 mt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                  <Link href={`/browse-freelancers/${freelancer._id}`}>
                    <Button size="sm" className="w-full bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold rounded-xl flex items-center justify-center gap-1.5 text-xs">
                      <span>View Full Profile</span>
                      <ArrowRight className="size-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}