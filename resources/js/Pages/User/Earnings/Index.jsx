import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import Pagination from "@/Components/Pagination";
import { CircleDollarSign, HandCoins } from "lucide-react";
import { Head } from "@inertiajs/react";

export default function Earnings({ earnings, stats }) {
    const statCards = [
        {
            title: "Total Earning",
            duration: "Lifetime",
            amount: `$${stats.totalEarning}`,
            icon: (
                <CircleDollarSign
                    size={24}
                    className="text-[#2D6A4F] dark:text-emerald-400"
                />
            ),
            bgColor: "bg-[#E7EEEC] dark:bg-emerald-500/10",
        },
        {
            title: "Total Withdrawn",
            duration: "Lifetime",
            amount: `$${stats.totalWithdrawn}`,
            icon: (
                <HandCoins
                    size={24}
                    className="text-[#2D6A4F] dark:text-emerald-400"
                />
            ),
            bgColor: "bg-[#E7EEEC] dark:bg-emerald-500/10",
        },
    ];

    return (
        <UserLayout>
            <Head title="Earnings" />
            <div className="space-y-10 font-sans text-[#1A1A1A] dark:text-gray-100 transition-colors duration-300">
                {/* 1. STATS CARDS SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-gray-900 p-6 rounded-[24px] shadow-sm border border-gray-50 dark:border-gray-800 flex justify-between items-center transition-all duration-300"
                        >
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                    {stat.title}
                                </h4>
                                <p className="text-gray-400 dark:text-gray-500 text-xs mb-4">
                                    {stat.duration}
                                </p>
                                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {stat.amount}
                                </span>
                            </div>
                            <div
                                className={`${stat.bgColor} p-3 rounded-full transition-colors`}
                            >
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 2. LENDER EARNINGS TABLE SECTION */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Lender Earnings
                        </h2>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-[24px] shadow-sm overflow-hidden border border-white dark:border-gray-800 transition-all duration-300">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#F8FAFA] dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-[13px] font-semibold border-b border-gray-100 dark:border-gray-800">
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
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800 text-[13px]">
                                    {earnings.data.length > 0 ? (
                                        earnings.data.map((item, i) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                            >
                                                <td className="px-8 py-4 text-gray-500 dark:text-gray-400">
                                                    {(earnings.current_page -
                                                        1) *
                                                        earnings.per_page +
                                                        i +
                                                        1}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="w-12 h-8 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden flex-shrink-0">
                                                        {item.image ? (
                                                            <img
                                                                src={`/storage/${item.image}`}
                                                                alt={item.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-[#1B3D2F]"></div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                                                    {item.name}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                    {item.transactionId}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                    {item.rentPeriod}
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                                    ${item.rentalPrice}
                                                </td>
                                                <td className="px-6 py-4 text-red-400 dark:text-red-400/80">
                                                    -${item.commission}
                                                </td>
                                                <td className="px-6 py-4 font-bold text-gray-800 dark:text-emerald-400">
                                                    ${item.earning}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button className="text-[#437C61] dark:text-emerald-500 underline text-xs font-bold hover:text-[#2D6A4F] dark:hover:text-emerald-400 transition-colors">
                                                        Check Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="9"
                                                className="text-center py-10 text-gray-400 dark:text-gray-600"
                                            >
                                                No earnings record found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="p-4  dark:border-gray-800 bg-white dark:bg-gray-900">
                                <Pagination meta={earnings} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </UserLayout>
    );
}
