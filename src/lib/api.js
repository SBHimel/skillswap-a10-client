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