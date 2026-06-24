"use client";

import { freelancerAPI, adminAPI } from "@/lib/api";
import React, { useEffect, useState } from "react";
import { Spinner, Card, CardBody } from "@heroui/react";
import { User, Mail, ArrowLeft, Award, Briefcase, Calendar, Globe, ShieldCheck } from "lucide-react";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function FreelancerPublicProfilePage() {
  const router = useRouter();
  const params = useParams();
  const freelancerId = params?.id;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // 🟢 এখানে পরিবর্তন করা হলো:
        const allFreelancers = await adminAPI.getUsers();
        const foundFreelancer = allFreelancers?.find((f) => f._id === freelancerId);

        if (foundFreelancer) {
          setProfile(foundFreelancer);
        } else {
          alert("Freelancer profile not found!");
          router.push("/browse-freelancers");
        }
      } catch (error) {
        console.error("Profile লোড করতে সমস্যা:", error);
      } finally {
        setLoading(false);
      }
    };
    if (freelancerId) fetchProfile();
  }, [freelancerId, router]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-3">
        <Spinner size="lg" color="indigo" />
        <p className="text-sm text-zinc-400 font-medium">Loading professional profile...</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

      {/* ব্যাক লিংক */}
      <Link
        href="/browse-freelancers"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium group"
      >
        <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Freelancers
      </Link>

      {/* মেইন প্রোফাইল লেআউট */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

        {/* বাম কলাম: ইনফো কার্ড */}
        <div className="space-y-6">
          <Card className="border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6 text-center">
            <div className="size-24 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center mx-auto mb-4">
              <User className="size-12 text-indigo-500" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight flex items-center justify-center gap-1">
                {profile.name}
                <ShieldCheck className="size-4 text-indigo-500" />
              </h2>
              <p className="text-xs text-zinc-400 flex items-center justify-center gap-1"><Mail className="size-3" /> {profile.email}</p>
            </div>

            <hr className="my-5 border-zinc-100 dark:border-zinc-800" />

            {/* অন্যান্য মেটাডাটা */}
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <Briefcase className="size-4 text-zinc-400" />
                <span>Role: Independent Freelancer</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <Calendar className="size-4 text-zinc-400" />
                <span>Member since: June 2026</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <Globe className="size-4 text-zinc-400" />
                <span>Location: Remote / Global</span>
              </div>
            </div>
          </Card>
        </div>

        {/* ডান কলাম: বায়ো এবং স্কিল ডিটেইলস */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6">
            <div className="space-y-6">

              {/* বায়োগ্রাফি */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">About Freelancer</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">
                  {profile.bio || "This professional freelancer hasn't written a specific biography yet, but their technical stack qualifies them for high-performance milestones."}
                </p>
              </div>

              <hr className="border-zinc-100 dark:border-zinc-800" />

              {/* টেকনিক্যাল স্কিলসেট */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="size-4 text-zinc-400" /> Core Core Expertises & Skills
                </h3>

                {/* 🟢 একদম এই কোডটি ওখানে পেস্ট করে দাও */}
                <div className="flex flex-wrap gap-2">
                  {(() => {
                    let skillsArray = [];
                    if (Array.isArray(profile.skills)) {
                      skillsArray = profile.skills;
                    } else if (typeof profile.skills === "string" && profile.skills.trim() !== "") {
                      skillsArray = profile.skills.split(",").map(s => s.trim());
                    }

                    if (skillsArray.length === 0) {
                      return <p className="text-xs text-zinc-400 italic">No specific skills tagged yet.</p>;
                    }

                    return skillsArray.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40"
                      >
                        {skill}
                      </span>
                    ));
                  })()}
                </div>
              </div>

            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}