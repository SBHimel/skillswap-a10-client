"use client";

import React, { useEffect, useState } from "react";
import { CreditCard, ArrowRight, DollarSign, Calendar } from "lucide-react";
import { adminAPI } from "@/lib/api";

export default function TransactionsPage() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                setLoading(true);
                const data = await adminAPI.getTransactions();
                setPayments(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Transactions load করতে সমস্যা:", error);
            } finally {
                setLoading(false);
            }
        };
        loadTransactions();
    }, []);

    return (
        <div className="space-y-6 px-2 sm:px-4">
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center gap-2">
                <CreditCard className="size-5 text-indigo-500" />
                <div>
                    <h2 className="text-xl font-black text-zinc-900 dark:text-white">Escrow Transactions</h2>
                    <p className="text-xs text-zinc-400 mt-0.5">Global history of all processing Stripe milestones.</p>
                </div>
            </div>

            {loading ? (
                <p className="text-center text-zinc-400 py-10 text-sm">Loading transactions...</p>
            ) : payments.length === 0 ? (
                <p className="text-center text-zinc-400 py-10 text-sm">No transactions found.</p>
            ) : (
                <>
                    {/* 📱 মোবাইল এবং ট্যাবলেট গ্রিড ভিউ */}
                    <div className="block lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {payments.map((tx) => (
                            <div key={tx._id} className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-3">
                                <div className="flex flex-col gap-1 text-xs">
                                    <span className="text-[10px] text-zinc-400 font-bold uppercase">Client → Freelancer</span>
                                    <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-medium truncate">
                                        <span className="truncate">{tx.clientEmail || "N/A"}</span>
                                        <ArrowRight className="size-3 text-zinc-400 shrink-0" />
                                        <span className="truncate">{tx.freelancerName || "N/A"}</span>
                                    </div>
                                </div>
                                <div className="h-px bg-zinc-100 dark:bg-zinc-800/60" />
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex items-center gap-1">
                                        <DollarSign className="size-3.5 text-zinc-400" />
                                        <div className="flex flex-col">
                                            <span className="text-[9px] text-zinc-400 uppercase">Payout</span>
                                            <span className="text-xs font-bold text-zinc-900 dark:text-white">${tx.amount}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="size-3.5 text-zinc-400" />
                                        <div className="flex flex-col">
                                            <span className="text-[9px] text-zinc-400 uppercase">Date</span>
                                            <span className="text-xs font-medium text-zinc-500">
                                                {tx.paidAt ? new Date(tx.paidAt).toLocaleDateString() : "Invalid Date"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    Success
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* 🖥️ ডেক্সটপ ভিউ */}
                    <div className="hidden lg:block bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
                        <table className="w-full text-left text-sm table-fixed">
                            <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-800">
                                <tr>
                                    <th className="px-6 py-4 font-bold w-[30%]">Client Email</th>
                                    <th className="px-6 py-4 font-bold w-[25%]">Freelancer Profile</th>
                                    <th className="px-6 py-4 font-bold w-[15%]">Payout Size</th>
                                    <th className="px-6 py-4 font-bold w-[18%]">Payment Date</th>
                                    <th className="px-6 py-4 font-bold w-[12%]">Status</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                                {payments.map((tx) => (
                                    <tr key={tx._id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition-colors">
                                        <td className="px-6 py-4 text-zinc-900 dark:text-zinc-100 truncate">{tx.clientEmail || "N/A"}</td>
                                        <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 truncate">{tx.
freelancerEmail || "N/A"}</td>
                                        <td className="px-6 py-4 font-bold text-zinc-900 dark:text-white">${tx.amount}</td>
                                        <td className="px-6 py-4 text-zinc-500 text-xs">
                                            {tx.paidAt ? new Date(tx.paidAt).toLocaleDateString() : "Invalid Date"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                Success
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}