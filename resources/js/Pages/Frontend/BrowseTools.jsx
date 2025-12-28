import React, { useState } from "react";
import { Star, ChevronDown, ChevronUp, LayoutGrid, List } from "lucide-react";
import GuestLayout from "@/Layouts/GuestLayout";
import Navbar from "@/Components/Frontend/Navbar";
import Header from "@/Components/Frontend/Header";

const BrowseTools = () => {
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [priceRange, setPriceRange] = useState(250);
    const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

    const categories = [
        "Power Tools",
        "Hand Tools",
        "Garden Equipment",
        "Lawn Care",
        "Plumbing",
        "Painting",
        "Outdoor",
        "Measuring",
    ];

    const tools = Array(9).fill({
        name: "Air Compressor",
        price: "45.50",
        rating: 4,
        location: "Jersey City, NJ",
        image: "https://images.unsplash.com/photo-1513467655676-561b7d489a88?q=80&w=500&auto=format&fit=crop",
    });

    return (
        <GuestLayout>
            <Navbar />

            <Header
                title="Browse Tools"
                subtitle="Find the right tools in your neighborhood"
            />

            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12 items-start">
                    {/* LEFT SIDEBAR */}
                    <aside className="space-y-10 sticky top-28">
                        <div>
                            <h4 className="font-bold text-[#10513D] mb-6 text-lg">
                                Daily Rate
                            </h4>
                            <input
                                type="range"
                                min="0"
                                max="500"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#10513D]"
                            />
                            <div className="flex justify-between mt-4">
                                <span className="border border-gray-100 px-4 py-1 rounded-full text-[11px] text-gray-500 font-bold">
                                    $0
                                </span>
                                <span className="border border-gray-100 px-4 py-1 rounded-full text-[11px] text-gray-500 font-bold">
                                    ${priceRange}
                                </span>
                            </div>
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="w-full flex items-center justify-between bg-[#F1F5F3] px-5 py-3.5 rounded-xl font-bold text-[13px] text-gray-700"
                            >
                                Sort By{" "}
                                {isSortOpen ? (
                                    <ChevronUp size={16} />
                                ) : (
                                    <ChevronDown size={16} />
                                )}
                            </button>
                            {isSortOpen && (
                                <div className="absolute w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden">
                                    {[
                                        "Newest",
                                        "Price: Low to High",
                                        "Price: High to Low",
                                    ].map((opt) => (
                                        <div
                                            key={opt}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-600"
                                        >
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-bold text-[#10513D] mb-2 text-lg">
                                Categories
                            </h4>
                            {categories.map((cat, i) => (
                                <label
                                    key={i}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded-full border-gray-300 text-[#10513D] focus:ring-0"
                                    />
                                    <span className="text-[13px] text-gray-500 group-hover:text-[#10513D]">
                                        {cat}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </aside>

                    {/* RIGHT MAIN CONTENT */}
                    <main>
                        {/* Header with View Switcher */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
                            <h2 className="text-2xl font-bold text-[#10513D]">
                                Popular Tools Near You
                            </h2>

                            <div className="flex bg-[#F1F5F3] p-1 rounded-xl w-fit">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-lg transition-all ${
                                        viewMode === "grid"
                                            ? "bg-white shadow-sm text-[#10513D]"
                                            : "text-gray-400"
                                    }`}
                                >
                                    <LayoutGrid size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-lg transition-all ${
                                        viewMode === "list"
                                            ? "bg-white shadow-sm text-[#10513D]"
                                            : "text-gray-400"
                                    }`}
                                >
                                    <List size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Tools Grid/List Logic */}
                        <div
                            className={
                                viewMode === "grid"
                                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                                    : "flex flex-col gap-6"
                            }
                        >
                            {tools.map((tool, idx) => (
                                <div
                                    key={idx}
                                    className={`bg-white border border-gray-100 p-4 shadow-sm hover:shadow-xl transition-all group ${
                                        viewMode === "grid"
                                            ? "rounded-[35px] flex flex-col"
                                            : "rounded-[25px] flex flex-col sm:flex-row items-center gap-6"
                                    }`}
                                >
                                    {/* Image Container */}
                                    <div
                                        className={`relative overflow-hidden shrink-0 ${
                                            viewMode === "grid"
                                                ? "h-48 w-full rounded-[28px] mb-5"
                                                : "h-40 w-full sm:w-52 rounded-[20px]"
                                        }`}
                                    >
                                        <img
                                            src={tool.image}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            alt={tool.name}
                                        />
                                        <div className="absolute top-3 right-3 bg-[#3D7A54] text-white text-[9px] font-bold px-2 py-1 rounded-md">
                                            🏅 Top Rated
                                        </div>
                                    </div>

                                    {/* Details Container */}
                                    <div className="flex-grow w-full">
                                        <div
                                            className={
                                                viewMode === "list"
                                                    ? "flex flex-col md:flex-row md:items-center justify-between gap-4"
                                                    : ""
                                            }
                                        >
                                            <div className="space-y-1">
                                                <h3 className="font-bold text-gray-800 text-base">
                                                    {tool.name}
                                                </h3>
                                                <div className="flex items-center gap-1 text-yellow-400">
                                                    {[...Array(5)].map(
                                                        (_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={14}
                                                                fill={
                                                                    i <
                                                                    tool.rating
                                                                        ? "currentColor"
                                                                        : "none"
                                                                }
                                                                className={
                                                                    i <
                                                                    tool.rating
                                                                        ? ""
                                                                        : "text-gray-200"
                                                                }
                                                            />
                                                        )
                                                    )}
                                                    <span className="text-gray-400 text-[11px] font-bold ml-1">
                                                        (15)
                                                    </span>
                                                </div>
                                                <p className="text-gray-400 text-[11px] font-medium">
                                                    {tool.location}
                                                </p>
                                            </div>

                                            <div
                                                className={`flex items-center justify-between ${
                                                    viewMode === "grid"
                                                        ? "border-t border-gray-50 pt-5 mt-5"
                                                        : "md:flex-col md:items-end gap-4"
                                                }`}
                                            >
                                                <span className="font-extrabold text-[#10513D] text-lg sm:text-base">
                                                    ${tool.price}
                                                    <span className="text-[10px] text-gray-400 font-normal">
                                                        {" "}
                                                        / Day
                                                    </span>
                                                </span>
                                                <button className="bg-[#3D7A54] hover:bg-[#10513D] text-white text-[11px] font-bold px-6 py-2.5 rounded-full transition-colors whitespace-nowrap">
                                                    Rent Now →
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </GuestLayout>
    );
};

export default BrowseTools;
