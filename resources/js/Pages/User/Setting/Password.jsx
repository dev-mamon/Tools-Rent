import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { useForm } from "@inertiajs/react";
import { Lock } from "lucide-react";

export default function Password() {
    const { data, setData, post, processing, errors, reset } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("update-password"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <UserLayout>
            <div className="max-w-2xl mx-auto">
                <h2 className="text-[20px] font-bold mb-8 text-center">
                    Change Password
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-10 rounded-[24px] shadow-sm space-y-6"
                >
                    <div className="flex justify-center mb-6 text-[#437C61]">
                        <div className="bg-[#E7EEEC] p-4 rounded-full">
                            <Lock size={32} />
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">
                                Current Password
                            </label>
                            <input
                                type="password"
                                onChange={(e) =>
                                    setData("current_password", e.target.value)
                                }
                                className="w-full px-5 py-3 bg-gray-50 border-none rounded-[14px] text-sm focus:ring-2 focus:ring-[#437C61]"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="w-full px-5 py-3 bg-gray-50 border-none rounded-[14px] text-sm focus:ring-2 focus:ring-[#437C61]"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                className="w-full px-5 py-3 bg-gray-50 border-none rounded-[14px] text-sm focus:ring-2 focus:ring-[#437C61]"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            disabled={processing}
                            className="w-full bg-[#437C61] text-white py-3.5 rounded-[14px] font-bold text-sm hover:bg-[#36634d] transition-all shadow-md"
                        >
                            {processing ? "Updating..." : "Update Password"}
                        </button>
                    </div>
                </form>
            </div>
        </UserLayout>
    );
}
