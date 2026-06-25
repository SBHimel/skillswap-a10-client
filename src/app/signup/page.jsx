"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Fieldset, Form, Input, Label, Surface, Select, ListBox, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // 🟢 পাসওয়ার্ড ভ্যালিডেশন
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(user.password)) {
      setError("Password must be at least 6 characters long, containing at least one uppercase and one lowercase letter.");
      return;
    }

    try {
      setLoading(true);
      const { data, error: authError } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image || "",
        role: user.role, // "client" অথবা "freelancer"
      });

      if (authError) {
        setError(authError.message || "Registration failed");
        setLoading(false);
        return;
      }

      // রাউটিং লজিক
      if (user.role === "freelancer") {
        router.push("/dashboard/freelancer");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  // 🟢 Google OAuth Login
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] p-4 sm:p-6 max-w-md mx-auto mt-6">
      {/* 🌟 WOW এলিমেন্ট */}
      <Surface className="w-full p-6 sm:p-8 border border-zinc-200/60 dark:border-zinc-800/80 rounded-[28px] bg-white dark:bg-zinc-950 shadow-2xl relative overflow-hidden transition-all duration-300">

        {/* top gradient line */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        <Form onSubmit={onSubmit} className="space-y-4">
          <Fieldset className="w-full">

            {/* 🎯 টাইটেল */}
            <div className="space-y-1 mb-5">
              <Fieldset.Legend className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                Create Account
              </Fieldset.Legend>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                Join <span className="text-indigo-500 font-bold">SkillSwap</span> ecosystem today
              </p>
            </div>

            {/* 🛑 এরর মেসেজ */}
            {error && (
              <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 p-3 rounded-2xl font-semibold mb-4 animate-in fade-in zoom-in-95 duration-200">
                {error}
              </div>
            )}

            {/* 📝 ইনপুট ফিল্ড গ্রুপ */}
            <Fieldset.Group className="space-y-3.5">
              <TextField isRequired name="name" className="w-full">
                <Label className="text-[11px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">Name</Label>
                <Input placeholder="John Doe" variant="flat" className="rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-sm focus-within:border-indigo-500 transition-colors" />
              </TextField>

              <TextField name="image" type="url" className="w-full">
                <Label className="text-[11px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">Profile Image URL</Label>
                <Input placeholder="https://example.com/avatar.jpg" variant="flat" className="rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-sm focus-within:border-indigo-500 transition-colors" />
              </TextField>

              <TextField isRequired name="email" type="email" className="w-full">
                <Label className="text-[11px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">Email</Label>
                <Input placeholder="john@example.com" variant="flat" className="rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-sm focus-within:border-indigo-500 transition-colors" />
              </TextField>

              <TextField isRequired name="password" className="w-full">
  <Label className="text-[11px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
    Password
  </Label>
  {/* 🟢 flex এবং items-center দিয়ে ইনপুট ও বাটনকে পাশাপাশি আনা হয়েছে */}
  <div className="flex items-center gap-2 w-full">
    
    {/* ইনপুট বক্সের কন্টেইনার */}
    <div className="flex-1">
      <Input
        // 🟢 এখানে স্টেট অনুযায়ী টাইপ চেঞ্জ হবে (text অথবা password)
        type={showPassword ? "text" : "password"}
        placeholder="At least 6 chars, 1 Upper, 1 Lower"
        variant="flat"
        className="w-full rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-sm focus-within:border-indigo-500 transition-colors"
      />
    </div>

    {/* 🎯 চোখের বাটনটির জন্য নির্দিষ্ট সাইজের (w-11 h-11) ডিভ */}
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

              {/* 🟢 রোল ড্রপডাউন */}
              <div className="w-full flex flex-col">
                <Label className="text-[11px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">Signup As</Label>
                <Select isRequired name="role" placeholder="Select account type" variant="flat" className="rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-sm focus-within:border-indigo-500 transition-all">
                  <Select.Trigger className="w-full flex justify-between items-center px-3 py-2 text-zinc-700 dark:text-zinc-300">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden p-1">
                    <ListBox className="w-full">
                      <ListBox.Item id="client" textValue="client" className="rounded-lg px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition-colors cursor-pointer font-medium">Client</ListBox.Item>
                      <ListBox.Item id="freelancer" textValue="freelancer" className="rounded-lg px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition-colors cursor-pointer font-medium">Freelancer</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </Fieldset.Group>

            {/* ⚙️ অ্যাকশন বাটনসমূহ (কাস্টম Tailwind লেআউট - কোনো Fieldset.Actions ঝামেলা নেই) */}
            <div className="mt-6 flex flex-col gap-4 w-full">
              <Button
                type="submit"
                isLoading={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl py-2.5 shadow-md shadow-indigo-600/10 active:scale-[0.99] transition-all text-xs"
              >
                Create Account
              </Button>

              <div className="relative flex py-1 items-center w-full">
                <div className="flex-grow border-t border-zinc-100 dark:border-zinc-900"></div>
                <span className="flex-shrink mx-4 text-zinc-400 dark:text-zinc-600 text-[10px] font-bold tracking-widest">OR</span>
                <div className="flex-grow border-t border-zinc-100 dark:border-zinc-900"></div>
              </div>

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
                Sign up with Google (As Client)
              </Button>

              <div className="text-center pt-2 w-full">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  Already have an account?{" "}
                  <Link
                    href="/signin"
                    className="text-indigo-500 hover:text-indigo-600 font-bold underline underline-offset-4 transition-colors"
                  >
                    Sign In
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