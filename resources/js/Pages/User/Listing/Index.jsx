import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import Pagination from "@/Components/Pagination";
import { Package, CheckCircle, Clock } from "lucide-react";
import { Link, Head } from "@inertiajs/react";

export default function IndexListing({
    tools,
    totalCount,
    activeRentals,
    pendingApprovals,
}) {
    const stats = [
        {
            label: "Total Listings",
            value: totalCount || "0",
            icon: (
                <Package
                    size={24}
                    className="text-[#2D6A4F] dark:text-emerald-400"
                />
            ),
            bgColor: "bg-[#E9F2EE] dark:bg-emerald-500/10",
        },
        {
            label: "Active Rentals",
            value: activeRentals || "0",
            icon: (
                <CheckCircle
                    size={24}
                    className="text-[#2D6A4F] dark:text-emerald-400"
                />
            ),
            bgColor: "bg-[#E9F2EE] dark:bg-emerald-500/10",
        },
        {
            label: "Pending Approvals",
            value: pendingApprovals || "0",
            icon: (
                <Clock
                    size={24}
                    className="text-[#2D6A4F] dark:text-emerald-400"
                />
            ),
            bgColor: "bg-[#E9F2EE] dark:bg-emerald-500/10",
        },
    ];

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return "bg-[#A7C4B5] dark:bg-emerald-600/20 text-white dark:text-emerald-400";
            case "pending":
                return "bg-[#FFE79B] dark:bg-yellow-500/20 text-[#8B6E1E] dark:text-yellow-400";
            case "rejected":
                return "bg-[#E99A88] dark:bg-red-500/20 text-white dark:text-red-400";
            default:
                return "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400";
        }
    };

    return (
        <UserLayout>
            <Head title="My Listings" />
            <div className="space-y-10 font-sans text-[#1A1A1A] dark:text-gray-100 transition-colors duration-300">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-900 p-8 rounded-[24px] flex justify-between items-start shadow-sm border border-white dark:border-gray-800 transition-all duration-300"
                        >
                            <div>
                                <p className="text-[#1A1A1A] dark:text-gray-100 font-bold text-lg">
                                    {stat.label}
                                </p>
                                <p className="text-gray-400 dark:text-gray-500 text-xs mt-1 font-medium">
                                    Lifetime
                                </p>
                                <p className="text-4xl font-bold mt-6 text-gray-900 dark:text-white">
                                    {stat.value}
                                </p>
                            </div>
                            <div
                                className={`${stat.bgColor} p-3 rounded-[12px] transition-colors`}
                            >
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Table Section */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Recent Activity
                        </h2>
                        <Link href={route("user.my-listings.create")}>
                            <button className="bg-[#2D6A4F] dark:bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#1B3D2F] dark:hover:bg-emerald-700 transition-all">
                                + Add New Tool
                            </button>
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-[24px] shadow-sm overflow-hidden border border-white dark:border-gray-800 transition-all duration-300">
                        <div className="p-8 pb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                Tools Listing
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#F8FAFA] dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-[13px] font-semibold border-b border-gray-100 dark:border-gray-800">
                                    <tr>
                                        <th className="px-8 py-4">No</th>
                                        <th className="px-6 py-4">Image</th>
                                        <th className="px-6 py-4">Tool Name</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Price/day</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800 text-[13px]">
                                    {tools.data.length > 0 ? (
                                        tools.data.map((tool, i) => (
                                            <tr
                                                key={tool.id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                            >
                                                <td className="px-8 py-4 text-gray-500 dark:text-gray-400">
                                                    {(tools.current_page - 1) *
                                                        tools.per_page +
                                                        i +
                                                        1}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="w-10 h-8 bg-gray-200 dark:bg-gray-800 rounded-md overflow-hidden border dark:border-gray-700">
                                                        {tool.image_url ? (
                                                            <img
                                                                src={`/storage/${tool.image_url}`}
                                                                className="w-full h-full object-cover"
                                                                alt={tool.name}
                                                                onError={(
                                                                    e
                                                                ) => {
                                                                    e.target.src =
                                                                        "https://via.placeholder.com/150";
                                                                }}
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-[#1B3D2F]"></div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200">
                                                    {tool.name}
                                                </td>
                                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                                    {tool.category}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-4 py-1.5 rounded-full text-[11px] font-semibold capitalize ${getStatusStyle(
                                                            tool.status
                                                        )}`}
                                                    >
                                                        {tool.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-bold text-gray-700 dark:text-emerald-400">
                                                    ${tool.price_per_day}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link
                                                        href={route(
                                                            "user.my-listings.details",
                                                            tool.id
                                                        )}
                                                        className="text-[#437C61] dark:text-emerald-500 underline text-xs font-bold hover:text-[#2D6A4F] dark:hover:text-emerald-400 transition-colors"
                                                    >
                                                        Check Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="text-center py-10 text-gray-400 dark:text-gray-600 font-medium"
                                            >
                                                No tools found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div className="p-4  dark:border-gray-800">
                                <Pagination meta={tools} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </UserLayout>
    );
}
