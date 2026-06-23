"use client";

import { authClient } from "@/lib/auth-client";
import { freelancerAPI } from "@/lib/api"; // 🟢 database theke data anar jonno api import
import { Avatar, Button, Dropdown } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { Menu, Moon, Sun, X } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("dark");

  // 🟢 Database er real-time user data track korar jonno state
  const [dbUser, setDbUser] = useState({ name: "", image: "" });

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);

    const root = window.document.documentElement;
    if (savedTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // 🟢 Session-er email pailei database theke updated chobi ebong nam niye ashbe
  useEffect(() => {
    if (user?.email) {
      freelancerAPI.getProfile(user.email).then((data) => {
        if (data) {
          setDbUser({
            name: data.name || user?.name || "Guest User",
            image: data.image || user?.image || "https://i.pravatar.cc/150",
          });
        }
      });
    }
  }, [user?.email]);

  if (pathname.includes("dashboard")) {
    return null;
  }

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
              className="md:hidden text-zinc-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-zinc-800/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <Link href="/" className="group flex items-center gap-3 hover:opacity-95 transition-all duration-200">
              <div className="relative h-10 w-10 flex-shrink-0 bg-gradient-to-tr from-zinc-900 to-zinc-800 dark:from-zinc-100 dark:to-zinc-200 p-0.5 rounded-xl shadow-inner border border-zinc-800/50 dark:border-zinc-200/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/s-lo.png" 
                  alt="SkillSwap Logo"
                  fill
                  className="object-contain p-1.5"
                  priority
                />
              </div>

              <div className="flex flex-col justify-center select-none">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-indigo-400 transition-colors duration-200 font-sans leading-tight">
                  SkillSwap
                </span>
                <span className="text-[9px] font-bold text-zinc-400 tracking-widest mt-0.5 block uppercase leading-none opacity-80">
                  Freelance Micro-Task Platform
                </span>
              </div>
            </Link>
          </div>

          <div className="pr-30">
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
              <Button className={'pl-16'}
                isIconOnly
                variant="light"
                radius="xl"
                onPress={toggleTheme}
              >
                {!mounted ? (
                  <div className="h-5 w-5 bg-transparent" />
                ) : theme === "dark" ? (
                  <Sun className="h-5 w-5 text-amber-500 animate-in fade-in duration-200" />
                ) : (
                  <Moon className="h-5 w-5 text-zinc-400 animate-in fade-in duration-200" />
                )}
              </Button>
            </ul>
          </div>

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

          {user && (
            <div className="flex items-center gap-4">
              <Dropdown placement="bottom-end">
                <Dropdown.Trigger className="cursor-pointer">
                  <Avatar size="sm" color="primary" className="transition-transform">
                    {/* 🟢 user?.image er jaigay ekhon real-time dbUser.image fute uthbe */}
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt={dbUser.name || "User Avatar"}
                      src={dbUser.image} 
                    />
                    <Avatar.Fallback>{dbUser.name?.charAt(0) || "U"}</Avatar.Fallback>
                  </Avatar>
                </Dropdown.Trigger>

                <Dropdown.Popover className="bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-2xl min-w-[220px]">
                  {/* 🟢 Header-eo database er updated name fute uthbe */}
                  <div className="px-4 pt-3 pb-2 border-b border-zinc-800">
                    <p className="text-sm font-semibold text-white">{dbUser.name}</p>
                    <p className="text-xs text-zinc-400 truncate">{user?.email}</p>
                  </div>

                  <Dropdown.Menu aria-label="User Actions" className="p-1.5">
                    <Dropdown.Item key="dashboard" textValue="Dashboard" className="rounded-xl hover:bg-zinc-800">
                      <Link className="flex items-center gap-2.5 w-full text-zinc-300 py-1" href={`/dashboard/${user?.role || "client"}`}>
                        <MdDashboard className="text-indigo-400 text-lg" />
                        <span>Dashboard</span>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item key="profile" textValue="Profile" className="rounded-xl hover:bg-zinc-800">
                      <Link className="flex items-center gap-2.5 w-full text-zinc-300 py-1" href="/profile">
                        <CgProfile className="text-emerald-400 text-lg" />
                        <span>Profile</span>
                      </Link>
                    </Dropdown.Item>

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

        {/* Mobile Dropdown Menu */}
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

              <li className="flex items-center justify-between py-2 px-1 text-zinc-400">
                <span className="text-sm font-medium">Theme Mode</span>
                <Button isIconOnly variant="light" radius="xl" onPress={toggleTheme}>
                  {!mounted ? (
                    <div className="h-5 w-5 bg-transparent" />
                  ) : theme === "dark" ? (
                    <Sun className="h-5 w-5 text-amber-500 animate-in fade-in duration-200" />
                  ) : (
                    <Moon className="h-5 w-5 text-zinc-400 animate-in fade-in duration-200" />
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