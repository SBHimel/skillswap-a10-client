"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client"; // তোমার প্রজেক্টের সঠিক পাথ দাও

export default function SuccessClient({ sessionData }) {
  useEffect(() => {
    const syncPayment = async () => {
      try {
      
        const tokenData = await authClient.token();
        const token = tokenData?.token;

        const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

        // ব্যাকএন্ড এপিআই কল হচ্ছে
        await fetch(`${baseURL}/payment/success`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}` 
          },
          body: JSON.stringify(sessionData)
        });
      } catch (error) {
        console.error("Error updating payment backend:", error);
      }
    };

    syncPayment();
  }, [sessionData]);

  return null; 
}