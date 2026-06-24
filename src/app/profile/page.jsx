import React from "react";
import { auth } from "@/lib/auth"; // তোমার BetterAuth সার্ভার কনফিগ
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/ProfileForm"; // ওপরের ক্লায়েন্ট ফর্মটি ইম্পোর্ট করো

export default async function ProfilePage() {
    // ১. সার্ভার সাইড থেকে সিকিউরলি সেশন ডাটা রিড করা
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // ইউজার লগইন না থাকলে সিকিউরলি রিডাইরেক্ট করা
    if (!session?.user) {
        redirect("/signin");
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">My Profile</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Professional Server-to-Client Optimized Dashboard.
                </p>
            </div>

            {/* 🟢 সার্ভার থেকে পাওয়া ইউজার ডাটা ক্লায়েন্ট ফর্মে পাস করে দেওয়া */}
            <ProfileForm initialUser={session.user} />
        </div>
    );
}