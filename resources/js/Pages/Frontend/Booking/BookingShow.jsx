import React from "react";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Navbar from "@/Components/Frontend/Navbar";
import {
    ArrowLeft,
    Calendar,
    CheckCircle2,
    Clock,
    MapPin,
    Settings,
    User,
    CreditCard,
    Shield,
    Printer,
    Download,
    MessageCircle,
    Edit,
    HelpCircle,
    Truck,
    ShieldCheck,
    BadgeCheck,
    Package,
    AlertCircle,
    ChevronRight,
    DollarSign,
    Info,
    Phone,
    Mail,
    CalendarDays,
    Package2,
    FileText,
} from "lucide-react";
import { format } from "date-fns";

const BookingShow = ({ booking }) => {
    const formatCurrency = (value) => {
        const num = Number(value);
        return isNaN(num) ? "0.00" : num.toFixed(2);
    };

    const statusConfig = {
        pending: {
            color: "border-amber-200 bg-gradient-to-r from-amber-50 to-amber-25",
            icon: Clock,
            badge: "bg-amber-100 text-amber-800",
            ring: "ring-amber-200",
        },
        confirmed: {
            color: "border-emerald-200 bg-gradient-to-r from-emerald-50 to-emerald-25",
            icon: CheckCircle2,
            badge: "bg-emerald-100 text-emerald-800",
            ring: "ring-emerald-200",
        },
        in_progress: {
            color: "border-blue-200 bg-gradient-to-r from-blue-50 to-blue-25",
            icon: Truck,
            badge: "bg-blue-100 text-blue-800",
            ring: "ring-blue-200",
        },
        completed: {
            color: "border-gray-200 bg-gradient-to-r from-gray-50 to-gray-25",
            icon: BadgeCheck,
            badge: "bg-gray-100 text-gray-800",
            ring: "ring-gray-200",
        },
        cancelled: {
            color: "border-red-200 bg-gradient-to-r from-red-50 to-red-25",
            icon: AlertCircle,
            badge: "bg-red-100 text-red-800",
            ring: "ring-red-200",
        },
    };

    const statusLabels = {
        pending: "Pending Confirmation",
        confirmed: "Confirmed",
        in_progress: "In Progress",
        completed: "Completed",
        cancelled: "Cancelled",
    };

    const StatusIcon = statusConfig[booking?.status]?.icon || Clock;
    const statusColor = statusConfig[booking?.status];

    // Progress steps based on status
    const getProgressSteps = () => {
        const steps = [
            { id: 1, name: "Request Sent", status: "completed" },
            {
                id: 2,
                name: "Confirmed",
                status:
                    booking?.status === "pending" ? "upcoming" : "completed",
            },
            {
                id: 3,
                name: "Payment",
                status: ["confirmed", "in_progress", "completed"].includes(
                    booking?.status
                )
                    ? "completed"
                    : "upcoming",
            },
            {
                id: 4,
                name: "In Progress",
                status: ["in_progress", "completed"].includes(booking?.status)
                    ? "completed"
                    : "upcoming",
            },
            {
                id: 5,
                name: "Completed",
                status:
                    booking?.status === "completed" ? "completed" : "upcoming",
            },
        ];

        if (booking?.status === "cancelled") {
            return steps.map((step) => ({
                ...step,
                status: step.id === 1 ? "completed" : "cancelled",
            }));
        }

        return steps;
    };

    return (
        <GuestLayout>
            <Head title={`Booking #${booking?.id}`} />
            <Navbar />

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-28 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <Link
                                href="/bookings"
                                className="group inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <div className="p-2 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                                    <ArrowLeft size={18} />
                                </div>
                                <span className="font-medium">My Bookings</span>
                            </Link>

                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:shadow-sm transition-all">
                                    <Printer
                                        size={18}
                                        className="text-gray-600"
                                    />
                                    <span className="font-medium text-gray-700">
                                        Print
                                    </span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:shadow-sm transition-all">
                                    <Download
                                        size={18}
                                        className="text-gray-600"
                                    />
                                    <span className="font-medium text-gray-700">
                                        Download
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        Booking #{booking?.id}
                                    </h1>
                                    <span
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium ${statusColor?.badge}`}
                                    >
                                        {statusLabels[booking?.status]}
                                    </span>
                                </div>
                                <p className="text-gray-600 flex items-center gap-2">
                                    <Calendar size={16} />
                                    Created on{" "}
                                    {booking?.created_at
                                        ? format(
                                              new Date(booking.created_at),
                                              "MMMM dd, yyyy"
                                          )
                                        : "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Booking Progress
                            </h2>
                            <span className="text-sm text-gray-500">
                                {statusLabels[booking?.status]}
                            </span>
                        </div>
                        <div className="relative">
                            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200"></div>
                            <div
                                className="absolute top-5 left-0 h-1 bg-emerald-500 transition-all duration-500"
                                style={{
                                    width:
                                        booking?.status === "pending"
                                            ? "20%"
                                            : booking?.status === "confirmed"
                                            ? "40%"
                                            : booking?.status === "in_progress"
                                            ? "80%"
                                            : "100%",
                                }}
                            ></div>
                            <div className="relative flex justify-between">
                                {getProgressSteps().map((step, index) => (
                                    <div
                                        key={step.id}
                                        className="flex flex-col items-center"
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 z-10
                                            ${
                                                step.status === "completed"
                                                    ? "bg-emerald-500 text-white"
                                                    : step.status ===
                                                      "cancelled"
                                                    ? "bg-red-500 text-white"
                                                    : "bg-white border-2 border-gray-300 text-gray-400"
                                            }`}
                                        >
                                            {step.status === "completed" ? (
                                                <CheckCircle2 size={20} />
                                            ) : step.status === "cancelled" ? (
                                                <AlertCircle size={20} />
                                            ) : (
                                                <span className="font-semibold">
                                                    {step.id}
                                                </span>
                                            )}
                                        </div>
                                        <span
                                            className={`text-sm font-medium ${
                                                step.status === "completed"
                                                    ? "text-emerald-700"
                                                    : step.status ===
                                                      "cancelled"
                                                    ? "text-red-700"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {step.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Tool Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-blue-50 rounded-xl">
                                                <Package2
                                                    size={22}
                                                    className="text-blue-600"
                                                />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-900">
                                                    Tool Details
                                                </h2>
                                                <p className="text-sm text-gray-500">
                                                    Rented tool information
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/tools/${booking?.tool?.id}`}
                                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            View Details{" "}
                                            <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="md:w-2/5">
                                            <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 shadow-inner">
                                                <img
                                                    src={
                                                        booking?.tool
                                                            ?.images?.[0]
                                                            ?.image_path
                                                            ? `/storage/${booking.tool.images[0].image_path}`
                                                            : "/assets/images/placeholder.jpg"
                                                    }
                                                    alt={booking?.tool?.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:w-3/5">
                                            <div className="mb-4">
                                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                    {booking?.tool?.name ||
                                                        "Tool Name"}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                                    <span className="flex items-center gap-1">
                                                        <Settings size={14} />
                                                        {booking?.tool
                                                            ?.condition ||
                                                            "Good Condition"}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin size={14} />
                                                        {booking?.tool?.location_address?.split(
                                                            ","
                                                        )[0] || "Location"}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700">
                                                    {booking?.tool?.description?.substring(
                                                        0,
                                                        150
                                                    )}
                                                    {booking?.tool?.description
                                                        ?.length > 150 && "..."}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="p-3 bg-gray-50 rounded-lg">
                                                    <p className="text-xs text-gray-500 mb-1">
                                                        Daily Rate
                                                    </p>
                                                    <p className="text-lg font-bold text-gray-900">
                                                        $
                                                        {formatCurrency(
                                                            booking?.price_per_day
                                                        )}
                                                        /day
                                                    </p>
                                                </div>
                                                <div className="p-3 bg-gray-50 rounded-lg">
                                                    <p className="text-xs text-gray-500 mb-1">
                                                        Rental Period
                                                    </p>
                                                    <p className="font-semibold text-gray-900">
                                                        {booking?.total_days}{" "}
                                                        {booking?.total_days ===
                                                        1
                                                            ? "Day"
                                                            : "Days"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Rental Timeline */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 bg-purple-50 rounded-xl">
                                        <CalendarDays
                                            size={22}
                                            className="text-purple-600"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            Rental Timeline
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            Important dates and times
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-emerald-50 rounded-xl">
                                            <Calendar
                                                size={20}
                                                className="text-emerald-600"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500 mb-1">
                                                Pickup Date
                                            </p>
                                            <p className="font-semibold text-gray-900">
                                                {booking?.start_date
                                                    ? format(
                                                          new Date(
                                                              booking.start_date
                                                          ),
                                                          "EEEE, MMMM dd, yyyy"
                                                      )
                                                    : "N/A"}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Expected by 2:00 PM
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-amber-50 rounded-xl">
                                            <Calendar
                                                size={20}
                                                className="text-amber-600"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500 mb-1">
                                                Return Date
                                            </p>
                                            <p className="font-semibold text-gray-900">
                                                {booking?.end_date
                                                    ? format(
                                                          new Date(
                                                              booking.end_date
                                                          ),
                                                          "EEEE, MMMM dd, yyyy"
                                                      )
                                                    : "N/A"}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Return by 12:00 PM
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-50 rounded-xl">
                                            <Clock
                                                size={20}
                                                className="text-blue-600"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-500 mb-1">
                                                Duration
                                            </p>
                                            <div className="flex items-center gap-6">
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {booking?.total_days}{" "}
                                                        Days
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Total rental period
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {booking?.quantity} Unit
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Quantity rented
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Special Instructions */}
                            {booking?.special_instructions && (
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-white rounded-xl shadow-sm">
                                            <FileText
                                                size={20}
                                                className="text-blue-600"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">
                                                Special Instructions
                                            </h3>
                                            <p className="text-gray-700 bg-white/50 p-4 rounded-lg">
                                                {booking.special_instructions}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Payment Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-emerald-50 rounded-xl">
                                            <CreditCard
                                                size={22}
                                                className="text-emerald-600"
                                            />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">
                                                Payment Summary
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                Total charges and fees
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-600">
                                                Daily Rate ×{" "}
                                                {booking?.total_days} days
                                            </span>
                                            <span className="font-semibold">
                                                $
                                                {formatCurrency(
                                                    booking?.sub_total
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-600">
                                                Booking Fee
                                            </span>
                                            <span className="font-semibold">
                                                $
                                                {formatCurrency(
                                                    booking?.booking_fee
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-600">
                                                Service Charge
                                            </span>
                                            <span className="font-semibold">
                                                $5.00
                                            </span>
                                        </div>

                                        <div className="border-t border-gray-200 pt-4 mt-2">
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-gray-900">
                                                    Total Amount
                                                </span>
                                                <span className="font-bold text-2xl text-emerald-700">
                                                    $
                                                    {formatCurrency(
                                                        booking?.total_amount
                                                    )}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Paid on{" "}
                                                {booking?.created_at
                                                    ? format(
                                                          new Date(
                                                              booking.created_at
                                                          ),
                                                          "MMM dd, yyyy"
                                                      )
                                                    : "N/A"}
                                            </p>
                                        </div>

                                        {booking?.payment && (
                                            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="p-1.5 bg-white rounded-lg">
                                                        <ShieldCheck
                                                            size={14}
                                                            className="text-gray-600"
                                                        />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">
                                                        Payment Verified
                                                    </span>
                                                </div>
                                                <div className="text-xs text-gray-600 space-y-1">
                                                    <p>
                                                        Method:{" "}
                                                        {booking.payment.payment_method?.replace(
                                                            "_",
                                                            " "
                                                        )}
                                                    </p>
                                                    <p>
                                                        Transaction:{" "}
                                                        {
                                                            booking.payment
                                                                .transaction_id
                                                        }
                                                    </p>
                                                    <p>
                                                        Status:{" "}
                                                        <span className="font-medium capitalize">
                                                            {
                                                                booking.payment
                                                                    .status
                                                            }
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Contact Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-indigo-50 rounded-xl">
                                            <User
                                                size={22}
                                                className="text-indigo-600"
                                            />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">
                                                Contacts
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                Renter and lender details
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    {/* Lender */}
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
                                                <img
                                                    src={
                                                        booking?.lender
                                                            ?.profile_photo_url ||
                                                        `https://ui-avatars.com/api/?name=${booking?.lender?.name}&background=4F46E5&color=fff`
                                                    }
                                                    alt={booking?.lender?.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">
                                                    Lender
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {booking?.lender?.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                                                <MessageCircle size={16} />
                                                <span>Send Message</span>
                                            </button>
                                            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                                                <Phone size={16} />
                                                <span>Call</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Renter */}
                                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-emerald-100 to-green-100">
                                                <img
                                                    src={
                                                        booking?.renter
                                                            ?.profile_photo_url ||
                                                        `https://ui-avatars.com/api/?name=${booking?.renter?.name}&background=059669&color=fff`
                                                    }
                                                    alt={booking?.renter?.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">
                                                    You (Renter)
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {booking?.renter?.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <p className="flex items-center gap-2">
                                                <Mail size={14} />
                                                {booking?.renter?.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions Card */}
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        Need Help?
                                    </h3>
                                    <p className="text-gray-300 text-sm">
                                        Our support team is here to assist you
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/20 rounded-lg">
                                                <MessageCircle
                                                    size={18}
                                                    className="text-white"
                                                />
                                            </div>
                                            <span className="font-medium text-white">
                                                Chat Support
                                            </span>
                                        </div>
                                        <ChevronRight
                                            size={18}
                                            className="text-gray-300"
                                        />
                                    </button>

                                    <button className="w-full flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/20 rounded-lg">
                                                <Phone
                                                    size={18}
                                                    className="text-white"
                                                />
                                            </div>
                                            <span className="font-medium text-white">
                                                Call Support
                                            </span>
                                        </div>
                                        <ChevronRight
                                            size={18}
                                            className="text-gray-300"
                                        />
                                    </button>

                                    <button className="w-full flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/20 rounded-lg">
                                                <HelpCircle
                                                    size={18}
                                                    className="text-white"
                                                />
                                            </div>
                                            <span className="font-medium text-white">
                                                FAQ
                                            </span>
                                        </div>
                                        <ChevronRight
                                            size={18}
                                            className="text-gray-300"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default BookingShow;
