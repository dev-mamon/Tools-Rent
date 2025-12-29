import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import {
    MapPin,
    Star,
    History,
    DollarSign,
    Percent,
    ArrowLeft,
} from "lucide-react";

export default function DetailsListing() {
    // Mock data based on the provided images
    const tool = {
        name: "Professional Power Drill XL2000",
        category: "Gardening tool",
        description:
            "Industrial-grade power drill with variable speed control and hammer function. Perfect for professional construction work. Includes carrying case and complete set of drill bits.",
        location: "Seattle, WA",
        status: "Available for rent",
        dailyRent: "$32.00",
        ratings: "4.8",
        condition: "Good",
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400",
    };

    const stats = {
        rentingPeriod: "124 days",
        grossEarnings: "$4,445.00",
        platformFee: "-$667.00",
        netEarnings: "$3,778.00",
        platformCommission: "$665",
        commissionRate: "15%",
        totalRental: "47",
    };

    const rentHistory = Array(5).fill({
        renterName: "John Smith",
        transactionId: "#0239002589",
        rentPeriod: "19.05.25-22.05.25",
        rentedQty: "02",
        totalDay: "4 days",
        pricePerDay: "$65.00",
        commission: "$6.50",
        status: "Completed",
    });

    return (
        <UserLayout>
            <div className="space-y-8 font-sans text-[#1A1A1A] pb-10">
                {/* 1. HEADER & ACTIONS */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Tool Details
                    </h2>
                    <button className="border border-[#2D6A4F] text-[#2D6A4F] px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#E7EEEC] transition-colors">
                        Edit list tool
                    </button>
                </div>

                {/* 2. MAIN TOOL INFO */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Tool Image */}
                    <div className="lg:col-span-1 bg-white p-4 rounded-[24px] shadow-sm flex justify-center items-center h-80">
                        <img
                            src={tool.image}
                            alt={tool.name}
                            className="max-h-full object-contain"
                        />
                    </div>

                    {/* Tool Textual Info */}
                    <div className="lg:col-span-2 space-y-4">
                        <h1 className="text-3xl font-bold">{tool.name}</h1>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                            {tool.description}
                        </p>

                        <div className="space-y-3 pt-2">
                            <span className="block text-gray-500 font-medium">
                                {tool.category}
                            </span>
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin size={18} className="text-[#2D6A4F]" />
                                <span>{tool.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#2D6A4F] font-semibold">
                                <div className="bg-[#2D6A4F] rounded-full p-1">
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="3"
                                    >
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span>{tool.status}</span>
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            <div className="bg-[#E7EEEC] p-4 rounded-2xl">
                                <p className="text-xs font-bold text-gray-700">
                                    Daily Rent
                                </p>
                                <p className="text-lg font-black text-[#1A1A1A]">
                                    {tool.dailyRent}
                                </p>
                            </div>
                            <div className="bg-[#E7EEEC] p-4 rounded-2xl">
                                <p className="text-xs font-bold text-gray-700">
                                    Ratings {tool.ratings}
                                </p>
                                <div className="flex gap-0.5 text-yellow-500">
                                    {[1, 2, 3, 4].map((s) => (
                                        <Star
                                            key={s}
                                            size={14}
                                            fill="currentColor"
                                        />
                                    ))}
                                    <Star
                                        size={14}
                                        className="text-gray-300"
                                        fill="currentColor"
                                    />
                                </div>
                            </div>
                            <div className="bg-[#E7EEEC] p-4 rounded-2xl">
                                <p className="text-xs font-bold text-gray-700">
                                    Condition
                                </p>
                                <p className="text-lg font-black text-[#1A1A1A]">
                                    {tool.condition}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. FINANCIAL OVERVIEW CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Renting Period */}
                    <div className="border border-green-100 rounded-[24px] p-8 bg-white space-y-12">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#E7EEEC] rounded-lg">
                                <History className="text-[#2D6A4F]" />
                            </div>
                            <h3 className="text-xl font-bold">
                                Total Renting Period
                            </h3>
                        </div>
                        <p className="text-4xl font-bold text-[#2D6A4F]">
                            {stats.rentingPeriod}
                        </p>
                    </div>

                    {/* Total Revenue */}
                    <div className="border border-green-100 rounded-[24px] p-8 bg-white">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#E7EEEC] rounded-lg">
                                <DollarSign className="text-[#2D6A4F]" />
                            </div>
                            <h3 className="text-xl font-bold">Total Revenue</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">
                                    Gross Earnings
                                </span>
                                <span className="font-bold">
                                    {stats.grossEarnings}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">
                                    Platform Fee
                                </span>
                                <span className="font-bold text-red-400">
                                    {stats.platformFee}
                                </span>
                            </div>
                            <hr className="border-gray-100" />
                            <div className="flex justify-between text-sm pt-2">
                                <span className="text-gray-400">
                                    Net Earnings
                                </span>
                                <span className="font-bold text-lg">
                                    {stats.netEarnings}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Platform Commission */}
                    <div className="border border-green-100 rounded-[24px] p-8 bg-white">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-[#E7EEEC] rounded-lg">
                                <Percent className="text-[#2D6A4F]" />
                            </div>
                            <h3 className="text-xl font-bold">
                                Platform Commission
                            </h3>
                        </div>
                        <p className="text-4xl font-bold mb-6">
                            {stats.platformCommission}
                        </p>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">
                                    Commission rate
                                </span>
                                <span className="font-bold">
                                    {stats.commissionRate}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">
                                    Total rental
                                </span>
                                <span className="font-bold">
                                    {stats.totalRental}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. RECENT RENT HISTORY */}
                <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6">
                        <h3 className="text-lg font-bold">
                            Recent rent history
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#F8FAFA] text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-gray-50">
                                <tr>
                                    <th className="px-6 py-4">No</th>
                                    <th className="px-6 py-4">Renter Name</th>
                                    <th className="px-6 py-4">
                                        Transaction Id
                                    </th>
                                    <th className="px-6 py-4">Rent Period</th>
                                    <th className="px-6 py-4">Rented QTY.</th>
                                    <th className="px-6 py-4">Total day</th>
                                    <th className="px-6 py-4">Price/day</th>
                                    <th className="px-6 py-4">Commission</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-[13px] divide-y divide-gray-50">
                                {rentHistory.map((row, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-gray-400">
                                            {i + 1}
                                        </td>
                                        <td className="px-6 py-4 font-semibold underline cursor-pointer">
                                            {row.renterName}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {row.transactionId}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {row.rentPeriod}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {row.rentedQty}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 font-medium">
                                            {row.totalDay}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 font-bold">
                                            {row.pricePerDay}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 font-bold">
                                            {row.commission}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${
                                                    row.status === "Requested"
                                                        ? "bg-[#FFF9E5] text-[#D4A017]"
                                                        : "bg-[#E7F3ED] text-[#2D6A4F]"
                                                }`}
                                            >
                                                {row.status}
                                            </span>
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
