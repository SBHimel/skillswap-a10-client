"use client";
import { useEffect, useState } from "react";
import { freelancerAPI } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
    const { data: session, isPending } = authClient.useSession();
    const [isMounted, setIsMounted] = useState(false);
    
    // স্টেটের নাম সরাসরি ডাটাবেজের ফিল্ডের সাথে মিলিয়ে রাখলাম যাতে কনফিউশন না হয়
    const [user, setUser] = useState({
        name: "",
        image: "", 
        hourlyRate: "",
        bio: "",
        skills: ""
    });

    useEffect(() => {
        setIsMounted(true);
        if (session?.user?.email) {
            freelancerAPI.getProfile(session.user.email).then((res) => {
                if (res) {
                    setUser({
                        name: res.name || "",
                        image: res.image || "", // ডাটাবেজ থেকে সরাসরি image ফিল্ড রিড করা হচ্ছে
                        hourlyRate: res.hourlyRate || "",
                        bio: res.bio || "",
                        skills: Array.isArray(res.skills) ? res.skills.join(", ") : (res.skills || "")
                    });
                }
            });
        }
    }, [session]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!session?.user?.email) return;

        // ডাটাবেজের ফিল্ডের নাম অনুযায়ী অবজেক্ট তৈরি (এখানে photo না, সরাসরি image পাঠানো হচ্ছে)
        const updatedData = {
            name: user.name,
            photo: user.image, // ব্যাকএন্ডে আমরা req.body.photo রিসিভ করছি, তাই এখানে photo নামেই পাঠাবো
            hourlyRate: user.hourlyRate,
            bio: user.bio,
            skills: user.skills
        };

        try {
            const res = await freelancerAPI.updateProfile(session.user.email, updatedData);
            
            // ব্যাকএন্ড যদি matchedCount বা modifiedCount পাঠায়
            if (res) {
                alert("Profile Updated Successfully!");
                window.location.reload(); // পেজ রিলোড দিলে সাইডবার লেটেস্ট ডাটা পাবে
            }
        } catch (error) {
            console.error("Update failed:", error);
            alert("Something went wrong!");
        }
    };

    if (!isMounted || isPending) return <div className="p-6">Loading profile...</div>;
    if (!session) return <div className="p-6">Please login first.</div>;

    return (
        <div className="p-6 max-w-lg" suppressHydrationWarning>
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

            <form onSubmit={handleUpdate}>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Name</label>
                    <input className="border p-2 w-full rounded" placeholder="Name"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })} />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Profile Photo URL</label>
                    <input className="border p-2 w-full rounded" placeholder="Photo URL"
                        value={user.image} // সরাসরি user.image ট্র্যাক করা হচ্ছে
                        onChange={(e) => setUser({ ...user, image: e.target.value })} />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Hourly Rate (USD)</label>
                    <input className="border p-2 w-full rounded" placeholder="Hourly Rate"
                        type="number"
                        value={user.hourlyRate}
                        onChange={(e) => setUser({ ...user, hourlyRate: e.target.value })} />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Bio</label>
                    <textarea className="border p-2 w-full rounded" placeholder="Tell us about yourself"
                        rows="3"
                        value={user.bio}
                        onChange={(e) => setUser({ ...user, bio: e.target.value })} />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 font-medium">Skills (comma separated)</label>
                    <input className="border p-2 w-full rounded" placeholder="e.g. React, Node.js, Design"
                        value={user.skills}
                        onChange={(e) => setUser({ ...user, skills: e.target.value })} />
                </div>

                <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition">
                    Update Profile
                </button>
            </form>
        </div>
    );
}