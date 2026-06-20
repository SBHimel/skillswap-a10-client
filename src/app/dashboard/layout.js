import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar"; // 🟢 নতুন ইম্পোর্ট

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Content Panel */}
        <div className="flex flex-1 flex-col overflow-hidden">
   
          <DashboardNavbar />

         
          <main className="flex-1 overflow-y-auto p-6 bg-zinc-50/50 dark:bg-zinc-950/20">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}