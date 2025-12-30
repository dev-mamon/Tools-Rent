import React, { useState } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { useForm, Head } from "@inertiajs/react";
import { Camera } from "lucide-react";

export default function ProfileUpdate({ user }) {
    const { data, setData, post, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        avatar: null,
        address: user.address || "",
        birth_date: user.birth_date || "",
        gender: user.gender || "",
    });

    const [preview, setPreview] = useState(
        user.avatar
            ? `/storage/${user.avatar}`
            : `https://ui-avatars.com/api/?name=${user.name}&background=2D6A4F&color=fff`
    );

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setData("avatar", file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("user.setting.update-profile"));
    };

    return (
        <UserLayout>
            <Head title="Edit Profile" />
            <div className="max-w-4xl mx-auto transition-colors duration-300">
                <h2 className="text-[22px] font-bold mb-8 text-gray-900 dark:text-white">
                    Edit Profile Settings
                </h2>

                <form
                    onSubmit={handleSubmit}
                    /* bg-white dark:bg-gray-900 border dark:border-gray-800 */
                    className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[32px] shadow-sm space-y-8 border border-transparent dark:border-gray-800"
                >
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center">
                        <div className="relative group">
                            <img
                                src={preview}
                                className="w-28 h-28 rounded-3xl object-cover border-4 border-gray-50 dark:border-gray-800 shadow-md transition-transform group-hover:scale-105"
                                alt="Profile"
                            />
                            <label className="absolute -bottom-2 -right-2 bg-[#437C61] dark:bg-emerald-600 p-2.5 rounded-full shadow-lg cursor-pointer text-white hover:bg-[#36634d] dark:hover:bg-emerald-700 transition-all">
                                <Camera size={18} />
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                            </label>
                        </div>
                        {errors.avatar && (
                            <span className="text-red-500 text-xs mt-3 font-semibold">
                                {errors.avatar}
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-[16px] text-sm focus:ring-2 focus:ring-[#437C61] dark:focus:ring-emerald-500 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-[16px] text-sm focus:ring-2 focus:ring-[#437C61] dark:focus:ring-emerald-500 text-gray-900 dark:text-gray-100"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-[16px] text-sm focus:ring-2 focus:ring-[#437C61] dark:focus:ring-emerald-500 text-gray-900 dark:text-gray-100"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Gender */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                                Gender
                            </label>
                            <select
                                value={data.gender}
                                onChange={(e) =>
                                    setData("gender", e.target.value)
                                }
                                className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-[16px] text-sm focus:ring-2 focus:ring-[#437C61] dark:focus:ring-emerald-500 text-gray-900 dark:text-gray-100 cursor-pointer"
                            >
                                <option value="" className="dark:bg-gray-900">
                                    Select Gender
                                </option>
                                <option
                                    value="male"
                                    className="dark:bg-gray-900"
                                >
                                    Male
                                </option>
                                <option
                                    value="female"
                                    className="dark:bg-gray-900"
                                >
                                    Female
                                </option>
                                <option
                                    value="other"
                                    className="dark:bg-gray-900"
                                >
                                    Other
                                </option>
                            </select>
                        </div>

                        {/* Birth Date */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                                Birth Date
                            </label>
                            <input
                                type="date"
                                value={data.birth_date}
                                onChange={(e) =>
                                    setData("birth_date", e.target.value)
                                }
                                className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-[16px] text-sm focus:ring-2 focus:ring-[#437C61] dark:focus:ring-emerald-500 text-gray-900 dark:text-gray-100 [color-scheme:light] dark:[color-scheme:dark]"
                            />
                        </div>

                        {/* Address */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                                Address
                            </label>
                            <textarea
                                rows="3"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-[16px] text-sm focus:ring-2 focus:ring-[#437C61] dark:focus:ring-emerald-500 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                placeholder="Enter your full address"
                            />
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            disabled={processing}
                            className="w-full bg-[#437C61] dark:bg-emerald-600 text-white py-4 rounded-[18px] font-bold text-sm hover:bg-[#36634d] dark:hover:bg-emerald-700 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
                        >
                            {processing ? "Saving Changes..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </UserLayout>
    );
}
