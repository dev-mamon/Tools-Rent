import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import Pagination from "@/Components/Pagination";
import { CircleDollarSign, HandCoins } from "lucide-react";

export default function Earnings() {
    // Summary data for cards
    const stats = [
        {
            title: "Total Earning",
            duration: "Last 6 month",
            amount: "$240",
            icon: <CircleDollarSign size={24} className="text-[#2D6A4F]" />,
            bgColor: "bg-[#E7EEEC]",
        },
        {
            title: "Total Withdrawn",
            duration: "Last month",
            amount: "$80",
            icon: <HandCoins size={24} className="text-[#2D6A4F]" />,
            bgColor: "bg-[#E7EEEC]",
        },
    ];

    // Updated Table Data based on the image
    const tableItems = Array(5).fill({
        name: "Gardening tools",
        transactionId: "#1234599900",
        rentPeriod: "19.05.25-22.05.25",
        rentalPrice: "$65.00",
        commission: "10%",
        earning: "$58.50",
        image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=100", // Placeholder
    });

    return (
        <UserLayout>
            <div className="space-y-10 font-sans text-[#1A1A1A]">
                {/* 1. STATS CARDS SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 flex justify-between items-center"
                        >
                            <div>
                                <h4 className="text-lg font-bold">
                                    {stat.title}
                                </h4>
                                <p className="text-gray-400 text-xs mb-4">
                                    {stat.duration}
                                </p>
                                <span className="text-3xl font-bold">
                                    {stat.amount}
                                </span>
                            </div>
                            <div className={`${stat.bgColor} p-3 rounded-full`}>
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 2. LENDER EARNINGS TABLE SECTION */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Lender Earnings</h2>
                    </div>

                    <div className="bg-white rounded-[24px] shadow-sm overflow-hidden border border-white">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#F8FAFA] text-gray-600 text-[13px] font-semibold border-b border-gray-100">
                                    <tr>
                                        <th className="px-8 py-5">No</th>
                                        <th className="px-6 py-5">Image</th>
                                        <th className="px-6 py-5">Tool Name</th>
                                        <th className="px-6 py-5">
                                            Transaction ID
                                        </th>
                                        <th className="px-6 py-5">
                                            Rent Period
                                        </th>
                                        <th className="px-6 py-5">
                                            Rental Price
                                        </th>
                                        <th className="px-6 py-5">
                                            Commission
                                        </th>
                                        <th className="px-6 py-5">Earning</th>
                                        <th className="px-6 py-5">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 text-[13px]">
                                    {tableItems.map((item, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-8 py-4 text-gray-500">
                                                {i + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-12 h-8 object-cover rounded-md"
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-medium">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {item.transactionId}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {item.rentPeriod}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-700">
                                                {item.rentalPrice}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {item.commission}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-800">
                                                {item.earning}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="text-[#437C61] underline text-xs font-bold hover:text-[#2D6A4F]">
                                                    Check Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination
                                totalRows={tableItems.length}
                                rowsPerPage={5}
                                currentPage={1}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </UserLayout>
    );
}
