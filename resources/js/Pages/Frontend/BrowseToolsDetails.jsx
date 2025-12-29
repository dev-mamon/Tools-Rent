import React, { useState, useMemo, useEffect } from "react";
import Navbar from "@/Components/Frontend/Navbar";
import GuestLayout from "@/Layouts/GuestLayout";
import { router } from "@inertiajs/react";
import {
    Star,
    MapPin,
    CheckCircle2,
    MessageSquare,
    ChevronRight,
    Minus,
    Plus,
    Settings,
    ChevronLeft,
    User,
    Calendar,
    Shield,
    AlertCircle,
    Clock,
    Play,
} from "lucide-react";
import {
    format,
    differenceInDays,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameDay,
    isSameMonth,
    addMonths,
    subMonths,
    isAfter,
    isBefore,
    parseISO,
    isWithinInterval,
} from "date-fns";
import { Head } from "@inertiajs/react";

const BrowseToolsDetails = ({ tool }) => {
    // --- States ---
    const [selectedImage, setSelectedImage] = useState(0);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("specs");
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // --- Data Mapping ---
    const images =
        tool.images?.length > 0
            ? tool.images.map((img) => `/storage/${img.image_path}`)
            : ["/assets/images/placeholder.jpg"];

    const pricePerDay = parseFloat(tool.price_per_day) || 0;
    const bookingFee = 2.0;

    // Sample reviews data
    const reviews = [
        {
            id: 1,
            user: { name: "Alex Morgan", avatar: null },
            rating: 5,
            date: "2024-03-15",
            comment:
                "Tool was in excellent condition. Very responsive lender. Would rent again!",
            verified: true,
        },
        {
            id: 2,
            user: { name: "Jordan Lee", avatar: null },
            rating: 4,
            date: "2024-03-10",
            comment:
                "Good quality tool, worked perfectly for my project. Delivery was prompt.",
            verified: true,
        },
        {
            id: 3,
            user: { name: "Taylor Kim", avatar: null },
            rating: 5,
            date: "2024-03-05",
            comment:
                "Perfect tool for the job. Saved me from buying an expensive one-time-use tool.",
            verified: false,
        },
        {
            id: 4,
            user: { name: "Casey Smith", avatar: null },
            rating: 5,
            date: "2024-02-28",
            comment:
                "Very professional service. The tool arrived clean and well-maintained.",
            verified: true,
        },
        {
            id: 5,
            user: { name: "Riley Johnson", avatar: null },
            rating: 4,
            date: "2024-02-20",
            comment: "Great experience overall. Would recommend this lender.",
            verified: true,
        },
    ];

    // Parse available dates from backend
    const availableFrom = tool.available_from
        ? parseISO(tool.available_from)
        : null;
    const availableTo = tool.available_to ? parseISO(tool.available_to) : null;

    // Calculate average rating
    const averageRating =
        reviews.length > 0
            ? (
                  reviews.reduce((sum, review) => sum + review.rating, 0) /
                  reviews.length
              ).toFixed(1)
            : "0.0";

    // Rating distribution
    const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
        stars: star,
        count: reviews.filter((r) => r.rating === star).length,
        percentage:
            (reviews.filter((r) => r.rating === star).length / reviews.length) *
                100 || 0,
    }));

    // --- Availability Check based on Selected Dates ---
    const checkAvailabilityForSelectedDates = () => {
        if (!startDate || !endDate) {
            return {
                isAvailable: false,
                message: "Please select start and end dates",
                type: "info",
            };
        }

        // Check if dates are within available range
        if (availableFrom && availableTo) {
            const isWithinAvailableRange =
                isWithinInterval(startDate, {
                    start: availableFrom,
                    end: availableTo,
                }) &&
                isWithinInterval(endDate, {
                    start: availableFrom,
                    end: availableTo,
                });

            if (!isWithinAvailableRange) {
                return {
                    isAvailable: false,
                    message: `Selected dates must be between ${format(
                        availableFrom,
                        "MMM dd"
                    )} - ${format(availableTo, "MMM dd")}`,
                    type: "error",
                };
            }
        }

        // Check if start date is not in past
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isBefore(startDate, today)) {
            return {
                isAvailable: false,
                message: "Start date cannot be in the past",
                type: "error",
            };
        }

        // Check if end date is after start date
        if (!isAfter(endDate, startDate)) {
            return {
                isAvailable: false,
                message: "End date must be after start date",
                type: "error",
            };
        }

        // Check tool status
        if (tool.status !== "active") {
            return {
                isAvailable: false,
                message: "This listing is currently inactive",
                type: "error",
            };
        }

        // Check if tool is available (general availability)
        if (tool.is_available === false) {
            return {
                isAvailable: false,
                message: "This tool is currently out of stock",
                type: "error",
            };
        }

        // All checks passed
        return {
            isAvailable: true,
            message: `Available for ${
                differenceInDays(endDate, startDate) + 1
            } days`,
            type: "success",
        };
    };

    const availabilityStatus = checkAvailabilityForSelectedDates();

    // --- Image Slider Logic ---
    const nextImage = () => {
        setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    // Auto-slide every 5 seconds
    useEffect(() => {
        if (images.length <= 1 || !isAutoPlaying) return;
        const interval = setInterval(() => {
            nextImage();
        }, 5000);
        return () => clearInterval(interval);
    }, [selectedImage, images.length, isAutoPlaying]);

    // --- Date Selection Logic ---
    const handleDateClick = (day) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Prevent selecting past dates
        if (isBefore(day, today)) return;

        // Prevent selecting dates outside available range
        if (availableFrom && availableTo) {
            if (
                !isWithinInterval(day, {
                    start: availableFrom,
                    end: availableTo,
                })
            ) {
                return;
            }
        }

        if (!startDate || (startDate && endDate)) {
            setStartDate(day);
            setEndDate(null);
        } else if (isAfter(day, startDate)) {
            setEndDate(day);
        } else {
            setStartDate(day);
            setEndDate(null);
        }
    };

    // Highlight unavailable dates on calendar
    const isDateUnavailable = (day) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Past dates are unavailable
        if (isBefore(day, today)) return true;

        // Check if date is within available range
        if (availableFrom && availableTo) {
            return !isWithinInterval(day, {
                start: availableFrom,
                end: availableTo,
            });
        }

        return false;
    };

    // --- Calculations ---
    const totalDays = useMemo(() => {
        if (!startDate || !endDate) return 1;
        const diff = differenceInDays(endDate, startDate);
        return diff > 0 ? diff + 1 : 1; // Include both start and end days
    }, [startDate, endDate]);

    const subTotal = pricePerDay * totalDays * quantity;
    const totalAmount = subTotal + bookingFee;

    const calendarDays = useMemo(() => {
        const start = startOfWeek(startOfMonth(currentMonth));
        const end = endOfWeek(endOfMonth(currentMonth));
        return eachDayOfInterval({ start, end });
    }, [currentMonth]);

    // Auto-select current month based on availability
    useEffect(() => {
        if (availableFrom && isBefore(currentMonth, availableFrom)) {
            setCurrentMonth(availableFrom);
        }
    }, [availableFrom]);

    return (
        <GuestLayout className="bg-white">
            <Head title={`Details - ${tool.name}`} />
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <span>Browse Tools</span>
                    <ChevronRight size={14} />
                    <span className="font-semibold text-black">
                        Product details
                    </span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* LEFT SIDE: Image & Details */}
                    <div className="lg:col-span-7">
                        <div className="space-y-6 mb-10">
                            {/* Professional Image Slider with Auto-play */}
                            <div className="relative rounded-2xl overflow-hidden bg-gray-100 group shadow-sm">
                                {/* Top Rated Badge */}
                                <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-[#10513D] to-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                                    <Star size={12} fill="white" /> Top Rated
                                </span>

                                {/* Auto-play toggle */}
                                {images.length > 1 && (
                                    <button
                                        onClick={() =>
                                            setIsAutoPlaying(!isAutoPlaying)
                                        }
                                        className="absolute top-4 right-4 z-10 bg-black/70 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5 hover:bg-black/80 transition-colors"
                                    >
                                        {isAutoPlaying ? (
                                            <>
                                                <div className="w-2 h-2 rounded-full bg-white" />
                                                <span>Auto</span>
                                            </>
                                        ) : (
                                            <>
                                                <Play
                                                    size={10}
                                                    className="fill-white"
                                                />
                                                <span>Play</span>
                                            </>
                                        )}
                                    </button>
                                )}

                                {/* Main Image */}
                                <img
                                    src={images[selectedImage]}
                                    alt={tool.name}
                                    className="w-full aspect-[16/10] object-cover transition-all duration-500 ease-out"
                                />

                                {/* Navigation Arrows */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 active:scale-95"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft
                                                size={20}
                                                className="text-gray-800"
                                            />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 z-10 active:scale-95"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight
                                                size={20}
                                                className="text-gray-800"
                                            />
                                        </button>
                                    </>
                                )}

                                {/* Image Counter */}
                                {images.length > 1 && (
                                    <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                                        {selectedImage + 1} / {images.length}
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Slider with Previous Design */}
                            {images.length > 1 && (
                                <div className="relative group/thumb">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={prevImage}
                                            className="text-gray-400 hover:text-black transition-colors p-2 rounded-lg hover:bg-gray-100"
                                            aria-label="Previous thumbnails"
                                        >
                                            <Play
                                                size={16}
                                                className="rotate-180 fill-current"
                                            />
                                        </button>

                                        <div className="flex-1 flex gap-3 overflow-x-auto pb-4 pt-1 px-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                            {images.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() =>
                                                        setSelectedImage(idx)
                                                    }
                                                    className={`relative flex-shrink-0 rounded-xl overflow-hidden w-28 h-20 transition-all duration-300 border-2
                                                        ${
                                                            selectedImage ===
                                                            idx
                                                                ? "border-[#10513D] scale-105 ring-2 ring-[#10513D]/20"
                                                                : "border-gray-200 opacity-75 hover:opacity-100 hover:border-gray-300"
                                                        }`}
                                                    aria-label={`View image ${
                                                        idx + 1
                                                    }`}
                                                >
                                                    <img
                                                        src={img}
                                                        className="w-full h-full object-cover"
                                                        alt={`${
                                                            tool.name
                                                        } view ${idx + 1}`}
                                                    />
                                                    {selectedImage === idx && (
                                                        <div className="absolute inset-0 bg-[#10513D]/10 pointer-events-none" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={nextImage}
                                            className="text-gray-400 hover:text-black transition-colors p-2 rounded-lg hover:bg-gray-100"
                                            aria-label="Next thumbnails"
                                        >
                                            <Play
                                                size={16}
                                                className="fill-current"
                                            />
                                        </button>
                                    </div>

                                    {/* Custom Scrollbar Indicator */}
                                    <div className="absolute bottom-0 left-10 right-10 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gray-400 transition-all duration-300 rounded-full"
                                            style={{
                                                width: `${
                                                    100 / images.length
                                                }%`,
                                                marginLeft: `${
                                                    (100 / images.length) *
                                                    selectedImage
                                                }%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Calendar & Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-t pt-10">
                            {/* Calendar Section */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-lg">
                                            {format(currentMonth, "MMMM yyyy")}
                                        </h3>
                                        {availableFrom && availableTo && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                Available:{" "}
                                                {format(
                                                    availableFrom,
                                                    "MMM dd"
                                                )}{" "}
                                                -{" "}
                                                {format(availableTo, "MMM dd")}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                setCurrentMonth(
                                                    subMonths(currentMonth, 1)
                                                )
                                            }
                                            className="p-2 border rounded-lg hover:bg-gray-50 transition-colors active:scale-95"
                                            aria-label="Previous month"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setCurrentMonth(
                                                    addMonths(currentMonth, 1)
                                                )
                                            }
                                            className="p-2 border rounded-lg hover:bg-gray-50 transition-colors active:scale-95"
                                            aria-label="Next month"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Weekday Headers */}
                                <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 font-medium mb-3">
                                    {[
                                        "Sun",
                                        "Mon",
                                        "Tue",
                                        "Wed",
                                        "Thu",
                                        "Fri",
                                        "Sat",
                                    ].map((d) => (
                                        <div key={d} className="py-2">
                                            {d}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar Days */}
                                <div className="grid grid-cols-7 gap-1">
                                    {calendarDays.map((day, i) => {
                                        const isSelected =
                                            (startDate &&
                                                isSameDay(day, startDate)) ||
                                            (endDate &&
                                                isSameDay(day, endDate));
                                        const isInRange =
                                            startDate &&
                                            endDate &&
                                            isAfter(day, startDate) &&
                                            isBefore(day, endDate);
                                        const isToday = isSameDay(
                                            day,
                                            new Date()
                                        );
                                        const isUnavailable =
                                            isDateUnavailable(day);
                                        const isCurrentMonth = isSameMonth(
                                            day,
                                            currentMonth
                                        );

                                        return (
                                            <button
                                                key={i}
                                                onClick={() =>
                                                    !isUnavailable &&
                                                    handleDateClick(day)
                                                }
                                                disabled={isUnavailable}
                                                className={`p-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative
                                                    ${
                                                        !isCurrentMonth
                                                            ? "text-gray-300 pointer-events-none"
                                                            : ""
                                                    }
                                                    ${
                                                        isUnavailable
                                                            ? "text-gray-300 cursor-not-allowed bg-gray-50"
                                                            : "hover:bg-gray-50"
                                                    }
                                                    ${
                                                        isSelected
                                                            ? "bg-[#10513D] text-white font-semibold z-10"
                                                            : ""
                                                    }
                                                    ${
                                                        isInRange
                                                            ? "bg-emerald-50 text-[#10513D]"
                                                            : ""
                                                    }
                                                    ${
                                                        isToday && !isSelected
                                                            ? "border-2 border-[#10513D]"
                                                            : ""
                                                    }
                                                    ${
                                                        isCurrentMonth &&
                                                        !isSelected &&
                                                        !isInRange &&
                                                        !isUnavailable
                                                            ? "text-gray-700"
                                                            : ""
                                                    }
                                                `}
                                                aria-label={`${format(
                                                    day,
                                                    "MMMM d, yyyy"
                                                )} ${
                                                    isUnavailable
                                                        ? " (Unavailable)"
                                                        : ""
                                                }`}
                                            >
                                                {format(day, "d")}
                                                {isUnavailable &&
                                                    isCurrentMonth && (
                                                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-300 rounded-full" />
                                                    )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Calendar Legend */}
                                <div className="flex items-center gap-4 mt-4 pt-4 border-t text-xs text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded bg-[#10513D]" />
                                        <span>Selected</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded bg-emerald-50" />
                                        <span>In Range</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded bg-gray-100" />
                                        <span>Unavailable</span>
                                    </div>
                                </div>
                            </div>

                            {/* Rental Summary with Availability Status */}
                            <div className="space-y-6">
                                <h3 className="font-bold text-gray-800 text-lg">
                                    Rental Summary
                                </h3>

                                {/* Availability Status Banner */}
                                <div
                                    className={`p-4 rounded-xl border ${
                                        availabilityStatus.type === "success"
                                            ? "bg-emerald-50 border-emerald-200"
                                            : availabilityStatus.type ===
                                              "error"
                                            ? "bg-red-50 border-red-200"
                                            : "bg-blue-50 border-blue-200"
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={`p-1.5 rounded-full ${
                                                availabilityStatus.type ===
                                                "success"
                                                    ? "bg-emerald-100 text-emerald-600"
                                                    : availabilityStatus.type ===
                                                      "error"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-blue-100 text-blue-600"
                                            }`}
                                        >
                                            {availabilityStatus.type ===
                                            "success" ? (
                                                <CheckCircle2 size={18} />
                                            ) : availabilityStatus.type ===
                                              "error" ? (
                                                <AlertCircle size={18} />
                                            ) : (
                                                <Clock size={18} />
                                            )}
                                        </div>
                                        <div>
                                            <p
                                                className={`font-semibold ${
                                                    availabilityStatus.type ===
                                                    "success"
                                                        ? "text-emerald-700"
                                                        : availabilityStatus.type ===
                                                          "error"
                                                        ? "text-red-700"
                                                        : "text-blue-700"
                                                }`}
                                            >
                                                {availabilityStatus.type ===
                                                "success"
                                                    ? "Available"
                                                    : availabilityStatus.type ===
                                                      "error"
                                                    ? "Not Available"
                                                    : "Select Dates"}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-0.5">
                                                {availabilityStatus.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <div className="flex-1 p-4 border rounded-xl bg-gray-50/50">
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                                                Start Date
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <Calendar
                                                    size={14}
                                                    className="text-gray-400"
                                                />
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {startDate
                                                        ? format(
                                                              startDate,
                                                              "dd.MM.yy"
                                                          )
                                                        : "--/--/--"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex-1 p-4 border rounded-xl bg-gray-50/50">
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                                                End Date
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <Calendar
                                                    size={14}
                                                    className="text-gray-400"
                                                />
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {endDate
                                                        ? format(
                                                              endDate,
                                                              "dd.MM.yy"
                                                          )
                                                        : "--/--/--"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pricing Breakdown */}
                                    <div className="space-y-4 border-t pt-4">
                                        <div className="flex justify-between items-center text-gray-600">
                                            <span className="text-sm">
                                                ${pricePerDay.toFixed(2)} ×{" "}
                                                {totalDays} Days
                                            </span>
                                            <span className="font-semibold text-gray-800">
                                                ${subTotal.toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center text-gray-600">
                                            <span className="text-sm">
                                                Booking Fee
                                            </span>
                                            <span className="font-semibold text-gray-800">
                                                ${bookingFee.toFixed(2)}
                                            </span>
                                        </div>

                                        {/* Quantity Selector */}
                                        <div className="flex justify-between items-center py-3">
                                            <span className="text-gray-600 text-sm">
                                                Qty
                                            </span>
                                            <div className="flex items-center gap-4 border rounded-lg px-3 py-1.5 bg-white">
                                                <button
                                                    onClick={() =>
                                                        setQuantity(
                                                            Math.max(
                                                                1,
                                                                quantity - 1
                                                            )
                                                        )
                                                    }
                                                    className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="font-bold text-gray-800 min-w-[24px] text-center">
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        setQuantity(
                                                            quantity + 1
                                                        )
                                                    }
                                                    className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Total */}
                                        <div className="flex justify-between items-center font-bold text-xl text-black border-t pt-4">
                                            <span>Total</span>
                                            <span>
                                                ${totalAmount.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs for Specifications, Guidelines and Reviews */}
                        <div className="border-t pt-10">
                            <div className="flex border-b mb-8 overflow-x-auto">
                                <button
                                    onClick={() => setActiveTab("about")}
                                    className={`pb-4 px-6 font-medium text-sm transition-colors relative whitespace-nowrap ${
                                        activeTab === "about"
                                            ? "text-[#10513D] font-semibold"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    About This Tool
                                    {activeTab === "about" && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10513D]" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab("specs")}
                                    className={`pb-4 px-6 font-medium text-sm transition-colors relative whitespace-nowrap ${
                                        activeTab === "specs"
                                            ? "text-[#10513D] font-semibold"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    Specifications
                                    {activeTab === "specs" && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10513D]" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab("guidelines")}
                                    className={`pb-4 px-6 font-medium text-sm transition-colors relative whitespace-nowrap ${
                                        activeTab === "guidelines"
                                            ? "text-[#10513D] font-semibold"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    Safety Guidelines
                                    {activeTab === "guidelines" && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10513D]" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab("reviews")}
                                    className={`pb-4 px-6 font-medium text-sm transition-colors relative whitespace-nowrap ${
                                        activeTab === "reviews"
                                            ? "text-[#10513D] font-semibold"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    Reviews & Ratings ({reviews.length})
                                    {activeTab === "reviews" && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10513D]" />
                                    )}
                                </button>
                            </div>

                            {/* About Tab */}
                            {activeTab === "about" && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4">
                                            About this tool
                                        </h2>
                                        <p className="text-gray-600 leading-relaxed mb-8">
                                            {tool.description ||
                                                "No description available."}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Specifications Tab */}
                            {activeTab === "specs" && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-bold mb-5">
                                            Specifications
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                            {tool.specifications?.map(
                                                (spec, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-3 text-[15px] text-gray-800"
                                                    >
                                                        <div className="bg-green-600 rounded-full p-0.5">
                                                            <CheckCircle2
                                                                size={16}
                                                                className="text-white"
                                                            />
                                                        </div>
                                                        {spec.name}
                                                    </div>
                                                )
                                            ) || (
                                                <div className="text-gray-500">
                                                    No specifications available.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Safety Guidelines Tab */}
                            {activeTab === "guidelines" && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-bold mb-5">
                                            Safety Guidelines
                                        </h3>
                                        <div className="space-y-4">
                                            {tool.guidelines?.map(
                                                (guide, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-3 text-[15px] text-gray-700"
                                                    >
                                                        <div className="w-2.5 h-2.5 rounded-full bg-[#3d8c71]" />
                                                        <span>
                                                            {guide.name}
                                                        </span>
                                                    </div>
                                                )
                                            ) || (
                                                <div className="text-gray-500">
                                                    No safety guidelines
                                                    available.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Reviews Tab */}
                            {activeTab === "reviews" && (
                                <div className="space-y-8">
                                    {/* Rating Overview */}
                                    <div className="bg-gray-50 rounded-2xl p-6">
                                        <div className="flex flex-col md:flex-row items-center gap-8">
                                            {/* Average Rating */}
                                            <div className="text-center md:text-left">
                                                <div className="text-5xl font-bold text-gray-900 mb-2">
                                                    {averageRating}
                                                </div>
                                                <div className="flex justify-center md:justify-start gap-1 mb-2">
                                                    {[1, 2, 3, 4, 5].map(
                                                        (star) => (
                                                            <Star
                                                                key={star}
                                                                size={20}
                                                                className={`${
                                                                    star <=
                                                                    Math.floor(
                                                                        averageRating
                                                                    )
                                                                        ? "text-yellow-400 fill-yellow-400"
                                                                        : "text-gray-300"
                                                                }`}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                                <p className="text-gray-600 text-sm">
                                                    Based on {reviews.length}{" "}
                                                    {reviews.length === 1
                                                        ? "review"
                                                        : "reviews"}
                                                </p>
                                            </div>

                                            {/* Rating Distribution */}
                                            <div className="flex-1 space-y-3 min-w-0">
                                                {ratingDistribution.map(
                                                    (item) => (
                                                        <div
                                                            key={item.stars}
                                                            className="flex items-center gap-3"
                                                        >
                                                            <div className="flex items-center gap-2 w-20">
                                                                <span className="text-sm font-medium text-gray-700">
                                                                    {item.stars}{" "}
                                                                    star
                                                                    {item.stars !==
                                                                    1
                                                                        ? "s"
                                                                        : ""}
                                                                </span>
                                                            </div>
                                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden min-w-[100px]">
                                                                <div
                                                                    className="h-full bg-yellow-400 rounded-full"
                                                                    style={{
                                                                        width: `${item.percentage}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                            <span className="text-sm text-gray-600 w-10 text-right">
                                                                {item.count}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reviews List */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Customer Reviews
                                        </h3>

                                        {reviews.map((review) => (
                                            <div
                                                key={review.id}
                                                className="border-b pb-6 last:border-0"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                            {review.user
                                                                .avatar ? (
                                                                <img
                                                                    src={
                                                                        review
                                                                            .user
                                                                            .avatar
                                                                    }
                                                                    alt={
                                                                        review
                                                                            .user
                                                                            .name
                                                                    }
                                                                    className="w-full h-full rounded-full object-cover"
                                                                />
                                                            ) : (
                                                                <User
                                                                    size={20}
                                                                    className="text-gray-400"
                                                                />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <p className="font-medium text-gray-900">
                                                                    {
                                                                        review
                                                                            .user
                                                                            .name
                                                                    }
                                                                </p>
                                                                {review.verified && (
                                                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                                                        Verified
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                                <div className="flex gap-0.5">
                                                                    {[
                                                                        1, 2, 3,
                                                                        4, 5,
                                                                    ].map(
                                                                        (
                                                                            star
                                                                        ) => (
                                                                            <Star
                                                                                key={
                                                                                    star
                                                                                }
                                                                                size={
                                                                                    12
                                                                                }
                                                                                className={`${
                                                                                    star <=
                                                                                    review.rating
                                                                                        ? "text-yellow-400 fill-yellow-400"
                                                                                        : "text-gray-300"
                                                                                }`}
                                                                            />
                                                                        )
                                                                    )}
                                                                </div>
                                                                <span>•</span>
                                                                <span>
                                                                    {format(
                                                                        new Date(
                                                                            review.date
                                                                        ),
                                                                        "MMM dd, yyyy"
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 leading-relaxed">
                                                    {review.comment}
                                                </p>
                                            </div>
                                        ))}

                                        {reviews.length === 0 && (
                                            <div className="text-center py-12">
                                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                                                    <MessageSquare
                                                        size={24}
                                                        className="text-gray-400"
                                                    />
                                                </div>
                                                <h4 className="font-medium text-gray-900 mb-2">
                                                    No reviews yet
                                                </h4>
                                                <p className="text-gray-600 text-sm">
                                                    Be the first to review this
                                                    tool
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT SIDE: Sticky Booking Card */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 border rounded-3xl p-6 shadow-sm bg-white">
                            <div className="flex justify-between items-start mb-6">
                                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                                    {tool.name}
                                </h1>
                                <div className="bg-[#E7F0ED] text-[#10513D] px-4 py-2 rounded-xl font-bold">
                                    ${pricePerDay}/Day
                                </div>
                            </div>
                            {/* Availability Timeline */}
                            {availableFrom && availableTo && (
                                <div className="mb-6 p-4 bg-blue-50 rounded-2xl">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Calendar
                                            size={18}
                                            className="text-blue-600"
                                        />
                                        <span className="font-semibold text-blue-700">
                                            Availability
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500">
                                                From
                                            </p>
                                            <p className="font-semibold text-gray-800">
                                                {format(
                                                    availableFrom,
                                                    "dd.MM.yy"
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex-1 h-0.5 bg-blue-200 mx-4" />
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500">
                                                To
                                            </p>
                                            <p className="font-semibold text-gray-800">
                                                {format(
                                                    availableTo,
                                                    "dd.MM.yy"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Lender Info */}
                            <div className="flex items-center gap-3 mb-8 p-4 bg-gray-50 rounded-2xl">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                    <img
                                        src={
                                            tool.user?.profile_photo_url ||
                                            `https://ui-avatars.com/api/?name=${
                                                tool.user?.name || "Lender"
                                            }`
                                        }
                                        alt={tool.user?.name || "Lender"}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">
                                        {tool.user?.name || "Lender"}
                                    </p>
                                    <div className="flex items-center gap-1 text-xs">
                                        <Star
                                            size={12}
                                            fill="currentColor"
                                            className="text-yellow-400"
                                        />
                                        <span className="text-gray-500 font-medium">
                                            4.8 (156 reviews)
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 text-sm text-gray-600 mb-8 px-2">
                                <div className="flex items-center gap-3">
                                    <MapPin
                                        size={18}
                                        className="text-gray-400"
                                    />
                                    {tool.location_address}
                                </div>
                                <div className="flex items-center gap-3">
                                    <Settings
                                        size={18}
                                        className="text-gray-400"
                                    />
                                    Condition: {tool.condition || "Excellent"}
                                </div>
                                <div className="flex items-center gap-3 text-green-600 font-semibold">
                                    <CheckCircle2 size={18} />
                                    {tool.status === "active"
                                        ? "Available for rent"
                                        : "Currently Unavailable"}
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    // ১. ডেট সিলেক্ট করা আছে কি না চেক
                                    if (!startDate || !endDate) {
                                        alert(
                                            "Please select start and end dates"
                                        );
                                        return;
                                    }

                                    // ২. Inertia Router ব্যবহার করে ডেটা পাঠানো
                                    router.get(
                                        route("bookings.checkout", tool.id),
                                        {
                                            start_date: format(
                                                startDate,
                                                "yyyy-MM-dd"
                                            ),
                                            end_date: format(
                                                endDate,
                                                "yyyy-MM-dd"
                                            ),
                                            quantity: quantity,
                                        },
                                        {
                                            preserveState: true, // পেজ স্টেট ধরে রাখার জন্য
                                            replace: false, // হিস্টোরি রিপ্লেস করবে না
                                        }
                                    );
                                }}
                                disabled={!availabilityStatus.isAvailable}
                                className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group shadow-lg ${
                                    availabilityStatus.isAvailable
                                        ? "bg-[#10513D] text-white hover:bg-[#0c3d2e] shadow-green-100"
                                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                            >
                                {availabilityStatus.isAvailable
                                    ? "Request to Rent"
                                    : "Check Availability"}
                                {availabilityStatus.isAvailable && (
                                    <ChevronRight
                                        size={18}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                )}
                            </button>
                            <button className="w-full mt-4 border border-gray-200 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all text-gray-700">
                                <MessageSquare size={18} /> Chat with lender
                            </button>
                            {/* Trust Badges */}
                            <div className="mt-8 pt-6 border-t">
                                <div className="flex items-center justify-around text-gray-500">
                                    <div className="text-center">
                                        <Shield
                                            size={18}
                                            className="mx-auto mb-1"
                                        />
                                        <p className="text-xs">Secure</p>
                                    </div>
                                    <div className="text-center">
                                        <Calendar
                                            size={18}
                                            className="mx-auto mb-1"
                                        />
                                        <p className="text-xs">Flexible</p>
                                    </div>
                                    <div className="text-center">
                                        <CheckCircle2
                                            size={18}
                                            className="mx-auto mb-1"
                                        />
                                        <p className="text-xs">Verified</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};
export default BrowseToolsDetails;
