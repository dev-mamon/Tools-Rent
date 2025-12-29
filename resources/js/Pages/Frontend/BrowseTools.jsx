import React, { useState, useMemo, useEffect } from "react";
import { Star, ChevronDown, Filter, MapPin, Calendar, X } from "lucide-react";
import GuestLayout from "@/Layouts/GuestLayout";
import Navbar from "@/Components/Frontend/Navbar";

import { Link, router, usePage, Head } from "@inertiajs/react";

const BrowseTools = ({
    tools,
    staticCategories,
    filters = {},
    maxDatabasePrice,
}) => {
    // State Initialization with Optional Chaining and Dynamic Max
    const [priceRange, setPriceRange] = useState(
        filters?.max_price || maxDatabasePrice
    );
    const [selectedCategories, setSelectedCategories] = useState(
        filters?.categories ? filters.categories.split(",") : []
    );
    const [sortOpen, setSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState(
        filters?.sort || "recommended"
    );
    const [deliveryType, setDeliveryType] = useState(
        filters?.delivery_type || "any"
    );
    const [availableDate, setAvailableDate] = useState(
        filters?.available_date || ""
    );

    const { url } = usePage();

    const sortOptions = [
        { value: "recommended", label: "Recommended" },
        { value: "price_low", label: "Price: Low to High" },
        { value: "price_high", label: "Price: High to Low" },
        { value: "rating", label: "Rating: High to Low" },
        { value: "distance", label: "Distance: Nearest First" },
    ];

    const deliveryOptions = [
        { value: "any", label: "Any" },
        { value: "delivery_only", label: "Delivery Only" },
        { value: "pickup_only", label: "Pickup Only" },
    ];

    const applyFilters = (newFilters) => {
        router.get(
            url.split("?")[0],
            { ...filters, ...newFilters, page: 1 },
            { preserveState: true, replace: true, preserveScroll: true }
        );
    };

    const handleCategoryToggle = (category) => {
        const newCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];

        setSelectedCategories(newCategories);
        applyFilters({
            categories: newCategories.length ? newCategories.join(",") : null,
        });
    };

    const handlePriceChange = (value) => {
        setPriceRange(value);
        applyFilters({ max_price: value });
    };

    const handleSortSelect = (value) => {
        setSelectedSort(value);
        setSortOpen(false);
        applyFilters({ sort: value });
    };

    const handleDeliveryChange = (e) => {
        const value = e.target.value;
        setDeliveryType(value);
        applyFilters({ delivery_type: value !== "any" ? value : null });
    };

    const handleDateChange = (e) => {
        const value = e.target.value;
        setAvailableDate(value);
        applyFilters({ available_date: value || null });
    };

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setPriceRange(maxDatabasePrice);
        setSelectedSort("recommended");
        setDeliveryType("any");
        setAvailableDate("");
        router.get(
            url.split("?")[0],
            {},
            { preserveState: true, preserveScroll: true }
        );
    };

    const getToolRating = (tool) => {
        if (tool.reviews_avg_rating)
            return parseFloat(tool.reviews_avg_rating).toFixed(1);
        return tool.rating || 4.2;
    };

    return (
        <GuestLayout>
            <Head title="Browse Tools | Rent Your Tools Online" />
            <Navbar />
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Stats & Sort */}
                    <div className="mb-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-3xl font-light text-gray-900">
                                    Premium Tools Collection
                                </h1>
                                <p className="text-gray-500 mt-2">
                                    {tools?.total || 0} tools available in your
                                    area
                                </p>
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setSortOpen(!sortOpen)}
                                    className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm"
                                >
                                    <Filter size={16} /> Sort & Filter{" "}
                                    <ChevronDown
                                        size={16}
                                        className={sortOpen ? "rotate-180" : ""}
                                    />
                                </button>
                                {sortOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50 py-2">
                                        {sortOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                className={`w-full text-left px-4 py-2 text-sm ${
                                                    selectedSort === opt.value
                                                        ? "bg-gray-50 font-bold"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handleSortSelect(opt.value)
                                                }
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Clear Filters Button (shown only if filters exist) */}
                        {Object.keys(filters).length > 0 && (
                            <button
                                onClick={clearAllFilters}
                                className="text-sm text-red-600 hover:underline mb-4"
                            >
                                Clear All Filters
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar Filters */}
                        <aside className="lg:col-span-1 space-y-8">
                            {/* DYNAMIC PRICE RANGE */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-medium text-gray-900 mb-4">
                                    Price Range{" "}
                                    <span className="text-xs text-gray-400">
                                        / day
                                    </span>
                                </h3>
                                <div className="space-y-4">
                                    <input
                                        type="range"
                                        min="0"
                                        max={maxDatabasePrice}
                                        value={priceRange}
                                        onChange={(e) =>
                                            handlePriceChange(e.target.value)
                                        }
                                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-800"
                                    />
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>$0</span>
                                        <span className="font-bold text-gray-900">
                                            ${priceRange}
                                        </span>
                                        <span>${maxDatabasePrice}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-medium text-gray-900 mb-4">
                                    Categories
                                </h3>
                                <div className="space-y-3">
                                    {staticCategories.map((cat, i) => (
                                        <label
                                            key={i}
                                            className="flex items-center justify-between cursor-pointer group"
                                        >
                                            <span className="text-gray-700 text-sm">
                                                {cat}
                                            </span>
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(
                                                    cat
                                                )}
                                                onChange={() =>
                                                    handleCategoryToggle(cat)
                                                }
                                                className="w-4 h-4 rounded border-gray-300 text-gray-800 focus:ring-0"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Additional Filters */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                                        Delivery Type
                                    </label>
                                    <select
                                        value={deliveryType}
                                        onChange={handleDeliveryChange}
                                        className="w-full border-gray-300 rounded-lg text-sm"
                                    >
                                        {deliveryOptions.map((opt) => (
                                            <option
                                                key={opt.value}
                                                value={opt.value}
                                            >
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                                        Availability Date
                                    </label>
                                    <input
                                        type="date"
                                        value={availableDate}
                                        onChange={handleDateChange}
                                        min={
                                            new Date()
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                        className="w-full border-gray-300 rounded-lg text-sm"
                                    />
                                </div>
                            </div>
                        </aside>

                        {/* Main Tools Grid */}
                        <main className="lg:col-span-3">
                            {/* Stats */}
                            <div className="mb-6 text-sm text-gray-600">
                                Showing{" "}
                                <span className="font-bold">
                                    {tools.from || 0}
                                </span>{" "}
                                to{" "}
                                <span className="font-bold">
                                    {tools.to || 0}
                                </span>{" "}
                                of{" "}
                                <span className="font-bold">{tools.total}</span>{" "}
                                tools
                            </div>

                            {/* Tools Grid */}
                            {tools.data.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {tools.data.map((tool) => (
                                            <div
                                                key={tool.id}
                                                className="bg-white rounded-[35px] border border-gray-100 p-3 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                                            >
                                                {/* Image Container */}
                                                <div className="relative h-56 rounded-[28px] overflow-hidden">
                                                    <img
                                                        src={
                                                            tool.first_image_url ||
                                                            "https://images.unsplash.com/photo-1513467655676-561b7d489a88?q=80&w=500&auto=format&fit=crop"
                                                        }
                                                        alt={tool.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />

                                                    {/* Dynamic Badge */}
                                                    {(parseFloat(
                                                        tool.price_per_day
                                                    ) > 70 ||
                                                        tool.featured) && (
                                                        <div className="absolute top-3 right-3 bg-[#3D7A54] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg">
                                                            🏅 Top Rated
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="px-3 py-5 flex flex-col flex-grow">
                                                    {/* Title */}
                                                    <h3 className="text-[20px] font-bold text-[#10513D] mb-2 truncate">
                                                        {tool.name}
                                                    </h3>

                                                    {/* Rating Section */}
                                                    <div className="flex items-center gap-1 mb-1">
                                                        <div className="flex items-center">
                                                            {[...Array(5)].map(
                                                                (_, i) => {
                                                                    const rating =
                                                                        getToolRating(
                                                                            tool
                                                                        );
                                                                    return (
                                                                        <Star
                                                                            key={
                                                                                i
                                                                            }
                                                                            size={
                                                                                16
                                                                            }
                                                                            fill={
                                                                                i <
                                                                                Math.floor(
                                                                                    rating
                                                                                )
                                                                                    ? "#FACC15"
                                                                                    : "none"
                                                                            }
                                                                            className={
                                                                                i <
                                                                                Math.floor(
                                                                                    rating
                                                                                )
                                                                                    ? "text-yellow-400"
                                                                                    : "text-gray-300"
                                                                            }
                                                                        />
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                        <span className="text-gray-400 text-[14px] ml-1 font-medium">
                                                            (
                                                            {tool.reviews_count ||
                                                                16}
                                                            )
                                                        </span>
                                                    </div>

                                                    {/* Location */}
                                                    <p className="text-gray-400 text-[14px] mb-6 font-medium truncate">
                                                        <MapPin
                                                            size={14}
                                                            className="inline mr-1 mb-1"
                                                        />
                                                        {tool.location_address ||
                                                            "Jersey City, NJ"}
                                                    </p>

                                                    {/* Footer: Price and Button */}
                                                    <div className="flex items-center justify-between border-t border-gray-100 pt-5 mt-auto">
                                                        <div className="flex items-baseline gap-1">
                                                            <span className="text-[22px] font-extrabold text-[#10513D]">
                                                                $
                                                                {parseFloat(
                                                                    tool.price_per_day
                                                                ).toFixed(2)}
                                                            </span>
                                                            <span className="text-[#10513D] text-[14px] font-bold">
                                                                / Day
                                                            </span>
                                                        </div>

                                                        <Link
                                                            href={`/tools/${
                                                                tool.slug ||
                                                                tool.id
                                                            }`}
                                                            className="bg-[#3D7A54] hover:bg-[#10513D] text-white text-[13px] font-bold px-5 py-2.5 rounded-full flex items-center gap-2 transition-all"
                                                        >
                                                            Rent Now
                                                            <span className="text-[16px]">
                                                                →
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination Section */}
                                    {tools.links && tools.links.length > 3 && (
                                        <div className="mt-12 flex justify-center">
                                            {/* Add your Pagination component here, e.g.: <Pagination links={tools.links} /> */}
                                        </div>
                                    )}
                                </>
                            ) : (
                                /* Empty State */
                                <div className="text-center py-20 bg-white rounded-[35px] border border-dashed border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        No tools found
                                    </h3>
                                    <p className="text-gray-500">
                                        Try adjusting your filters to find more
                                        tools.
                                    </p>
                                    <button
                                        onClick={clearAllFilters}
                                        className="mt-4 text-[#3D7A54] font-bold hover:underline"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default BrowseTools;
