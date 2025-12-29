import React, { useState } from "react";
import { Head, usePage, Link, router } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Navbar from "@/Components/Frontend/Navbar";
import {
    ArrowLeft,
    Calendar,
    CreditCard,
    Shield,
    CheckCircle2,
    User,
    MapPin,
    Settings,
    Clock,
    AlertCircle,
} from "lucide-react";
import { format } from "date-fns";

const Checkout = () => {
    const { props } = usePage();
    const { tool, bookingData } = props;

    const [formData, setFormData] = useState({
        special_instructions: "",
        payment_method: "stripe",
        agree_terms: false,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        const newErrors = {};
        if (!formData.agree_terms) {
            newErrors.agree_terms =
                "You must agree to the terms and conditions";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        // Submit booking request
        router.post(
            route("bookings.store", { tool: tool.id }),
            {
                ...bookingData,
                ...formData,
            },
            {
                onFinish: () => setIsSubmitting(false),
            }
        );
    };

    const paymentMethods = [
        { id: "stripe", name: "Credit/Debit Card", icon: CreditCard },
        { id: "paypal", name: "PayPal", icon: CreditCard },
        { id: "bank_transfer", name: "Bank Transfer", icon: CreditCard },
        { id: "cash", name: "Cash on Delivery", icon: CreditCard },
    ];

    return (
        <GuestLayout>
            <Head title="Checkout - Complete Your Booking" />
            <Navbar />

            <div className="min-h-screen bg-gray-50 pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="#" className="hover:text-gray-700">
                            {tool.name}
                        </Link>
                        <ArrowLeft size={14} className="rotate-180" />
                        <span className="font-semibold text-black">
                            Checkout
                        </span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Booking Details */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    Complete Your Booking
                                </h1>
                                <p className="text-gray-600">
                                    Please review your booking details and
                                    complete the payment
                                </p>
                            </div>

                            {/* Booking Summary */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">
                                    Booking Summary
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {/* Tool Info */}
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-3">
                                            Tool Details
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
                                                    <img
                                                        src={
                                                            tool.images?.[0]
                                                                ?.image_path
                                                                ? `/storage/${tool.images[0].image_path}`
                                                                : "/assets/images/placeholder.jpg"
                                                        }
                                                        alt={tool.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900">
                                                        {tool.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        ${tool.price_per_day}
                                                        /day
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <Settings size={16} />
                                                <span>
                                                    Condition:{" "}
                                                    {tool.condition ||
                                                        "Excellent"}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <MapPin size={16} />
                                                <span>
                                                    {tool.location_address}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rental Period */}
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-3">
                                            Rental Period
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <Calendar
                                                        size={18}
                                                        className="text-gray-400"
                                                    />
                                                    <div>
                                                        <p className="text-xs text-gray-500">
                                                            Start Date
                                                        </p>
                                                        <p className="font-semibold text-gray-900">
                                                            {format(
                                                                new Date(
                                                                    bookingData.start_date
                                                                ),
                                                                "MMM dd, yyyy"
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <ArrowLeft
                                                    size={16}
                                                    className="text-gray-400 rotate-180"
                                                />
                                                <div className="flex items-center gap-3">
                                                    <Calendar
                                                        size={18}
                                                        className="text-gray-400"
                                                    />
                                                    <div>
                                                        <p className="text-xs text-gray-500">
                                                            End Date
                                                        </p>
                                                        <p className="font-semibold text-gray-900">
                                                            {format(
                                                                new Date(
                                                                    bookingData.end_date
                                                                ),
                                                                "MMM dd, yyyy"
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-3 bg-gray-50 rounded-lg">
                                                    <p className="text-xs text-gray-500">
                                                        Duration
                                                    </p>
                                                    <p className="font-semibold text-gray-900">
                                                        {bookingData.total_days}{" "}
                                                        {bookingData.total_days ===
                                                        1
                                                            ? "Day"
                                                            : "Days"}
                                                    </p>
                                                </div>
                                                <div className="p-3 bg-gray-50 rounded-lg">
                                                    <p className="text-xs text-gray-500">
                                                        Quantity
                                                    </p>
                                                    <p className="font-semibold text-gray-900">
                                                        {bookingData.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing Breakdown */}
                                <div className="border-t pt-6">
                                    <h3 className="font-semibold text-gray-800 mb-4">
                                        Pricing Breakdown
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">
                                                ${bookingData.price_per_day} ×{" "}
                                                {bookingData.total_days} days ×{" "}
                                                {bookingData.quantity}
                                            </span>
                                            <span className="font-semibold text-gray-900">
                                                $
                                                {bookingData.sub_total.toFixed(
                                                    2
                                                )}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">
                                                Booking Fee
                                            </span>
                                            <span className="font-semibold text-gray-900">
                                                $
                                                {bookingData.booking_fee.toFixed(
                                                    2
                                                )}
                                            </span>
                                        </div>

                                        <div className="border-t pt-3 mt-3">
                                            <div className="flex justify-between items-center font-bold text-lg">
                                                <span className="text-gray-900">
                                                    Total Amount
                                                </span>
                                                <span className="text-[#10513D]">
                                                    $
                                                    {bookingData.total_amount.toFixed(
                                                        2
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Lender Information */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">
                                    Lender Information
                                </h2>

                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                                        <img
                                            src={
                                                tool.user?.profile_photo_url ||
                                                `https://ui-avatars.com/api/?name=${tool.user?.name}`
                                            }
                                            alt={tool.user?.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900">
                                            {tool.user?.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Tool Owner
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex items-center gap-1">
                                                <CheckCircle2
                                                    size={14}
                                                    className="text-green-600"
                                                />
                                                <span className="text-xs text-gray-600">
                                                    Verified Lender
                                                </span>
                                            </div>
                                            <span className="text-gray-300">
                                                •
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <Clock
                                                    size={14}
                                                    className="text-gray-400"
                                                />
                                                <span className="text-xs text-gray-600">
                                                    Response time: 2 hours
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Special Instructions */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">
                                    Special Instructions (Optional)
                                </h2>

                                <div className="space-y-4">
                                    <textarea
                                        name="special_instructions"
                                        value={formData.special_instructions}
                                        onChange={handleInputChange}
                                        rows="4"
                                        placeholder="Any special requirements or instructions for the lender..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#10513D] focus:border-transparent outline-none resize-none"
                                    />
                                    <p className="text-sm text-gray-500">
                                        Please provide any specific details
                                        about pickup, usage, or other
                                        requirements.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Payment & Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-32 space-y-6">
                                {/* Payment Method */}
                                <div className="bg-white rounded-2xl shadow-sm p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                                        Payment Method
                                    </h2>

                                    <div className="space-y-3">
                                        {paymentMethods.map((method) => (
                                            <label
                                                key={method.id}
                                                className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                                                    formData.payment_method ===
                                                    method.id
                                                        ? "border-[#10513D] bg-green-50"
                                                        : "border-gray-200 hover:bg-gray-50"
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="payment_method"
                                                    value={method.id}
                                                    checked={
                                                        formData.payment_method ===
                                                        method.id
                                                    }
                                                    onChange={handleInputChange}
                                                    className="h-5 w-5 text-[#10513D] focus:ring-[#10513D]"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <method.icon
                                                            size={20}
                                                            className="text-gray-400"
                                                        />
                                                        <span className="font-medium text-gray-900">
                                                            {method.name}
                                                        </span>
                                                    </div>
                                                    {method.id === "cash" && (
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Pay cash when you
                                                            receive the tool
                                                        </p>
                                                    )}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Terms & Conditions */}
                                <div className="bg-white rounded-2xl shadow-sm p-6">
                                    <div className="space-y-4">
                                        <label className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                name="agree_terms"
                                                checked={formData.agree_terms}
                                                onChange={handleInputChange}
                                                className="h-5 w-5 mt-0.5 text-[#10513D] rounded focus:ring-[#10513D]"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">
                                                    I agree to the Terms &
                                                    Conditions
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    By proceeding, you agree to
                                                    our Rental Agreement,
                                                    Cancellation Policy, and
                                                    Safety Guidelines.
                                                </p>
                                                {errors.agree_terms && (
                                                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                                                        <AlertCircle
                                                            size={14}
                                                        />
                                                        {errors.agree_terms}
                                                    </p>
                                                )}
                                            </div>
                                        </label>

                                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                            <Shield
                                                size={20}
                                                className="text-blue-600"
                                            />
                                            <p className="text-sm text-blue-700">
                                                Your payment is protected by our
                                                secure payment system
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="bg-white rounded-2xl shadow-sm p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                                        Order Summary
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">
                                                Subtotal
                                            </span>
                                            <span className="font-semibold">
                                                $
                                                {bookingData.sub_total.toFixed(
                                                    2
                                                )}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">
                                                Booking Fee
                                            </span>
                                            <span className="font-semibold">
                                                $
                                                {bookingData.booking_fee.toFixed(
                                                    2
                                                )}
                                            </span>
                                        </div>

                                        <div className="border-t pt-4">
                                            <div className="flex justify-between items-center font-bold text-lg">
                                                <span>Total</span>
                                                <span className="text-[#10513D]">
                                                    $
                                                    {bookingData.total_amount.toFixed(
                                                        2
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={
                                            isSubmitting ||
                                            !formData.agree_terms
                                        }
                                        className={`w-full mt-6 py-4 rounded-xl font-bold text-white transition-all ${
                                            isSubmitting ||
                                            !formData.agree_terms
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-[#10513D] hover:bg-[#0c3d2e] active:scale-[0.98]"
                                        }`}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Processing...
                                            </span>
                                        ) : (
                                            `Complete Booking - $${bookingData.total_amount.toFixed(
                                                2
                                            )}`
                                        )}
                                    </button>

                                    <p className="text-center text-xs text-gray-500 mt-4">
                                        You won't be charged until the lender
                                        confirms your booking
                                    </p>
                                </div>

                                {/* Support Info */}
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">
                                        Need help?{" "}
                                        <a
                                            href="#"
                                            className="text-[#10513D] font-medium hover:underline"
                                        >
                                            Contact Support
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default Checkout;
