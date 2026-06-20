"use server"

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const subscription = async(data)=>{
    const res = await fetch(`${baseURL}/subscription`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const resData = await res.json();
    return resData;
};