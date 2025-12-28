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
            icon: <Package size={24} className="text-[#2D6A4F]" />,
        },
        {
            label: "Active Rentals",
            value: activeRentals || "0",
            icon: <CheckCircle size={24} className="text-[#2D6A4F]" />,
        },
        {
            label: "Pending Approvals",
            value: pendingApprovals || "0",
            icon: <Clock size={24} className="text-[#2D6A4F]" />,
        },
    ];

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return "bg-[#A7C4B5] text-white";
            case "pending":
                return "bg-[#FFE79B] text-[#8B6E1E]";
            case "rejected":
                return "bg-[#E99A88] text-white";
            default:
                return "bg-gray-100 text-gray-500";
        }
    };

    return (
        <UserLayout>
            <Head title="My Listings" />
            <div className="space-y-10 font-sans text-[#1A1A1A]">
                {/* Stats Cards */}
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
                                    Lifetime
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

                {/* Main Table Section */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Recent Activity</h2>
                        <Link href={route("user.my-listings.create")}>
                            <button className="bg-[#2D6A4F] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#1B3D2F]">
                                + Add New Tool
                            </button>
                        </Link>
                    </div>

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
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Price/day</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 text-[13px]">
                                    {tools.data.length > 0 ? (
                                        tools.data.map((tool, i) => (
                                            <tr
                                                key={tool.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-8 py-4 text-gray-500">
                                                    {(tools.current_page - 1) *
                                                        tools.per_page +
                                                        i +
                                                        1}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="w-10 h-8 bg-gray-200 rounded-md overflow-hidden">
                                                        {tool.thumbnail ? (
                                                            <img
                                                                src={`/storage/${tool.thumbnail.image_path}`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-[#1B3D2F]"></div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-medium">
                                                    {tool.name}
                                                </td>
                                                <td className="px-6 py-4 text-gray-500">
                                                    {tool.category}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-4 py-1.5 rounded-full text-[11px] font-semibold ${getStatusStyle(
                                                            tool.status
                                                        )}`}
                                                    >
                                                        {tool.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-bold text-gray-700">
                                                    ${tool.price_per_day}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link
                                                        href={route(
                                                            "user.my-listings.details",
                                                            tool.id
                                                        )}
                                                        className="text-[#437C61] underline text-xs font-bold"
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
                                                className="text-center py-10 text-gray-400"
                                            >
                                                No tools found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* Correct Pagination Props */}
                            <div className="p-4 border-t border-gray-50">
                                <Pagination meta={tools} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </UserLayout>
    );
}
