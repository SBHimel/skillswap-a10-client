import { auth } from "@/lib/auth";
import { Bars } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
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
        <Drawer>
            {/* Mobile Trigger */}
            <Button className="md:hidden" variant="secondary">
                <Bars />
                Menu
            </Button>

            {/* Sidebar */}
            <nav className="hidden md:flex flex-col w-[260px] h-screen border-r bg-white">

                {/* Logo + User Section */}
                <div className="p-4 border-b flex items-center gap-3">
                    <Image
                        src={user?.image || "/avatar.png"}
                        width={40}
                        height={40}
                        className="rounded-full object-cover border"
                        alt="user"
                    />

                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">
                            {user?.name || "Guest User"}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">
                            {role}
                        </span>
                    </div>
                </div>

                {/* Logo */}
                <div className="px-4 py-3 border-b">
                    <Image
                        src="/m-logo.png"
                        height={40}
                        width={150}
                        className="h-10 object-contain"
                        alt="SkillSwap"
                    />
                </div>

                {/* Nav Items */}
                <div className="flex flex-col gap-1 p-3">
                    {navItems.map((item) => (
                        <Link key={item.label} href={item.link}>
                            <button
                                className="group flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-black transition"
                            >
                                <item.icon className="size-5 text-gray-500 group-hover:text-black transition" />
                                {item.label}
                            </button>
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Mobile Drawer */}
            <Drawer.Backdrop>
                <Drawer.Content placement="left">
                    <Drawer.Dialog>

                        <Drawer.CloseTrigger />

                        <Drawer.Header>
                            <Drawer.Heading>SkillSwap Menu</Drawer.Heading>
                        </Drawer.Header>

                        <Drawer.Body>
                            <div className="flex items-center gap-3 mb-4">
                                <Image
                                    src={user?.image || "/avatar.png"}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                    alt="user"
                                />
                                <div>
                                    <p className="text-sm font-semibold">{user?.name}</p>
                                    <p className="text-xs text-gray-500 capitalize">{role}</p>
                                </div>
                            </div>

                            <nav className="flex flex-col gap-2">
                                {navItems.map((item) => (
                                    <Link key={item.label} href={item.link}>
                                        <button
                                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition"
                                        >
                                            <item.icon className="size-5" />
                                            {item.label}
                                        </button>
                                    </Link>
                                ))}
                            </nav>
                        </Drawer.Body>

                    </Drawer.Dialog>
                </Drawer.Content>
            </Drawer.Backdrop>
        </Drawer>
    );
}