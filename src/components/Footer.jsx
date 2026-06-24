"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, ShieldCheck, Zap, Globe } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // নতুন এক্স আইকন (X Icon Rule)

export default function Footer() {
  const pathname = usePathname();
  
  if (pathname.includes('dashboard')) {
    return null;
  }

  return (
    <footer className="relative mt-24 border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      
      {/* Feature Trust Bar */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 py-6">
        <div className="mx-auto max-w-7xl px-4 grid gap-6 sm:grid-cols-3 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start">
            <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-zinc-200">Secure Payments</p>
              <p className="text-xs">Milestone protection powered by Stripe</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start">
            <Zap className="h-6 w-6 text-amber-400 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-zinc-200">Instant Bidding</p>
              <p className="text-xs">Connect with skilled experts in minutes</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start">
            <Globe className="h-6 w-6 text-blue-400 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-zinc-200">Verified Freelancers</p>
              <p className="text-xs">Review profiles, ratings & complete tasks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="mx-auto max-w-7xl px-4 py-16 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        
        {/* Website Logo with name */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-lg">
              S
            </div>
            <span className="text-xl font-bold tracking-tight text-white">SkillSwap</span>
          </div>
          <p className="text-sm leading-relaxed">
            The ultimate peer-to-peer freelance marketplace for students and professionals. Post micro-tasks, submit proposals, and secure your deals instantly.
          </p>
          {/* Social Media Links with the New X Icon */}
          <div className="flex items-center gap-3 pt-2">
            <Link href="https://www.facebook.com/s.b.himel.669113" className="p-2 rounded-md bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:text-white transition-colors">
              <FaFacebookF className="h-4 w-4" />
            </Link>
            <Link href="https://www.linkedin.com/in/sbhimel/" className="p-2 rounded-md bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:text-white transition-colors">
              <FaLinkedinIn className="h-4 w-4" />
            </Link>
            <Link href="https://x.com/himel2nd" className="p-2 rounded-md bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:text-white transition-colors">
              <FaXTwitter className="h-4 w-4" /> {/* ডাকনাম 'পাখি' বিদায়, এখানে অফিশিয়াল X আইকন */}
            </Link>
            <Link href="https://github.com/SBHimel" className="p-2 rounded-md bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:text-white transition-colors">
              <FaGithub className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Navigation links to main pages */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-200 mb-4">Navigation</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home Page</Link></li>
            <li><Link href="/browse-tasks" className="hover:text-white transition-colors">Browse Tasks</Link></li>
            <li><Link href="/browse-freelancers" className="hover:text-white transition-colors">Browse Freelancers</Link></li>
            <li><Link href="/signin" className="hover:text-white transition-colors">Login / Register</Link></li>
          </ul>
        </div>

        {/* Dashboards (Extra Layout Safety) */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-200 mb-4">Marketplace</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/dashboard/client" className="hover:text-white transition-colors">Client Space</Link></li>
            <li><Link href="/dashboard/freelancer" className="hover:text-white transition-colors">Freelancer Hub</Link></li>
            <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Email or contact info */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-200 mb-4">Contact Info</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-zinc-500" />
              <span>Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-zinc-500" />
              <span>+880 1840385793</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-zinc-500" />
              <span>s.b.himel21@gmail.com</span> {/* অফিশিয়াল ইমেইল */}
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Year Text */}
      <div className="border-t border-zinc-900 bg-black/40 py-6 text-xs text-center sm:text-left">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} SkillSwap Marketplace. All rights reserved.</p>
          <p className="text-zinc-600">Tailored UI/UX Structure</p>
        </div>
      </div>
    </footer>
  );
}