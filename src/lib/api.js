import { authClient } from "@/lib/auth-client";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

const getHeaders = async () => {
  const { data } = await authClient.token();
  return {
    "Content-Type": "application/json",
    authorization: `Bearer ${data?.token}`,
  };
};

export const freelancerAPI = {
  // ১. সব ওপেন কাজ নিয়ে আসা
  getAvailableTasks: async (
    page = 1,
    limit = 9,
    search = "",
    category = "",
  ) => {
    return fetch(
      `${baseURL}/available-tasks?page=${page}&limit=${limit}&search=${search}&category=${category}`,
      {
        headers: await getHeaders(),
      },
    ).then((res) => res.json());
  },

  // ২. নতুন প্রপোজাল জমা দেওয়া
  submitProposal: async (data) =>
    fetch(`${baseURL}/submit-proposal`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  // ৩. নিজের পাঠানো সব প্রপোজাল দেখা
  getMyProposals: async () =>
    fetch(`${baseURL}/my-proposals`, { headers: await getHeaders() }).then(
      (res) => res.json(),
    ),

  getFreelancerStats: async () =>
    fetch(`${baseURL}/freelancer-stats`, { headers: await getHeaders() }).then(
      (res) => res.json(),
    ),

  getActiveProjects: async () =>
    fetch(`${baseURL}/freelancer-projects`, {
      headers: await getHeaders(),
    }).then((res) => res.json()),

  submitDeliverable: async (taskId, deliverableUrl) =>
    fetch(`${baseURL}/tasks/${taskId}/submit`, {
      method: "PATCH",
      headers: await getHeaders(),
      body: JSON.stringify({ deliverableUrl }),
    }).then((res) => res.json()),

  getEarnings: async () =>
    fetch(`${baseURL}/freelancer/earnings`, {
      headers: await getHeaders(),
    }).then((res) => res.json()),

  // প্রোফাইল আনা
  getProfile: async (email) =>
    fetch(`${baseURL}/freelancer/profile/${email}`, {
      headers: await getHeaders(),
    }).then((res) => res.json()),

  // প্রোফাইল আপডেট করা
  updateProfile: async (email, data) =>
    fetch(`${baseURL}/freelancer/profile/${email}`, {
      method: "PATCH",
      headers: { ...(await getHeaders()), "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
};

export const clientAPI = {
  // ১. ক্লায়েন্টের নিজের কাজের ওপর আসা সব প্রপোজাল নিয়ে আসা
  getClientProposals: async () =>
    fetch(`${baseURL}/client-proposals`, { headers: await getHeaders() }).then(
      (res) => res.json(),
    ),

  // ২. কোনো প্রপোজাল রিজেক্ট করা
  rejectProposal: async (id) =>
    fetch(`${baseURL}/proposals/reject/${id}`, {
      method: "PATCH",
      headers: await getHeaders(),
    }).then((res) => res.json()),
};

export const adminAPI = {
  // ১. ওয়ান-পেজ ওভারভিউ স্ট্যাটস নিয়ে আসা
  getStats: async () =>
    fetch(`${baseURL}/admin/stats`, { headers: await getHeaders() }).then(
      (res) => res.json(),
    ),

  // ২. সব ইউজারের লিস্ট নিয়ে আসা
  getUsers: async () =>
    fetch(`${baseURL}/admin/users`, { headers: await getHeaders() }).then(
      (res) => res.json(),
    ),

  // ৩. কোনো ইউজারকে ব্লক বা আনব্লক করা (PATCH রিকোয়েস্ট)
  toggleUserBlock: async (userId, isBlocked) =>
    fetch(`${baseURL}/admin/users/${userId}/block`, {
      method: "PATCH",
      headers: await getHeaders(),
      body: JSON.stringify({ isBlocked }), // বডিতে true/false পাঠাচ্ছি
    }).then((res) => res.json()),

  // ৪. সব টাস্কের লিস্ট নিয়ে আসা
  getTasks: async () =>
    fetch(`${baseURL}/admin/tasks`, { headers: await getHeaders() }).then(
      (res) => res.json(),
    ),

  // ৫. কোনো টাস্ক সেফটি রুল ভঙ্গের কারণে ডিলিট করা
  deleteTask: async (taskId) =>
    fetch(`${baseURL}/admin/tasks/${taskId}`, {
      method: "DELETE",
      headers: await getHeaders(),
    }).then((res) => res.json()),

  // ৬. সব Stripe ট্রানজেকশন হিস্ট্রি নিয়ে আসা
  getTransactions: async () =>
    fetch(`${baseURL}/admin/transactions`, {
      headers: await getHeaders(),
    }).then((res) => res.json()),
};
