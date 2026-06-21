import { authClient } from "@/lib/auth-client";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL ;


const getHeaders = async () => {
  const { data } = await authClient.token();
  return { 
    "Content-Type": "application/json", 
    "authorization": `Bearer ${data?.token}` 
  };
};
export const freelancerAPI = {
  // ১. সব ওপেন কাজ নিয়ে আসা
  getAvailableTasks: async () => 
    fetch(`${baseURL}/available-tasks`, { headers: await getHeaders() }).then(res => res.json()),
  
  // ২. নতুন প্রপোজাল জমা দেওয়া
  submitProposal: async (data) => 
    fetch(`${baseURL}/submit-proposal`, { 
      method: "POST", 
      headers: await getHeaders(), 
      body: JSON.stringify(data) 
    }).then(res => res.json()),


  getMyProposals: async () => 
    fetch(`${baseURL}/my-proposals`, { headers: await getHeaders() }).then(res => res.json()),
};


export const clientAPI = {
  // ১. ক্লায়েন্টের নিজের কাজের ওপর আসা সব প্রপোজাল নিয়ে আসা
  getClientProposals: async () => 
    fetch(`${baseURL}/client-proposals`, { headers: await getHeaders() }).then(res => res.json()),

  // ২. কোনো প্রপোজাল রিজেক্ট করা
  rejectProposal: async (id) => 
    fetch(`${baseURL}/proposals/reject/${id}`, { 
      method: "PATCH", 
      headers: await getHeaders() 
    }).then(res => res.json()),
};