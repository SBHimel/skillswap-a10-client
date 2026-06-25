"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Fieldset, Form, Input, Label, Surface, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      // 🟢 ১. Better Auth-এ পাঠানোর আগে ব্যাকএন্ডের API থেকে চেক করে নিচ্ছি ইউজার ব্লকড কি না
      const checkRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/users/check-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email })
      }).then(res => res.json());

      // 🛑 যদি ডাটাবেজে ইউজার ব্লকড থাকে, তাহলে এখানেই লগইন আটকে যাবে
      if (checkRes.isBlocked) {
        setError("Your account has been blocked by the administrator.");
        setLoading(false);
        return;
      }

      // ২. ইউজার ব্লকড না হলে Better Auth ইমেইল লগইন স্বাভাবিকভাবে চলবে
      const { data, error: authError } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (authError) {
        setError(authError.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      // 🟢 ডকস রুল: রোল অনুযায়ী ডাইনামিক রিডাইরেক্ট
      const loggedInUser = data?.user;
      if (loggedInUser?.role === "freelancer") {
        router.push("/dashboard/freelancer");
      } else if (loggedInUser?.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/"); // Client বা ডিফল্ট ইউজার হোমে যাবে
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // 🟢 Google OAuth লগইন
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] p-4 sm:p-6 max-w-md mx-auto mt-6">
      {/* 🌟 WOW এলিমেন্ট: গ্লোবাল শ্যাডো, স্মুথ বর্ডার এবং হালকা ব্যাকগ্রাউন্ড গ্রাডিয়েন্ট টাচ */}
      <Surface className="w-full p-6 sm:p-8 border border-zinc-200/60 dark:border-zinc-800/80 rounded-[28px] bg-white dark:bg-zinc-950 shadow-2xl relative overflow-hidden transition-all duration-300">

        {/* টপ গ্লোয়িং ডেকোরেশন লাইন */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        <Form onSubmit={onSubmit} className="space-y-5">
          <Fieldset className="w-full">

            {/* 🎯 প্রিমিয়াম হেডিং */}
            <div className="space-y-1 mb-6">
              <Fieldset.Legend className="text-2xl font-black tracking-tight text-zinc-200 dark:text-zinc-50">
                Sign In
              </Fieldset.Legend>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                Welcome back to <span className="text-indigo-500 font-bold">SkillSwap</span>
              </p>
            </div>

            {/* 🛑 এরর নোটিফিকেশন - স্লিক আইকন ও মিনিমাল ডিজাইন */}
            {error && (
              <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 p-3 rounded-2xl font-semibold mb-4 transition-all animate-in fade-in zoom-in-95 duration-200">
                {error}
              </div>
            )}

            {/* 📝 মডার্ন ইনপুট ফিল্ড গ্রুপ */}
            <Fieldset.Group className="space-y-4">
              <TextField isRequired name="email" type="email" className="w-full">
                <Label className="text-[11px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
                  Email Address
                </Label>
                <Input
                  placeholder="john@example.com"
                  variant="flat"
                  className="rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-sm focus-within:border-indigo-500 transition-colors"
                />
              </TextField>

              <TextField isRequired name="password" className="w-full">
                <Label className="text-[11px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
                  Password
                </Label>
               
                <div className="flex items-center gap-2 w-full">

                 
                  <div className="flex-1">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      variant="flat"
                      className="w-full rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-sm focus-within:border-indigo-500 transition-colors"
                    />
                  </div>

                  
                  <div className="w-11 h-11 flex items-center justify-center flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="w-full h-full flex items-center justify-center rounded-xl bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 hover:text-indigo-400 transition-all duration-200 focus:outline-none cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                </div>
              </TextField>
            </Fieldset.Group>

            {/* ⚙️ অ্যাকশন বাটনসমূহ (লেআউট ফিক্সড) */}
            <div className="mt-6 flex flex-col gap-4 w-full">

              {/* মেইন সাইন ইন বাটন */}
              <Button
                type="submit"
                isLoading={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl py-2.5 shadow-md shadow-indigo-600/10 active:scale-[0.99] transition-all text-xs"
              >
                Sign In to Account
              </Button>

              {/* 🔗 ডিভাইডার লাইন */}
              <div className="relative flex py-1 items-center w-full">
                <div className="flex-grow border-t border-zinc-100 dark:border-zinc-900"></div>
                <span className="flex-shrink mx-4 text-zinc-400 dark:text-zinc-600 text-[10px] font-bold tracking-widest">OR</span>
                <div className="flex-grow border-t border-zinc-100 dark:border-zinc-900"></div>
              </div>

              {/* 🌐 গুগল লগইন বাটন */}
              <Button
                onPress={handleGoogleSignIn}
                type="button"
                variant="bordered"
                className="w-full rounded-xl font-bold border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 text-xs text-zinc-700 dark:text-zinc-300 transition-all active:scale-[0.99]"
              >
                <svg className="size-4 mr-2 inline-block" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </Button>

              {/* 🟢 সাইন-আপ লিংক */}
              <div className="text-center pt-2 w-full">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-indigo-500 hover:text-indigo-600 font-bold underline underline-offset-4 transition-colors"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}