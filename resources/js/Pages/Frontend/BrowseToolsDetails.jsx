import React, { useState, useMemo } from "react";
import Navbar from "@/Components/Frontend/Navbar";
import GuestLayout from "@/Layouts/GuestLayout";
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
    parseISO,
    isAfter,
    isBefore,
} from "date-fns";

const BrowseToolsDetails = ({ tool }) => {
    // --- States ---
    const [selectedImage, setSelectedImage] = useState(0);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // --- Data Mapping ---
    const images =
        tool.images?.length > 0
            ? tool.images.map((img) => `/storage/${img.image_path}`)
            : ["/assets/images/placeholder.jpg"];

    const pricePerDay = parseFloat(tool.price_per_day) || 0;
    const bookingFee = 2.0;

    // --- Date Selection Logic ---
    const handleDateClick = (day) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (isBefore(day, today)) return; // আজকের আগের তারিখ সিলেক্ট করা যাবে না

        if (!startDate || (startDate && endDate)) {
            // নতুন করে রেঞ্জ শুরু করা
            setStartDate(day);
            setEndDate(null);
        } else if (isAfter(day, startDate)) {
            // এন্ড ডেট সেট করা
            setEndDate(day);
        } else {
            // যদি স্টার্ট ডেটের আগের তারিখে ক্লিক করে, ওটাই নতুন স্টার্ট ডেট হবে
            setStartDate(day);
            setEndDate(null);
        }
    };

    // --- Calculations ---
    const totalDays = useMemo(() => {
        if (!startDate || !endDate) return 1;
        const diff = differenceInDays(endDate, startDate);
        return diff > 0 ? diff : 1;
    }, [startDate, endDate]);

    const subTotal = pricePerDay * totalDays * quantity;
    const totalAmount = subTotal + bookingFee;

    const calendarDays = useMemo(() => {
        const start = startOfWeek(startOfMonth(currentMonth));
        const end = endOfWeek(endOfMonth(currentMonth));
        return eachDayOfInterval({ start, end });
    }, [currentMonth]);

    return (
        <GuestLayout className="bg-white">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                {/* Breadcrumb */}
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
                        <div className="space-y-4 mb-10">
                            <div className="relative rounded-2xl overflow-hidden bg-gray-100">
                                <span className="absolute top-4 left-4 z-10 bg-[#10513D] text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                                    <Star size={12} fill="white" /> Top Rated
                                </span>
                                <img
                                    src={images[selectedImage]}
                                    alt={tool.name}
                                    className="w-full aspect-[16/10] object-cover"
                                />
                            </div>
                            <div className="flex gap-3 overflow-x-auto">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`relative flex-shrink-0 rounded-xl overflow-hidden border-2 w-28 h-20 transition-all
                                        ${
                                            selectedImage === idx
                                                ? "border-[#10513D]"
                                                : "border-transparent opacity-70"
                                        }`}
                                    >
                                        <img
                                            src={img}
                                            className="w-full h-full object-cover"
                                            alt="thumb"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Calendar & Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-t pt-10">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-gray-800">
                                        {format(currentMonth, "MMMM yyyy")}
                                    </h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                setCurrentMonth(
                                                    subMonths(currentMonth, 1)
                                                )
                                            }
                                            className="p-1 border rounded hover:bg-gray-50"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setCurrentMonth(
                                                    addMonths(currentMonth, 1)
                                                )
                                            }
                                            className="p-1 border rounded hover:bg-gray-50"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-gray-400 font-bold mb-2 uppercase">
                                    {[
                                        "Sun",
                                        "Mon",
                                        "Tue",
                                        "Wed",
                                        "Thu",
                                        "Fri",
                                        "Sat",
                                    ].map((d) => (
                                        <div key={d}>{d}</div>
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
                                        const isToday = isSameDay(
                                            day,
                                            new Date()
                                        );
                                        const isPast = isBefore(
                                            day,
                                            new Date().setHours(0, 0, 0, 0)
                                        );

                                        return (
                                            <div
                                                key={i}
                                                onClick={() =>
                                                    !isPast &&
                                                    handleDateClick(day)
                                                }
                                                className={`p-2 text-center cursor-pointer rounded-lg text-sm transition-all
                                                    ${
                                                        !isSameMonth(
                                                            day,
                                                            currentMonth
                                                        )
                                                            ? "text-gray-200 pointer-events-none"
                                                            : ""
                                                    }
                                                    ${
                                                        isPast
                                                            ? "text-gray-300 cursor-not-allowed"
                                                            : "hover:bg-green-50"
                                                    }
                                                    ${
                                                        isSelected
                                                            ? "bg-[#10513D] text-white font-bold"
                                                            : ""
                                                    }
                                                    ${
                                                        isInRange
                                                            ? "bg-green-100 text-[#10513D]"
                                                            : ""
                                                    }
                                                    ${
                                                        isToday && !isSelected
                                                            ? "border border-[#10513D]"
                                                            : ""
                                                    }
                                                `}
                                            >
                                                {format(day, "d")}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="font-bold text-gray-800">
                                    Rental Period
                                </h3>
                                <div className="flex gap-3">
                                    <div className="flex-1 p-3 border rounded-xl bg-gray-50">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">
                                            Start Date
                                        </p>
                                        <p className="text-sm font-bold">
                                            {startDate
                                                ? format(startDate, "dd.MM.yy")
                                                : "--/--/--"}
                                        </p>
                                    </div>
                                    <div className="flex-1 p-3 border rounded-xl bg-gray-50">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">
                                            End Date
                                        </p>
                                        <p className="text-sm font-bold">
                                            {endDate
                                                ? format(endDate, "dd.MM.yy")
                                                : "--/--/--"}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3 text-sm border-t pt-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span>
                                            ${pricePerDay} x {totalDays} Days
                                        </span>
                                        <span className="font-semibold">
                                            ${subTotal.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Booking Fee</span>
                                        <span className="font-semibold">
                                            ${bookingFee.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-600">
                                            Qty
                                        </span>
                                        <div className="flex items-center gap-4 border rounded-lg px-2 py-1">
                                            <button
                                                onClick={() =>
                                                    setQuantity(
                                                        Math.max(
                                                            1,
                                                            quantity - 1
                                                        )
                                                    )
                                                }
                                                className="text-gray-500"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="font-bold">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    setQuantity(quantity + 1)
                                                }
                                                className="text-gray-500"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-between font-bold text-xl text-black border-t pt-4">
                                        <span>Total</span>
                                        <span>${totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About This Tool */}
                        <div className="border-t pt-10">
                            <h2 className="text-2xl font-bold mb-4">
                                About this tool
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-8">
                                {tool.description}
                            </p>

                            <h3 className="font-bold mb-4">Specifications</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {[
                                    "20V Max Power Output",
                                    "Brushless Motor",
                                    "Variable Speed Trigger",
                                ].map((spec) => (
                                    <div
                                        key={spec}
                                        className="flex items-center gap-2 text-sm text-gray-700"
                                    >
                                        <CheckCircle2
                                            size={16}
                                            className="text-green-600"
                                        />{" "}
                                        {spec}
                                    </div>
                                ))}
                            </div>
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

                            <div className="flex items-center gap-3 mb-8 p-4 bg-gray-50 rounded-2xl">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                    <img
                                        src={
                                            tool.user?.profile_photo_url ||
                                            `https://ui-avatars.com/api/?name=${tool.user?.name}`
                                        }
                                        alt="user"
                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">
                                        {tool.user?.name}
                                    </p>
                                    <div className="flex items-center gap-1 text-xs text-yellow-500">
                                        <Star size={12} fill="currentColor" />
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
                                    />{" "}
                                    {tool.location_address}
                                </div>
                                <div className="flex items-center gap-3">
                                    <Settings
                                        size={18}
                                        className="text-gray-400"
                                    />{" "}
                                    Condition: Excellent
                                </div>
                                <div className="flex items-center gap-3 text-green-600 font-semibold">
                                    <CheckCircle2 size={18} />{" "}
                                    {tool.status === "active"
                                        ? "Available for rent"
                                        : "Unavailable"}
                                </div>
                            </div>

                            <button className="w-full bg-[#10513D] text-white py-4 rounded-2xl font-bold hover:bg-[#0c3d2e] transition-all flex items-center justify-center gap-2 group shadow-lg shadow-green-100">
                                Request to Rent{" "}
                                <ChevronRight
                                    size={18}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </button>

                            <button className="w-full mt-4 border border-gray-200 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all text-gray-700">
                                <MessageSquare size={18} /> Chat with lender
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default BrowseToolsDetails;
