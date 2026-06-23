"use client";

import { useState } from "react";
import { Bars, Xmark } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import {
    ChartArea,
    User2,
    Briefcase,
    Wallet,
    ClipboardList,
    PlusCircle,
    CheckSquare,
    Users
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProfileInfoCard from "./ProfileInfoCard";

export default function SidebarWrapper({ user, role }) {
    const [isOpen, setIsOpen] = useState(false);

    const dashboardItems = {
        freelancer: [
            { icon: ChartArea, label: "Overview & Browse", link: "/dashboard/freelancer" },
            { icon: ClipboardList, label: "My Proposals", link: "/dashboard/freelancer/proposals" },
            { icon: CheckSquare, label: "Active Projects", link: "/dashboard/freelancer/active-projects" },
            { icon: Wallet, label: "My Earnings", link: "/dashboard/freelancer/earnings" },
            { icon: User2, label: "Edit Profile", link: "/dashboard/freelancer/profile" },
        ],
        client: [
            { icon: ChartArea, label: "Overview", link: "/dashboard/client" },
            { icon: PlusCircle, label: "Post a Task", link: "/dashboard/client/post-task" },
            { icon: Briefcase, label: "My Tasks", link: "/dashboard/client/my-tasks" },
            { icon: ClipboardList, label: "Manage Proposals", link: "/dashboard/client/proposals" },
        ],
        admin: [
            {
                icon: ChartArea,
                label: "Overview",
                link: "/dashboard/admin"
            },
            {
                icon: Users, // User2 er jaygaye Users dile arektu formal dekhaye
                label: "Manage Users",
                link: "/dashboard/admin/users"
            },
            {
                icon: ClipboardList, // 🟢 Doc-er requirement onujayi missing page-ti add kora holo
                label: "Manage Tasks",
                link: "/dashboard/admin/tasks"
            },
            {
                icon: Wallet,
                label: "Transactions History",
                link: "/dashboard/admin/transactions"
            },
        ],
    };

    const navItems = dashboardItems[role] || [];

    // Navigation item content reusable markup
    const SidebarContent = () => (
        <>
            {/* Logo & Brand Section */}
            <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <Link href="/" className="group flex items-center gap-3 hover:opacity-95 transition-all duration-200">
                    <div className="relative h-9 w-9 flex-shrink-0 bg-gradient-to-tr from-zinc-900 to-zinc-800 dark:from-zinc-100 dark:to-zinc-200 p-0.5 rounded-xl shadow-inner border border-zinc-800/50 dark:border-zinc-200/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                        <Image
                            src="/s-lo.png"
                            alt="SkillSwap Logo"
                            fill
                            className="object-contain p-1.5"
                            priority
                        />
                    </div>
                    <div className="flex flex-col justify-center select-none">
                        <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 font-sans leading-tight">
                            SkillSwap
                        </span>
                        <span className="text-[8px] font-bold text-zinc-500 dark:text-zinc-400 tracking-widest mt-0.5 block uppercase leading-none opacity-80">
                            Micro-Task Platform
                        </span>
                    </div>
                </Link>

                {/* Mobile menu close button */}
                <Button
                    className="md:hidden p-1 min-w-0 h-8 w-8 text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
                    variant="light"
                    radius="xl"
                    onClick={() => setIsOpen(false)}
                >
                    <Xmark className="size-5" />
                </Button>
            </div>

            {/* Profile Info Card Section */}
            <ProfileInfoCard sessionUser={user} role={role} />

            {/* Navigation Links */}
            <div className="flex flex-col gap-1.5 px-3 flex-1 overflow-y-auto">
                {navItems.map((item) => (
                    <Link key={item.label} href={item.link} className="w-full" onClick={() => setIsOpen(false)}>
                        <button
                            className="group flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                        >
                            <item.icon className="size-5 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                            {item.label}
                        </button>
                    </Link>
                ))}
            </div>
        </>
    );

    return (
        <>
            {/* 📱 Mobile Menu Trigger Button */}
            {/* 📱 Mobile Menu Trigger Button (Wow Gradient Look) */}
            <Button
                className="md:hidden fixed top-3 left-4 z-50 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold rounded-xl shadow-md flex items-center gap-2 px-3.5 py-1.5 h-9 border border-indigo-500/30 transition-all duration-200"
                size="sm"
                onClick={() => setIsOpen(true)}
            >
                <Bars className="size-4 text-indigo-100" />
                <span className="text-xs tracking-wide">Menu</span>
            </Button>

            {/* 📱 Mobile Drawer Sidebar Layout */}
            {isOpen && (
                <div className="fixed inset-0 z-50 md:hidden bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <nav className="w-[280px] h-screen bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
                        <SidebarContent />
                    </nav>
                    {/* Background-e click korle close hobe */}
                    <div className="flex-1 h-full" onClick={() => setIsOpen(false)} />
                </div>
            )}

            {/* 🟢 🖥️ Desktop Sidebar Layout */}
            <nav className="hidden md:flex flex-col w-[260px] h-screen border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex-shrink-0 transition-colors duration-200 sticky top-0">
                <SidebarContent />
            </nav>
        </>
    );
}