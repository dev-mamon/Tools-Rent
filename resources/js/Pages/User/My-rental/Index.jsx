import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import Pagination from "@/Components/Pagination";

export default function MyRentals() {
    const tableItems = [
        {
            name: "Gardening tools",
            category: "Gardening Tool",
            loc: "New York",
            status: "Open for rent",
            color: "bg-[#A7C4B5] text-white",
            price: "$20.00",
        },
        {
            name: "Lawn Mower",
            category: "Power Tool",
            loc: "London",
            status: "Pending",
            color: "bg-[#FFE79B] text-[#8B6E1E]",
            price: "$45.00",
        },
        {
            name: "Shovel Set",
            category: "Hand Tool",
            loc: "Paris",
            status: "Rejected",
            color: "bg-[#E99A88] text-white",
            price: "$10.00",
        },
        {
            name: "Hedge Trimmer",
            category: "Power Tool",
            loc: "Berlin",
            status: "Rented",
            color: "bg-[#E2E8F0] text-gray-500",
            price: "$35.00",
        },
    ];

    return (
        <UserLayout>
            <div className="space-y-10 font-sans text-[#1A1A1A]">
                {/* 1. RECENT ACTIVITY SECTION */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">My Rentals</h2>

                        <button className="bg-[#2D6A4F] text-white px-6 py-2 rounded-lg text-sm font-semibold">
                            + Add New Tool
                        </button>
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
                                        <th className="px-6 py-4">Location</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Price/day</th>
                                        <th className="px-6 py-4">Action</th>
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
                                                <div className="w-10 h-8 bg-[#1B3D2F] rounded-md"></div>
                                            </td>
                                            <td className="px-6 py-4 font-medium">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {item.category}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {item.loc}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-4 py-1.5 rounded-full text-[11px] font-semibold ${item.color}`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-700">
                                                {item.price}
                                            </td>
                                            <td className="px-6 py-4 text-[#437C61] underline text-xs font-bold cursor-pointer">
                                                Check Details
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination
                                totalRows={4}
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
