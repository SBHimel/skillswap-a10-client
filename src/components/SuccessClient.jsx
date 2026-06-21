"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SuccessClient({ sessionData }) {
  const [statusMessage, setStatusMessage] = useState("Verifying payment and updating database...");

  useEffect(() => {
    const syncPaymentWithBackend = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
        const { data: tokenData } = await authClient.token();

        // 🟢 তোমার ব্যাকএন্ডে অলরেডি বানানো /payment/success (বা সমগোত্রীয়) এপিআইতে হিট করছি
        const res = await fetch(`${baseURL}/payment/success`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${tokenData?.token}`
          },
          body: JSON.stringify(sessionData) // taskId, proposalId সব মেইন ব্যাকএন্ডে চলে যাবে
        }).then(r => r.json());

        if (res.success || res.modifiedCount > 0) {
          setStatusMessage("🎉 System updated! Task is now In Progress.");
        } else {
          setStatusMessage("Payment received, but database sync pending.");
        }
      } catch (error) {
        console.error("Backend sync error:", error);
        setStatusMessage("Error updating project status. Please contact support.");
      }
    };

    if (sessionData?.sessionId) {
      syncPaymentWithBackend();
    }
  }, [sessionData]);

  return (
    <div className="mb-4 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 text-xs text-zinc-500 font-mono">
      Status: {statusMessage}
    </div>
  );
}