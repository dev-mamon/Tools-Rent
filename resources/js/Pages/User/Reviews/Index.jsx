import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import Pagination from "@/Components/Pagination";
import { Star } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function LenderReviews() {
    const tableItems = Array(5).fill({
        name: "Gardening tools",
        avgRating: "4.5/5",
        totalReviewers: "52",
        recentReview: '"Great power!"',
        image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=100&h=80&fit=crop",
    });

    return (
        <UserLayout>
            <div className="space-y-6 font-sans text-[#1A1A1A]">
                <h2 className="text-[20px] font-bold">Lender Reviews</h2>

                <div className="bg-white rounded-[16px] shadow-sm overflow-hidden border border-gray-50">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#F8FAFA]">
                                <tr className="text-[#1A1A1A] text-[14px] font-bold border-b border-gray-100">
                                    <th className="px-8 py-5">No</th>
                                    <th className="px-6 py-5">Image</th>
                                    <th className="px-6 py-5">Tool Name</th>
                                    <th className="px-6 py-5 text-center">
                                        Average Rating
                                    </th>
                                    <th className="px-6 py-5 text-center">
                                        Total reviewers
                                    </th>
                                    <th className="px-6 py-5">Recent Review</th>
                                    <th className="px-6 py-5 text-right pr-10">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-[13px]">
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
                                                className="w-12 h-8 object-cover rounded-md"
                                                alt="tool"
                                            />
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            {item.name}
                                        </td>
                                        <td className="px-6 py-4 text-center font-semibold text-gray-700">
                                            {item.avgRating}
                                        </td>
                                        <td className="px-6 py-4 text-center text-gray-600">
                                            {item.totalReviewers}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="italic text-gray-700">
                                                    {item.recentReview}
                                                </span>
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3, 4].map(
                                                        (star) => (
                                                            <Star
                                                                key={star}
                                                                size={14}
                                                                fill="#FFB800"
                                                                stroke="none"
                                                            />
                                                        )
                                                    )}
                                                    <Star
                                                        size={14}
                                                        fill="#D1D5DB"
                                                        stroke="none"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right pr-10">
                                            <Link
                                                href="#"
                                                className="text-[#437C61] underline text-[12px] font-bold hover:text-[#2D6A4F]"
                                            >
                                                See all reviews
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Pagination
                            totalRows={5}
                            rowsPerPage={5}
                            currentPage={1}
                        />
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
