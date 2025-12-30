import React, { useState } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { useForm, Head } from "@inertiajs/react";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function Password() {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            current_password: "",
            password: "",
            password_confirmation: "",
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("user.setting.update-password"), {
            onSuccess: () => reset(),
            onError: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <UserLayout>
            <Head title="Update Password" />
            {/* transition-colors add kora hoyeche */}
            <div className="max-w-2xl mx-auto transition-colors duration-300">
                <h2 className="text-[20px] font-bold mb-8 text-center text-gray-800 dark:text-white">
                    Update Security Password
                </h2>

                <form
                    onSubmit={handleSubmit}
                    /* bg-white dark:bg-gray-900 border dark:border-gray-800 */
                    className="bg-white dark:bg-gray-900 p-10 rounded-[24px] shadow-sm space-y-6 border border-transparent dark:border-gray-800"
                >
                    <div className="flex justify-center mb-6 text-[#437C61] dark:text-emerald-400">
                        {/* icon container dark mode-e deep emerald hobe */}
                        <div className="bg-[#E7EEEC] dark:bg-emerald-500/10 p-4 rounded-full">
                            <Lock size={32} />
                        </div>
                    </div>

                    <div className="space-y-5">
                        {/* Current Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showCurrent ? "text" : "password"}
                                    value={data.current_password}
                                    onChange={(e) => {
                                        setData(
                                            "current_password",
                                            e.target.value
                                        );
                                        clearErrors("current_password");
                                    }}
                                    /* bg-gray-50 dark:bg-gray-800 dark:text-white */
                                    className={`w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-[14px] text-sm focus:ring-2 focus:ring-[#437C61] dark:focus:ring-emerald-500 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                                        errors.current_password
                                            ? "ring-2 ring-red-500"
                                            : ""
                                    }`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrent(!showCurrent)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                >
                                    {showCurrent ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                            {errors.current_password && (
                                <p className="text-red-500 text-xs mt-1 ml-1 font-semibold">
                                    {errors.current_password}
                                </p>
                            )}
                        </div>

                        {/* New Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showNew ? "text" : "password"}
                                    value={data.password}
                                    onChange={(e) => {
                                        setData("password", e.target.value);
                                        clearErrors("password");
                                    }}
                                    className={`w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-[14px] text-sm focus:ring-2 focus:ring-[#437C61] dark:focus:ring-emerald-500 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                                        errors.password
                                            ? "ring-2 ring-red-500"
                                            : ""
                                    }`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNew(!showNew)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                >
                                    {showNew ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1 ml-1 font-semibold">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                                Confirm New Password
                            </label>
                            <input
                                type={showNew ? "text" : "password"}
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-[14px] text-sm focus:ring-2 focus:ring-[#437C61] dark:focus:ring-emerald-500 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            disabled={processing}
                            /* dark mode button color check */
                            className="w-full bg-[#437C61] dark:bg-emerald-600 text-white py-3.5 rounded-[14px] font-bold text-sm hover:bg-[#36634d] dark:hover:bg-emerald-700 transition-all shadow-md disabled:opacity-50"
                        >
                            {processing ? "Updating..." : "Update Password"}
                        </button>
                    </div>
                </form>
            </div>
        </UserLayout>
    );
}
