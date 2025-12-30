import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Link, Head } from "@inertiajs/react";
import {
    ChevronRight,
    Key,
    Bell,
    ShieldCheck,
    FileText,
    Scale,
    LogOut,
    Trash2,
    Edit3,
} from "lucide-react";

export default function ProfileSettings({ user }) {
    return (
        <UserLayout>
            <Head title="Profile Settings" />
            <div className="min-h-screen bg-[#F8FAFB] dark:bg-gray-950 relative overflow-hidden -m-4 p-6 md:p-10 transition-colors duration-300">
                {/* Background Decorations */}
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#437C61]/5 dark:bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#437C61]/5 dark:bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative z-10 space-y-10 font-sans text-[#1A1A1A] dark:text-gray-100">
                    {/* 1. DYNAMIC TOP PROFILE CARD */}
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-[24px] shadow-sm border border-white/50 dark:border-gray-800 flex flex-col md:flex-row items-center gap-6 relative max-w-full">
                        <div className="relative">
                            <img
                                src={
                                    user.avatar
                                        ? `/storage/${user.avatar}`
                                        : `https://ui-avatars.com/api/?name=${user.name}&background=2D6A4F&color=fff`
                                }
                                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-gray-50 dark:ring-gray-800"
                                alt={user.name}
                            />
                            <Link
                                href={route("user.setting.edit-profile")}
                                className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-md border border-gray-50 dark:border-gray-700 text-[#437C61] dark:text-emerald-400"
                            >
                                <Edit3 size={14} />
                            </Link>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="space-y-1">
                                <p className="text-[15px] text-gray-800 dark:text-gray-200 font-semibold">
                                    <span className="text-gray-500 dark:text-gray-400 font-medium text-[13px]">
                                        Name:
                                    </span>{" "}
                                    {user.name}
                                </p>
                                <p className="text-[15px] text-gray-800 dark:text-gray-200 font-semibold">
                                    <span className="text-gray-500 dark:text-gray-400 font-medium text-[13px]">
                                        Email:
                                    </span>{" "}
                                    {user.email}
                                </p>
                                <p className="text-[15px] text-gray-800 dark:text-gray-200 font-semibold">
                                    <span className="text-gray-500 dark:text-gray-400 font-medium text-[13px]">
                                        Phone:
                                    </span>{" "}
                                    {user.phone || "Not Provided"}
                                </p>
                            </div>
                            <Link
                                href={route("user.setting.edit-profile")}
                                className="inline-block mt-4 px-8 py-2 border border-[#437C61] dark:border-emerald-500 text-[#437C61] dark:text-emerald-400 text-[12px] font-bold rounded-full hover:bg-[#437C61] dark:hover:bg-emerald-500 hover:text-white transition-all"
                            >
                                Edit Profile
                            </Link>
                        </div>
                    </div>

                    {/* 2. TWO COLUMN GRID LAYOUT */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
                        {/* LEFT COLUMN: Security & Policies */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-[20px] font-bold text-gray-900 dark:text-white px-2">
                                    Security
                                </h3>
                                <Link
                                    href={route("user.setting.edit-password")}
                                    className="bg-white dark:bg-gray-900 rounded-[16px] p-5 flex justify-between items-center shadow-sm border border-transparent dark:border-gray-800 hover:border-[#437C61]/20 dark:hover:border-emerald-500/30 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all w-full group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-colors">
                                            <Key
                                                size={20}
                                                className="text-gray-400 dark:text-gray-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                                            />
                                        </div>
                                        <span className="text-[15px] font-semibold text-gray-700 dark:text-gray-200">
                                            Change Password
                                        </span>
                                    </div>
                                    <ChevronRight
                                        size={20}
                                        className="text-gray-300 dark:text-gray-600"
                                    />
                                </Link>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-[20px] font-bold text-gray-900 dark:text-white px-2">
                                    Our Policies
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        {
                                            icon: <ShieldCheck size={20} />,
                                            label: "Privacy Policy (GDPR)",
                                            link: "#",
                                        },
                                        {
                                            icon: <Scale size={20} />,
                                            label: "Commission Policy",
                                            link: "#",
                                        },
                                        {
                                            icon: <FileText size={20} />,
                                            label: "Terms & Condition",
                                            link: "#",
                                        },
                                        {
                                            icon: <FileText size={20} />,
                                            label: "Legal Notice",
                                            link: "#",
                                        },
                                    ].map((item, idx) => (
                                        <Link
                                            key={idx}
                                            href={item.link}
                                            className="bg-white dark:bg-gray-900 rounded-[16px] p-5 flex justify-between items-center shadow-sm border border-transparent dark:border-gray-800 hover:border-[#437C61]/20 dark:hover:border-emerald-500/30 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all w-full group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-gray-400 dark:text-gray-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                    {item.icon}
                                                </span>
                                                <span className="text-[15px] font-semibold text-gray-700 dark:text-gray-200">
                                                    {item.label}
                                                </span>
                                            </div>
                                            <ChevronRight
                                                size={20}
                                                className="text-gray-300 dark:text-gray-600"
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Notification & Account */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-[20px] font-bold text-gray-900 dark:text-white px-2">
                                    Notification
                                </h3>
                                <div className="bg-white dark:bg-gray-900 rounded-[16px] p-5 flex justify-between items-center shadow-sm border border-transparent dark:border-gray-800">
                                    <div className="flex items-center gap-3">
                                        <Bell
                                            size={20}
                                            className="text-gray-400 dark:text-gray-500"
                                        />
                                        <span className="text-[15px] font-semibold text-gray-700 dark:text-gray-200">
                                            Allow Alert message
                                        </span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            defaultChecked
                                        />
                                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#437C61] dark:peer-checked:bg-emerald-600"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-[20px] font-bold text-gray-900 dark:text-white px-2">
                                    Account
                                </h3>
                                <div className="space-y-3">
                                    {/* Log Out */}
                                    <div className="bg-white dark:bg-gray-900 rounded-[16px] p-5 flex justify-between items-center shadow-sm border border-transparent dark:border-gray-800">
                                        <div className="flex items-center gap-3 text-orange-600 dark:text-orange-400 font-semibold">
                                            <LogOut size={20} />
                                            <span className="text-[15px]">
                                                Log Out
                                            </span>
                                        </div>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-6 py-2 rounded-xl text-[12px] font-bold hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all"
                                        >
                                            Log Out
                                        </Link>
                                    </div>
                                    {/* Delete Account */}
                                    <div className="bg-white dark:bg-gray-900 rounded-[16px] p-5 flex justify-between items-center shadow-sm border border-transparent dark:border-gray-800">
                                        <div className="flex items-center gap-3 text-red-600 dark:text-red-500 font-semibold">
                                            <Trash2 size={20} />
                                            <span className="text-[15px]">
                                                Delete Account
                                            </span>
                                        </div>
                                        <button className="bg-red-600 text-white px-6 py-2 rounded-xl text-[12px] font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
