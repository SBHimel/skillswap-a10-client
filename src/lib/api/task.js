import { authClient } from "../auth-client";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

// ক্লায়েন্ট নতুন টাস্ক পোস্ট করার জন্য API কল
export const addTask = async (task) => {
   const { data: token } = await authClient.token();
   console.log("Token:", token?.token);

   const res = await fetch(`${baseURL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token?.token}`
        },
        body: JSON.stringify(task),
   });
   const data = await res.json();
   return data;
};