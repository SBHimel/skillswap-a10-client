"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { Menu, Moon, Sun, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  // 🟢 থিম চেঞ্জ হলে HTML ট্যাগে ক্লাস পুশ করার ইফেক্ট
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 🟢 থিম সুইচ করার ফাংশন
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Better-Auth সেশন এবং ইউজার ডেটা রিড করা
  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(session);

  // ড্যাশবোর্ডের ভেতরে থাকলে নেভবার রেন্ডার হবে না
  if (pathname.includes("dashboard")) {
    return null;
  }

  // লগআউট হ্যান্ডলার
  const handleSignOut = async () => {
    try {
      console.log("Logout clicked");

      await authClient.signOut();

      console.log("Logout success");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  



  return (
    <div className="w-full">
      {/* মার্কেটপ্লেস রিলেটেড টপ অ্যালার্ট বার (ই-কমার্স টেক্সট সরানো হয়েছে) */}
      <div className="bg-zinc-950 border-b border-zinc-800 p-1.5 text-center text-xs font-medium text-zinc-300">
        <marquee scrollamount="4">
          🚀 Welcome to SkillSwap Marketplace! Secure milestone tracking powered by Stripe. Post micro-tasks or apply as a freelancer today!
        </marquee>
      </div>

      <nav className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-lg text-zinc-200">
        <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

          {/* Brand Logo & Title */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-zinc-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <Link href="/">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-lg">
                  S
                </div>
                <span className="text-xl font-bold tracking-tight text-white">SkillSwap</span>
              </div>
            </Link>
          </div>

          {/* Docs: Public Links (For Everyone) */}
          <ul className="hidden items-center gap-6 md:flex text-sm font-medium">
            <li>
              <Link href="/" className={`transition-colors hover:text-white ${pathname === "/" ? "text-indigo-400" : "text-zinc-400"}`}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/tasks" className={`transition-colors hover:text-white ${pathname === "/tasks" ? "text-indigo-400" : "text-zinc-400"}`}>
                Browse Tasks
              </Link>
            </li>
            <li>
              <Link href="/freelancers" className={`transition-colors hover:text-white ${pathname === "/freelancers" ? "text-indigo-400" : "text-zinc-400"}`}>
                Browse Freelancers
              </Link>
            </li>
          </ul>

          {/* 🟢 গ্লোবাল থিম সুইচ বাটন (এখানে বসিয়ে দাও) */}
          <div className="hidden md:block">
            <Button 
              isIconOnly 
              variant="light" 
              radius="xl" 
              onPress={toggleTheme}
              className="text-zinc-400 hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-zinc-400" />
              )}
            </Button>
          </div>

          {/* Docs: Logged-out Links (Login / Signup) */}
          {!user && (
            <div className="hidden items-center gap-4 md:flex text-sm font-medium">
              <Link href="/signin" className="text-zinc-400 hover:text-white transition-colors">
                Login
              </Link>
              <Link href="/signup">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold h-9 px-4 transition-colors shadow-md">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Docs: Private Links inside Dropdown (Logged-in Only) */}
          {user && (
            <div className="flex items-center gap-4">
              <Dropdown placement="bottom-end">
                <Dropdown.Trigger className="cursor-pointer">
                  <Avatar size="sm" color="primary" className="transition-transform">
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt={user?.name || "User Avatar"}
                      src={user?.image}
                    />
                    <Avatar.Fallback>{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
                  </Avatar>
                </Dropdown.Trigger>

                <Dropdown.Popover className="bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-2xl min-w-[220px]">
                  {/* User Profile Header info */}
                  <div className="px-4 pt-3 pb-2 border-b border-zinc-800">
                    <p className="text-sm font-semibold text-white">{user?.name}</p>
                    <p className="text-xs text-zinc-400 truncate">{user?.email}</p>
                  </div>

                  <Dropdown.Menu
                    aria-label="User Actions"
                    className="p-1.5"

                  >
                    {/* Dashboard Option */}
                    <Dropdown.Item key="dashboard" textValue="Dashboard" className="rounded-xl hover:bg-zinc-800">
                      <Link className="flex items-center gap-2.5 w-full text-zinc-300 py-1" href={`/dashboard/${user?.role || "client"}`}>
                        <MdDashboard className="text-indigo-400 text-lg" />
                        <span>Dashboard</span>
                      </Link>
                    </Dropdown.Item>

                    {/* Profile Option */}
                    <Dropdown.Item key="profile" textValue="Profile" className="rounded-xl hover:bg-zinc-800">
                      <Link className="flex items-center gap-2.5 w-full text-zinc-300 py-1" href="/profile">
                        <CgProfile className="text-emerald-400 text-lg" />
                        <span>Profile</span>
                      </Link>
                    </Dropdown.Item>

                    {/* Logout Option (Fixed Action Trigger) */}
                    <Dropdown.Item
                      key="logout"
                      onPress={handleSignOut}
                      className="rounded-xl text-rose-400 hover:bg-rose-500/10"
                    >
                      <div className="flex items-center gap-2.5 py-1">
                        <BiLogOut className="text-lg" />
                        <span className="font-medium">Logout</span>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          )}
        </header>

        {/* Mobile Dropdown Menu (Docs Compliant) */}
        {isMenuOpen && (
          <div className="border-t border-zinc-800 bg-zinc-950 md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <ul className="flex flex-col gap-1 p-4 text-base font-medium">
              <li>
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="block py-2.5 text-zinc-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tasks" onClick={() => setIsMenuOpen(false)} className="block py-2.5 text-zinc-400 hover:text-white">
                  Browse Tasks
                </Link>
              </li>
              <li>
                <Link href="/freelancers" onClick={() => setIsMenuOpen(false)} className="block py-2.5 text-zinc-400 hover:text-white">
                  Browse Freelancers
                </Link>
              </li>

              {/* 🟢 এখানে মোবাইল থিম সুইচ বাটনটি বসিয়ে দাও */}
              <li className="flex items-center justify-between py-2 px-1 text-zinc-400">
                <span className="text-sm font-medium">Theme Mode</span>
                <Button 
                  isIconOnly 
                  variant="flat" 
                  radius="xl" 
                  size="sm"
                  onPress={toggleTheme}
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Moon className="h-4 w-4 text-zinc-400" />
                  )}
                </Button>
              </li>

              <li className="my-2 h-px bg-zinc-800" />

              {user ? (
                <>
                  <li>
                    <Link href={`/dashboard/${user?.role || "client"}`} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 py-2.5 text-zinc-400 hover:text-white">
                      <MdDashboard className="text-indigo-400" /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 py-2.5 text-zinc-400 hover:text-white">
                      <CgProfile className="text-emerald-400" /> Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                      className="w-full flex items-center gap-2 py-2.5 text-rose-400 hover:text-rose-300 text-left"
                    >
                      <BiLogOut /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="pt-2 flex flex-col gap-3">
                  <Link href="/signin" onClick={() => setIsMenuOpen(false)} className="block text-center py-2 text-zinc-400 hover:text-white">
                    Login
                  </Link>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-indigo-600 text-white font-semibold rounded-xl h-10">
                      Sign Up
                    </Button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;