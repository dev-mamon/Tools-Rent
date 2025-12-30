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

const BrowseToolsDetails = ({ tool, existingBookings = [] }) => {
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
    ];

    const availableFrom = tool.available_from
        ? parseISO(tool.available_from)
        : null;
    const availableTo = tool.available_to ? parseISO(tool.available_to) : null;

    const averageRating =
        reviews.length > 0
            ? (
                  reviews.reduce((sum, review) => sum + review.rating, 0) /
                  reviews.length
              ).toFixed(1)
            : "0.0";

    const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
        stars: star,
        count: reviews.filter((r) => r.rating === star).length,
        percentage:
            (reviews.filter((r) => r.rating === star).length / reviews.length) *
                100 || 0,
    }));

    // --- Availability Check ---
    const checkAvailabilityForSelectedDates = () => {
        if (!startDate || !endDate) {
            return {
                isAvailable: false,
                message: "Please select start and end dates",
                type: "info",
            };
        }
        if (tool.status !== "active") {
            return {
                isAvailable: false,
                message: "This listing is currently inactive",
                type: "error",
            };
        }
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
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isBefore(startDate, today))
            return {
                isAvailable: false,
                message: "Start date cannot be in the past",
                type: "error",
            };
        if (!isAfter(endDate, startDate) && !isSameDay(endDate, startDate))
            return {
                isAvailable: false,
                message: "End date must be after or same as start date",
                type: "error",
            };

        const daysInRange = eachDayOfInterval({
            start: startDate,
            end: endDate,
        });
        for (const day of daysInRange) {
            const bookedOnThisDay = existingBookings.reduce((sum, booking) => {
                const bStart = parseISO(booking.start_date);
                const bEnd = parseISO(booking.end_date);
                if (isWithinInterval(day, { start: bStart, end: bEnd }))
                    return sum + parseInt(booking.quantity);
                return sum;
            }, 0);
            const remainingStock = tool.quantity - bookedOnThisDay;
            if (remainingStock < quantity)
                return {
                    isAvailable: false,
                    message: `Only ${remainingStock} items left for ${format(
                        day,
                        "MMM dd"
                    )}`,
                    type: "error",
                };
        }
        return {
            isAvailable: true,
            message: `Available for ${
                differenceInDays(endDate, startDate) + 1
            } days`,
            type: "success",
        };
    };

    const availabilityStatus = checkAvailabilityForSelectedDates();

    // --- Slider Logic ---
    const nextImage = () =>
        setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    const prevImage = () =>
        setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    useEffect(() => {
        if (images.length <= 1 || !isAutoPlaying) return;
        const interval = setInterval(nextImage, 5000);
        return () => clearInterval(interval);
    }, [selectedImage, images.length, isAutoPlaying]);

    // --- Calendar Logic ---
    const isDateUnavailable = (day) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isBefore(day, today)) return true;
        if (
            availableFrom &&
            availableTo &&
            !isWithinInterval(day, { start: availableFrom, end: availableTo })
        )
            return true;
        const totalBookedOnDay = existingBookings.reduce((sum, b) => {
            if (
                isWithinInterval(day, {
                    start: parseISO(b.start_date),
                    end: parseISO(b.end_date),
                })
            )
                return sum + parseInt(b.quantity);
            return sum;
        }, 0);
        return totalBookedOnDay >= tool.quantity;
    };

    const handleDateClick = (day) => {
        if (isDateUnavailable(day)) return;
        if (!startDate || (startDate && endDate)) {
            setStartDate(day);
            setEndDate(null);
        } else if (isAfter(day, startDate)) setEndDate(day);
        else {
            setStartDate(day);
            setEndDate(null);
        }
    };

    const totalDays = useMemo(() => {
        if (!startDate || !endDate) return 1;
        const diff = differenceInDays(endDate, startDate);
        return diff >= 0 ? diff + 1 : 1;
    }, [startDate, endDate]);

    const subTotal = pricePerDay * totalDays * quantity;
    const totalAmount = subTotal + bookingFee;

    const calendarDays = useMemo(() => {
        const start = startOfWeek(startOfMonth(currentMonth));
        const end = endOfWeek(endOfMonth(currentMonth));
        return eachDayOfInterval({ start, end });
    }, [currentMonth]);

    useEffect(() => {
        if (availableFrom && isBefore(currentMonth, availableFrom))
            setCurrentMonth(availableFrom);
    }, [availableFrom]);

    return (
        <GuestLayout className="bg-white dark:bg-gray-950 transition-colors duration-300">
            <Head title={`Details - ${tool.name}`} />
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
                    <span>Browse Tools</span>
                    <ChevronRight size={14} />
                    <span className="font-semibold text-black dark:text-gray-100">
                        Product details
                    </span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* LEFT SIDE */}
                    <div className="lg:col-span-7">
                        <div className="space-y-6 mb-10">
                            <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 group shadow-sm border dark:border-gray-800">
                                <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-[#10513D] to-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                                    <Star size={12} fill="white" /> Top Rated
                                </span>
                                {images.length > 1 && (
                                    <button
                                        onClick={() =>
                                            setIsAutoPlaying(!isAutoPlaying)
                                        }
                                        className="absolute top-4 right-4 z-10 bg-black/70 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5 hover:bg-black/80"
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
                                <img
                                    src={images[selectedImage]}
                                    alt={tool.name}
                                    className="w-full aspect-[16/10] object-cover transition-all duration-500 ease-out"
                                />
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                                        >
                                            <ChevronLeft
                                                size={20}
                                                className="text-gray-800 dark:text-gray-200"
                                            />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                                        >
                                            <ChevronRight
                                                size={20}
                                                className="text-gray-800 dark:text-gray-200"
                                            />
                                        </button>
                                    </>
                                )}
                            </div>
                            {/* Thumbnail Slider */}
                            {images.length > 1 && (
                                <div className="relative group/thumb">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={prevImage}
                                            className="text-gray-400 hover:text-black dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            <Play
                                                size={16}
                                                className="rotate-180 fill-current"
                                            />
                                        </button>
                                        <div className="flex-1 flex gap-3 overflow-x-auto pb-4 pt-1 px-1 scrollbar-thin dark:scrollbar-thumb-gray-700">
                                            {images.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() =>
                                                        setSelectedImage(idx)
                                                    }
                                                    className={`relative flex-shrink-0 rounded-xl overflow-hidden w-28 h-20 transition-all border-2 ${
                                                        selectedImage === idx
                                                            ? "border-[#10513D] scale-105 ring-2 ring-[#10513D]/20"
                                                            : "border-gray-200 dark:border-gray-800 opacity-75 hover:opacity-100"
                                                    }`}
                                                >
                                                    <img
                                                        src={img}
                                                        className="w-full h-full object-cover"
                                                        alt="view"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            onClick={nextImage}
                                            className="text-gray-400 hover:text-black dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            <Play
                                                size={16}
                                                className="fill-current"
                                            />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Calendar & Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-t dark:border-gray-800 pt-10">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                                        {format(currentMonth, "MMMM yyyy")}
                                    </h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                setCurrentMonth(
                                                    subMonths(currentMonth, 1)
                                                )
                                            }
                                            className="p-2 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setCurrentMonth(
                                                    addMonths(currentMonth, 1)
                                                )
                                            }
                                            className="p-2 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 font-medium mb-3 uppercase">
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
                                        const isCurrentMonth = isSameMonth(
                                            day,
                                            currentMonth
                                        );
                                        const isUnavailable =
                                            isDateUnavailable(day);
                                        const totalBookedOnDay =
                                            existingBookings.reduce(
                                                (sum, b) => {
                                                    if (
                                                        isWithinInterval(day, {
                                                            start: parseISO(
                                                                b.start_date
                                                            ),
                                                            end: parseISO(
                                                                b.end_date
                                                            ),
                                                        })
                                                    )
                                                        return (
                                                            sum +
                                                            parseInt(b.quantity)
                                                        );
                                                    return sum;
                                                },
                                                0
                                            );
                                        const isPartiallyBooked =
                                            isCurrentMonth &&
                                            !isUnavailable &&
                                            totalBookedOnDay > 0 &&
                                            totalBookedOnDay < tool.quantity;
                                        const isFullyAvailable =
                                            isCurrentMonth &&
                                            !isUnavailable &&
                                            totalBookedOnDay === 0;
                                        const isToday = isSameDay(
                                            day,
                                            new Date()
                                        );

                                        return (
                                            <button
                                                key={i}
                                                disabled={
                                                    !isCurrentMonth ||
                                                    isUnavailable
                                                }
                                                onClick={() =>
                                                    handleDateClick(day)
                                                }
                                                className={`p-2.5 text-sm font-medium rounded-lg transition-all relative
                                                    ${
                                                        !isCurrentMonth
                                                            ? "text-gray-300 dark:text-gray-700 pointer-events-none bg-transparent"
                                                            : "dark:text-gray-300"
                                                    }
                                                    ${
                                                        isToday && !isSelected
                                                            ? "border-2 border-blue-500"
                                                            : ""
                                                    }
                                                    ${
                                                        isSelected
                                                            ? "bg-[#10513D] text-white font-semibold z-10 shadow-lg"
                                                            : ""
                                                    }
                                                    ${
                                                        isInRange
                                                            ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300"
                                                            : ""
                                                    }
                                                    ${
                                                        isUnavailable &&
                                                        isCurrentMonth
                                                            ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                                            : ""
                                                    }
                                                    ${
                                                        isPartiallyBooked &&
                                                        !isSelected &&
                                                        !isInRange
                                                            ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/50"
                                                            : ""
                                                    }
                                                    ${
                                                        isFullyAvailable &&
                                                        !isSelected &&
                                                        !isInRange
                                                            ? "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                                                            : ""
                                                    }
                                                `}
                                            >
                                                {format(day, "d")}
                                                {isPartiallyBooked && (
                                                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-yellow-400" />
                                                )}
                                                {isUnavailable &&
                                                    isCurrentMonth &&
                                                    !isBefore(
                                                        day,
                                                        new Date()
                                                    ) && (
                                                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-500" />
                                                    )}
                                                {isFullyAvailable && (
                                                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-green-500" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                                    Rental Summary
                                </h3>
                                <div
                                    className={`p-4 rounded-xl border ${
                                        availabilityStatus.type === "success"
                                            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                                            : availabilityStatus.type ===
                                              "error"
                                            ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/50"
                                            : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/50"
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
                                                        ? "text-emerald-700 dark:text-emerald-400"
                                                        : availabilityStatus.type ===
                                                          "error"
                                                        ? "text-red-700 dark:text-red-400"
                                                        : "text-blue-700 dark:text-blue-400"
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
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                                                {availabilityStatus.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <div className="flex-1 p-4 border dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-900/50">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase mb-1">
                                                Start Date
                                            </p>
                                            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                                <Calendar
                                                    size={14}
                                                    className="text-gray-400"
                                                />
                                                <p className="text-sm font-semibold">
                                                    {startDate
                                                        ? format(
                                                              startDate,
                                                              "dd.MM.yy"
                                                          )
                                                        : "--/--/--"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex-1 p-4 border dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-900/50">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase mb-1">
                                                End Date
                                            </p>
                                            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                                <Calendar
                                                    size={14}
                                                    className="text-gray-400"
                                                />
                                                <p className="text-sm font-semibold">
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
                                    <div className="space-y-4 border-t dark:border-gray-800 pt-4">
                                        <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 text-sm">
                                            <span>
                                                ${pricePerDay.toFixed(2)} ×{" "}
                                                {totalDays} Days
                                            </span>
                                            <span className="font-semibold text-gray-800 dark:text-gray-100">
                                                ${subTotal.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 text-sm">
                                            <span>Booking Fee</span>
                                            <span className="font-semibold text-gray-800 dark:text-gray-100">
                                                ${bookingFee.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3">
                                            <span className="text-gray-600 dark:text-gray-400 text-sm">
                                                Qty
                                            </span>
                                            <div className="flex items-center gap-4 border dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800">
                                                <button
                                                    onClick={() =>
                                                        setQuantity(
                                                            Math.max(
                                                                1,
                                                                quantity - 1
                                                            )
                                                        )
                                                    }
                                                    className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="font-bold text-gray-800 dark:text-gray-100 min-w-[24px] text-center">
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        setQuantity(
                                                            quantity + 1
                                                        )
                                                    }
                                                    className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center font-bold text-xl text-black dark:text-white border-t dark:border-gray-800 pt-4">
                                            <span>Total</span>
                                            <span>
                                                ${totalAmount.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs (About, Specs, Guidelines, Reviews) */}
                        <div className="border-t dark:border-gray-800 pt-10">
                            <div className="flex border-b dark:border-gray-800 mb-8 overflow-x-auto">
                                {[
                                    "about",
                                    "specs",
                                    "guidelines",
                                    "reviews",
                                ].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setActiveTab(t)}
                                        className={`pb-4 px-6 font-medium text-sm transition-colors relative whitespace-nowrap capitalize ${
                                            activeTab === t
                                                ? "text-[#10513D] dark:text-emerald-400 font-semibold"
                                                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                        }`}
                                    >
                                        {t === "about"
                                            ? "About This Tool"
                                            : t === "specs"
                                            ? "Specifications"
                                            : t === "guidelines"
                                            ? "Safety Guidelines"
                                            : `Reviews (${reviews.length})`}
                                        {activeTab === t && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10513D] dark:bg-emerald-400" />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="dark:text-gray-300">
                                {activeTab === "about" && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4 dark:text-white">
                                            About this tool
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                                            {tool.description ||
                                                "No description available."}
                                        </p>
                                    </div>
                                )}
                                {activeTab === "specs" && (
                                    <div>
                                        <h3 className="text-lg font-bold mb-5 dark:text-white">
                                            Specifications
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                            {tool.specifications?.map(
                                                (spec, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-3 text-[15px] text-gray-800 dark:text-gray-200"
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
                                )}
                                {activeTab === "guidelines" && (
                                    <div>
                                        <h3 className="text-lg font-bold mb-5 dark:text-white">
                                            Safety Guidelines
                                        </h3>
                                        <div className="space-y-4">
                                            {tool.guidelines?.map(
                                                (guide, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-3 text-[15px] text-gray-700 dark:text-gray-300"
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
                                )}
                                {activeTab === "reviews" && (
                                    <div className="space-y-8">
                                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6">
                                            <div className="flex flex-col md:flex-row items-center gap-8">
                                                <div className="text-center md:text-left">
                                                    <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
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
                                                                            : "text-gray-300 dark:text-gray-700"
                                                                    }`}
                                                                />
                                                            )
                                                        )}
                                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                            Based on{" "}
                                                            {reviews.length}{" "}
                                                            reviews
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex-1 space-y-3 min-w-0">
                                                    {ratingDistribution.map(
                                                        (item) => (
                                                            <div
                                                                key={item.stars}
                                                                className="flex items-center gap-3"
                                                            >
                                                                <div className="flex items-center gap-2 w-20">
                                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                        {
                                                                            item.stars
                                                                        }{" "}
                                                                        star
                                                                        {item.stars !==
                                                                        1
                                                                            ? "s"
                                                                            : ""}
                                                                    </span>
                                                                </div>
                                                                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                                                    <div
                                                                        className="h-full bg-yellow-400"
                                                                        style={{
                                                                            width: `${item.percentage}%`,
                                                                        }}
                                                                    />
                                                                </div>
                                                                <span className="text-sm text-gray-600 dark:text-gray-400 w-10 text-right">
                                                                    {item.count}
                                                                </span>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {reviews.map((review) => (
                                            <div
                                                key={review.id}
                                                className="border-b dark:border-gray-800 pb-6 last:border-0"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                                            {review.user
                                                                .avatar ? (
                                                                <img
                                                                    src={
                                                                        review
                                                                            .user
                                                                            .avatar
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
                                                                <p className="font-medium text-gray-900 dark:text-white">
                                                                    {
                                                                        review
                                                                            .user
                                                                            .name
                                                                    }
                                                                </p>
                                                                {review.verified && (
                                                                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full">
                                                                        Verified
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
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
                                                                                        : "text-gray-300 dark:text-gray-700"
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
                                                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                                                    {review.comment}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Booking Card */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 border dark:border-gray-800 rounded-3xl p-6 shadow-sm bg-white dark:bg-gray-900">
                            <div className="flex justify-between items-start mb-6">
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                                    {tool.name}
                                </h1>
                                <div className="bg-[#E7F0ED] dark:bg-emerald-900/30 text-[#10513D] dark:text-emerald-400 px-4 py-2 rounded-xl font-bold">
                                    ${pricePerDay}/Day
                                </div>
                            </div>
                            {availableFrom && availableTo && (
                                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Calendar
                                            size={18}
                                            className="text-blue-600 dark:text-blue-400"
                                        />
                                        <span className="font-semibold text-blue-700 dark:text-blue-300">
                                            Available Range
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                From
                                            </p>
                                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                                                {format(
                                                    availableFrom,
                                                    "dd.MM.yy"
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex-1 h-0.5 bg-blue-200 dark:bg-blue-800 mx-4" />
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                To
                                            </p>
                                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                                                {format(
                                                    availableTo,
                                                    "dd.MM.yy"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-3 mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                                    <img
                                        src={
                                            tool.user?.profile_photo_url ||
                                            `https://ui-avatars.com/api/?name=${
                                                tool.user?.name || "Lender"
                                            }`
                                        }
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-sm dark:text-white">
                                        {tool.user?.name || "Lender"}
                                    </p>
                                    <div className="flex items-center gap-1 text-xs">
                                        <Star
                                            size={12}
                                            fill="currentColor"
                                            className="text-yellow-400"
                                        />
                                        <span className="text-gray-500 dark:text-gray-400 font-medium">
                                            4.8 (156 reviews)
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400 mb-8 px-2">
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
                                <div className="flex items-center gap-3 text-green-600 dark:text-emerald-400 font-semibold">
                                    <CheckCircle2 size={18} />
                                    Stock Available: {tool.quantity} Units
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    if (!startDate || !endDate) {
                                        alert(
                                            "Please select start and end dates"
                                        );
                                        return;
                                    }
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
                                        { preserveState: true }
                                    );
                                }}
                                disabled={!availabilityStatus.isAvailable}
                                className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group shadow-lg ${
                                    availabilityStatus.isAvailable
                                        ? "bg-[#10513D] dark:bg-emerald-600 text-white hover:bg-[#0c3d2e] dark:hover:bg-emerald-700"
                                        : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
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
                            <button className="w-full mt-4 border border-gray-200 dark:border-gray-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-gray-700 dark:text-gray-300">
                                <MessageSquare size={18} /> Chat with lender
                            </button>
                            <div className="mt-8 pt-6 border-t dark:border-gray-800">
                                <div className="flex items-center justify-around text-gray-500 dark:text-gray-400">
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
