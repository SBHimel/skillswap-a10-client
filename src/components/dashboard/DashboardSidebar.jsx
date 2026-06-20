import { auth } from "@/lib/auth";
import { Bars } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import {
    ChartArea,
    User2,
    Briefcase,
    Wallet,
    ClipboardList
} from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardSidebar() {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;
    const role = user?.role || "client";

    const dashboardItems = {
        freelancer: [
            { icon: ChartArea, label: "Overview", link: "/dashboard/freelancer" },
            { icon: ClipboardList, label: "My Bids", link: "/dashboard/freelancer/bids" },
            { icon: Wallet, label: "Earnings", link: "/dashboard/freelancer/earnings" },
        ],
        client: [
            { icon: ChartArea, label: "Overview", link: "/dashboard/client" },
            { icon: Briefcase, label: "Manage Tasks", link: "/dashboard/client/tasks" },
            { icon: Wallet, label: "Transactions", link: "/dashboard/client/transaction" },
        ],
        admin: [
            { icon: ChartArea, label: "Overview", link: "/dashboard/admin" },
            { icon: User2, label: "User Manage", link: "/dashboard/admin/users" },
            { icon: Wallet, label: "All Transactions", link: "/dashboard/admin/transactions" },
        ],
    };

    const navItems = dashboardItems[role] || [];

    return (
        <>
            {/* 📱 মোবাইল ট্রিগার বাটন (ডেক্সটপে হাইড থাকবে) */}
            <Button className="md:hidden fixed top-3 left-4 z-50 bg-zinc-900 border border-zinc-800 text-zinc-200" variant="secondary" size="sm">
                <Bars />
                Menu
            </Button>

            {/* 🟢 🖥️ ডেক্সটপ সাইডবার (সরাসরি ডমে দৃশ্যমান থাকবে, কোনো ড্রয়ার ব্লকিং ছাড়া) */}
            <nav className="hidden md:flex flex-col w-[260px] h-screen border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex-shrink-0 transition-colors duration-200">

                {/* লোগো ও ব্র্যান্ড সেকশন */}
                <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-lg">
                            S
                        </div>
                        <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">SkillSwap</span>
                    </Link>
                </div>

                {/* প্রোফাইল ইনফো সেকশন */}
                <div className="p-4 mx-3 my-4 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/40 flex items-center gap-3">
                    <Image
                        src={user?.image || "https://i.pravatar.cc/150"}
                        width={40}
                        height={40}
                        className="rounded-full object-cover border border-indigo-500"
                        alt="user"
                    />
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-bold truncate">
                            {user?.name || "Guest User"}
                        </span>
                        <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 capitalize bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md w-fit mt-0.5">
                            {role}
                        </span>
                    </div>
                </div>

                {/* নেভিগেশন লিংকসমূহ */}
                <div className="flex flex-col gap-1.5 px-3 flex-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link key={item.label} href={item.link} className="w-full">
                            <button
                                className="group flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                            >
                                <item.icon className="size-5 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                                {item.label}
                            </button>
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    );
}