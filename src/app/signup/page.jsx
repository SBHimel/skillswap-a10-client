"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Fieldset, Form, Input, Label, Surface, Select, ListBox, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // 🟢 ডকস রুল: পাসওয়ার্ড ভ্যালিডেশন (কমপক্ষে ৬ ডিজিট, ১টি বড় হাতের ও ১টি ছোট হাতের অক্ষর)
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

      // ডকস অনুযায়ী সাইন-আপ করার পর রাউটিং
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

  // 🟢 Google OAuth Login (Signing up via Google sets client automatically)
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/", // গুগল ওয়ালা ইউজার ডিরেক্ট ক্লায়েন্ট হিসেবে হোমে যাবে
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 max-w-lg mx-auto">
      <Surface className="w-full p-8 border border-zinc-100 dark:border-zinc-800 rounded-3xl bg-white dark:bg-zinc-900 shadow-xl">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend className="text-2xl font-black">Create Account</Fieldset.Legend>
            <p className="text-xs text-zinc-400 mb-4">Join SkillSwap ecosystem today</p>

            {error && <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 p-3 rounded-xl font-medium mb-4">{error}</p>}

            <Fieldset.Group className="space-y-3">
              <TextField isRequired name="name">
                <Label>Name</Label>
                <Input placeholder="John Doe" variant="bordered" />
              </TextField>

              <TextField name="image" type="url">
                <Label>Profile Image URL</Label>
                <Input placeholder="https://example.com/avatar.jpg" variant="bordered" />
              </TextField>

              <TextField isRequired name="email" type="email">
                <Label>Email</Label>
                <Input placeholder="john@example.com" variant="bordered" />
              </TextField>

              <TextField isRequired name="password" type="password">
                <Label>Password</Label>
                <Input placeholder="At least 6 chars, 1 Upper, 1 Lower" variant="bordered" />
              </TextField>

              {/* 🟢 ডকস রুল: রোল সিলেকশন ড্রপডাউন */}
              <Select isRequired name="role" placeholder="Select account type" variant="bordered">
                <Label>Signup As</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="client" textValue="client">Client</ListBox.Item>
                    <ListBox.Item id="freelancer" textValue="freelancer">Freelancer</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </Fieldset.Group>

            <Fieldset.Actions className="mt-6 space-y-3">
              <Button type="submit" isLoading={loading} className="w-full bg-indigo-600 text-white font-medium rounded-xl shadow-md">
                Sign Up
              </Button>

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
                Sign up with Google (As Client)
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}