"use client";
import { useEffect, useState } from "react";
import { freelancerAPI } from "@/lib/api";

export default function EarningsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    freelancerAPI.getEarnings().then(res => setData(res));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Earnings</h1>
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Task Title</th>
            <th className="text-left p-3">Budget</th>
            <th className="text-left p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="p-3">{item.taskTitle}</td>
              <td className="p-3">${item.budget}</td>
              <td className="p-3 text-green-600 font-bold">Completed</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}