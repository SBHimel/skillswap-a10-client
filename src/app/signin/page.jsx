"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Fieldset, Form, Input, Label, Surface, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      // Better Auth ইমেইল লগইন
      const { data, error: authError } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (authError) {
        setError(authError.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      // 🟢 ডকস রুল: রোল অনুযায়ী ডাইনামিক রিডাইরেক্ট
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

  // 🟢 Google OAuth লগইন (অটোমেটিক ক্লায়েন্ট রোল ব্যাকএন্ড/Better-Auth কনফিগে সেট হবে)
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/", // ডকস অনুযায়ী গুগল সাইন-ইন হোমে পাঠাবে কারণ সে ক্লায়েন্ট
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-6 max-w-md mx-auto mt-10">
      <Surface className="w-full p-8 border border-zinc-100 dark:border-zinc-800 rounded-3xl bg-white dark:bg-zinc-900 shadow-xl">
        <Form onSubmit={onSubmit} className="space-y-4">
          <Fieldset className="w-full">
            <Fieldset.Legend className="text-2xl font-black">Sign In</Fieldset.Legend>
            <p className="text-xs text-zinc-400 mb-4">Welcome back to SkillSwap</p>

            {error && <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 p-2.5 rounded-xl font-medium mb-3">{error}</p>}

            <Fieldset.Group className="space-y-3">
              <TextField isRequired name="email" type="email">
                <Label>Email</Label>
                <Input placeholder="john@example.com" variant="bordered" />
              </TextField>

              <TextField isRequired name="password" type="password">
                <Label>Password</Label>
                <Input placeholder="Enter your password" variant="bordered" />
              </TextField>
            </Fieldset.Group>

            <Fieldset.Actions className="mt-6 space-y-3">
              <Button type="submit" isLoading={loading} className="w-full bg-indigo-600 text-white font-medium rounded-xl shadow-md">
                Sign In
              </Button>

              {/* 🟢 ডকস রিকোয়ারমেন্ট: গুগল সাইন ইন বাটন */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
                <span className="flex-shrink mx-4 text-zinc-400 text-xs">OR</span>
                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
              </div>

              <Button onPress={handleGoogleSignIn} type="button" variant="bordered" className="w-full rounded-xl font-medium border-zinc-200 dark:border-zinc-800">
                <svg className="size-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}