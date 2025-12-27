import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import {
    Box,
    RefreshCcw,
    CircleDollarSign,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function Dashboard() {
    const stats = [
        {
            label: "Total Listing",
            value: "120",
            icon: <Box className="w-5 h-5 text-[#2D5A43]" />,
        },
        {
            label: "Total Renting",
            value: "80",
            icon: <RefreshCcw className="w-5 h-5 text-[#2D5A43]" />,
        },
        {
            label: "Total Earning",
            value: "$240",
            icon: <CircleDollarSign className="w-5 h-5 text-[#2D5A43]" />,
        },
    ];

    return (
        <div className="min-h-screen  space-y-10 font-sans text-[#1A1A1A]">
            {/* 1. TOP STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white p-8 rounded-[24px] flex justify-between items-start shadow-sm border border-white"
                    >
                        <div>
                            <p className="text-[#1A1A1A] font-bold text-lg">
                                {stat.label}
                            </p>
                            <p className="text-gray-400 text-xs mt-1 font-medium">
                                Last 6 month
                            </p>
                            <p className="text-4xl font-bold mt-6">
                                {stat.value}
                            </p>
                        </div>
                        <div className="bg-[#E9F2EE] p-3 rounded-[12px]">
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* 2. RECENT ACTIVITY SECTION */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                <div className="bg-white rounded-[24px] shadow-sm overflow-hidden border border-white">
                    <div className="p-8 pb-4">
                        <h3 className="text-lg font-bold">Tools Listing</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#F8FAFA] text-gray-600 text-[13px] font-semibold border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-4">No</th>
                                    <th className="px-6 py-4">Image</th>
                                    <th className="px-6 py-4">Tool Name</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Price/day</th>
                                    <th className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-[13px]">
                                {[
                                    {
                                        status: "Open for rent",
                                        color: "bg-[#A7C4B5] text-white",
                                    },
                                    {
                                        status: "Pending",
                                        color: "bg-[#FFE79B] text-[#8B6E1E]",
                                    },
                                    {
                                        status: "Rejected",
                                        color: "bg-[#E99A88] text-white",
                                    },
                                    {
                                        status: "Open for rent",
                                        color: "bg-[#A7C4B5] text-white",
                                    },
                                    {
                                        status: "Rented",
                                        color: "bg-[#E2E8F0] text-gray-500",
                                    },
                                ].map((item, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="px-8 py-4 text-gray-500">
                                            {i + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-10 h-8 bg-[#1B3D2F] rounded-md overflow-hidden"></div>
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            Gardening tools
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            Gardening Tool
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            New York
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-4 py-1.5 rounded-full text-[11px] font-semibold ${item.color}`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-700">
                                            $20.00
                                        </td>
                                        <td className="px-6 py-4 text-[#437C61] underline text-xs font-bold cursor-pointer">
                                            Check Details
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <PaginationFooter />
                </div>
            </section>

            {/* 3. RECENT RENT SECTION */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Recent Rent</h2>
                <div className="bg-white rounded-[24px] shadow-sm overflow-hidden border border-white">
                    <div className="p-8 pb-4">
                        <h3 className="text-lg font-bold">Rent list</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#F8FAFA] text-gray-600 text-[13px] font-semibold border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-4">No</th>
                                    <th className="px-6 py-4">Image</th>
                                    <th className="px-6 py-4">Tool Name</th>
                                    <th className="px-6 py-4">Lender Name</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Rent Period</th>
                                    <th className="px-6 py-4">Remain day</th>
                                    <th className="px-6 py-4">Quantity</th>
                                    <th className="px-6 py-4">Price/day</th>
                                    <th className="px-6 py-4 text-center">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-[13px]">
                                {[
                                    {
                                        status: "Ongoing",
                                        color: "bg-[#A7C4B5] text-white",
                                        remain: "3 days",
                                        remainColor: "text-red-500",
                                    },
                                    {
                                        status: "Requested",
                                        color: "bg-[#FFE79B] text-[#8B6E1E]",
                                        remain: "4 days",
                                        remainColor: "text-gray-500",
                                    },
                                    {
                                        status: "Write a review",
                                        color: "bg-[#E2E8F0] text-gray-600",
                                        remain: "0 days",
                                        remainColor: "text-gray-500",
                                    },
                                    {
                                        status: "Write a review",
                                        color: "bg-[#E2E8F0] text-gray-600",
                                        remain: "0 days",
                                        remainColor: "text-gray-500",
                                    },
                                    {
                                        status: "Write a review",
                                        color: "bg-[#E2E8F0] text-gray-600",
                                        remain: "0 days",
                                        remainColor: "text-gray-500",
                                    },
                                ].map((item, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="px-8 py-5 text-gray-500">
                                            1
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="w-10 h-8 bg-[#1B3D2F] rounded-md"></div>
                                        </td>
                                        <td className="px-6 py-5 font-medium">
                                            Gardening tools
                                        </td>
                                        <td className="px-6 py-5 text-gray-500">
                                            John Smith
                                        </td>
                                        <td className="px-6 py-5 text-gray-500">
                                            New York
                                        </td>
                                        <td className="px-6 py-5 text-gray-500">
                                            19.05.25-22.05.25
                                        </td>
                                        <td
                                            className={`px-6 py-5 font-medium ${item.remainColor}`}
                                        >
                                            {item.remain}
                                        </td>
                                        <td className="px-6 py-5 text-gray-500">
                                            05
                                        </td>
                                        <td className="px-6 py-5 font-bold text-gray-700">
                                            $65.00
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <button
                                                className={`px-4 py-1.5 rounded-full text-[11px] font-semibold min-w-[100px] ${item.color}`}
                                            >
                                                {item.status}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <PaginationFooter />
                </div>
            </section>
        </div>
    );
}

function PaginationFooter() {
    return (
        <div className="p-6 flex items-center justify-between text-[11px] text-gray-400 font-medium">
            <div className="flex items-center gap-2">
                <span>Rows per page:</span>
                <div className="flex items-center gap-1 border border-gray-200 px-2 py-1 rounded-md cursor-pointer">
                    <span className="text-gray-700">05</span>
                    <ChevronRight size={12} className="rotate-90" />
                </div>
                <span className="ml-4">1-4 of 4</span>
            </div>
            <div className="flex gap-2">
                <button className="p-1 border border-gray-100 rounded bg-white text-gray-300 cursor-not-allowed">
                    <ChevronLeft size={16} />
                </button>
                <button className="w-6 h-6 flex items-center justify-center rounded bg-[#437C61] text-white">
                    1
                </button>
                <button className="p-1 border border-gray-100 rounded bg-white text-gray-300">
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <UserLayout>{page}</UserLayout>;
