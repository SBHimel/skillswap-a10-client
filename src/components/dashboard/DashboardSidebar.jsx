import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SidebarWrapper from "./SidebarWrapper";


export default async function DashboardSidebar() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;
    const role = user?.role || "client";

    return <SidebarWrapper user={user} role={role} />;
}