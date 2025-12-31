import React from "react";
import UserLayout from "@/Layouts/UserLayout";

export default function CommissionPolicy() {
    const policies = [
        { type: "Standard Rental", rate: "10%", fee: "$2.00", min: "$5.00" },
        { type: "Premium Tools", rate: "15%", fee: "$5.00", min: "$20.00" },
    ];

    return (
        <UserLayout>
            <div className="space-y-6 font-sans text-[#1A1A1A] dark:text-gray-100 transition-colors duration-300">
                <h2 className="text-[20px] font-bold text-gray-900 dark:text-white">
                    Commission Policy
                </h2>

                <div className="bg-white dark:bg-gray-900 rounded-[16px] shadow-sm overflow-hidden border border-gray-50 dark:border-gray-800">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#F8FAFA] dark:bg-gray-800/50">
                                <tr className="text-[#1A1A1A] dark:text-gray-200 text-[14px] font-bold border-b border-gray-100 dark:border-gray-800">
                                    <th className="px-8 py-5">Category</th>
                                    <th className="px-6 py-5">
                                        Commission Rate
                                    </th>
                                    <th className="px-6 py-5">
                                        Processing Fee
                                    </th>
                                    <th className="px-6 py-5">
                                        Min. Transaction
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-[13px]">
                                {policies.map((policy, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                                    >
                                        <td className="px-8 py-4 font-medium dark:text-gray-200">
                                            {policy.type}
                                        </td>
                                        <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-bold">
                                            {policy.rate}
                                        </td>
                                        <td className="px-6 py-4 dark:text-gray-400">
                                            {policy.fee}
                                        </td>
                                        <td className="px-6 py-4 dark:text-gray-400">
                                            {policy.min}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
