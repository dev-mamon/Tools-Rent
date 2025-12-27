import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";
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

export default function ProfileSettings() {
    return (
        <UserLayout>
            {/* মূল ব্যাকগ্রাউন্ড কন্টেইনার - আপনার লেআউট ঠিক রেখে শুধু এটি যোগ করা হয়েছে */}
            <div className="min-h-screen bg-[#F8FAFB] relative overflow-hidden -m-4 p-6 md:p-10">
                {/* হালকা ডেকোরেটিভ ব্যাকগ্রাউন্ড ব্লার (ঐচ্ছিক) */}
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#437C61]/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#437C61]/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative z-10 space-y-10 font-sans text-[#1A1A1A]">
                    {/* 1. TOP PROFILE CARD */}
                    <div className="bg-white p-8 rounded-[24px] shadow-[0px_10px_30px_-5px_rgba(0,0,0,0.03)] border border-white/50 flex items-center gap-6 relative max-w-full">
                        <div className="relative">
                            <img
                                src="https://i.pravatar.cc/150?u=musfiq"
                                className="w-24 h-24 rounded-2xl object-cover"
                                alt="User Profile"
                            />
                            <button className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow-md border border-gray-50 text-[#437C61]">
                                <Edit3 size={14} />
                            </button>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold">Musfiq</h2>
                            <p className="text-gray-400 text-xs">User</p>
                            <div className="mt-3 space-y-1">
                                <p className="text-[13px] text-gray-600 font-medium">
                                    Mail : email@mail.com
                                </p>
                                <p className="text-[13px] text-gray-600 font-medium">
                                    Phone : +923787248724872
                                </p>
                            </div>
                            <Link
                                href={route("user.setting.edit-profile")}
                                className="inline-block mt-4 px-8 py-1.5 border border-[#437C61] text-[#437C61] text-[12px] font-bold rounded-full hover:bg-[#437C61] hover:text-white transition-all"
                            >
                                Edit Profile
                            </Link>
                        </div>
                    </div>

                    {/* 2. TWO COLUMN GRID LAYOUT */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
                        {/* LEFT COLUMN: Security & Policies */}
                        <div className="space-y-8">
                            {/* Security Section */}
                            <div className="space-y-4">
                                <h3 className="text-[20px] font-bold">
                                    Security
                                </h3>
                                <Link
                                    href={route("user.setting.edit-password")}
                                    className="bg-white rounded-[16px] p-5 flex justify-between items-center shadow-sm border border-transparent hover:border-[#437C61]/20 cursor-pointer hover:bg-gray-50 transition-all w-full"
                                >
                                    <div className="flex items-center gap-3">
                                        <Key
                                            size={20}
                                            className="text-gray-400"
                                        />
                                        <span className="text-[15px] font-semibold">
                                            Change Password
                                        </span>
                                    </div>
                                    <ChevronRight
                                        size={20}
                                        className="text-gray-300"
                                    />
                                </Link>
                            </div>

                            {/* Our Policies */}
                            <div className="space-y-4">
                                <h3 className="text-[20px] font-bold">
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
                                            label: "Comission Policy",
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
                                            className="bg-white rounded-[16px] p-5 flex justify-between items-center shadow-sm border border-transparent hover:border-[#437C61]/20 cursor-pointer hover:bg-gray-50 transition-all w-full"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-gray-400">
                                                    {item.icon}
                                                </span>
                                                <span className="text-[15px] font-semibold">
                                                    {item.label}
                                                </span>
                                            </div>
                                            <ChevronRight
                                                size={20}
                                                className="text-gray-300"
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Notification & Account */}
                        <div className="space-y-8">
                            {/* Notification */}
                            <div className="space-y-4">
                                <h3 className="text-[20px] font-bold">
                                    Notification
                                </h3>
                                <div className="bg-white rounded-[16px] p-5 flex justify-between items-center shadow-sm border border-transparent">
                                    <div className="flex items-center gap-3">
                                        <Bell
                                            size={20}
                                            className="text-gray-400"
                                        />
                                        <span className="text-[15px] font-semibold">
                                            Allow Alert message
                                        </span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            defaultChecked
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#437C61]"></div>
                                    </label>
                                </div>
                            </div>

                            {/* Account Management */}
                            <div className="space-y-4">
                                <h3 className="text-[20px] font-bold">
                                    Account
                                </h3>
                                <div className="space-y-3">
                                    {/* Log Out */}
                                    <div className="bg-white rounded-[16px] p-5 flex justify-between items-center shadow-sm border border-transparent">
                                        <div className="flex items-center gap-3 text-orange-600 font-semibold">
                                            <LogOut size={20} />
                                            <span className="text-[15px]">
                                                Log Out
                                            </span>
                                        </div>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="bg-[#D32F2F] text-white px-6 py-2 rounded-xl text-[12px] font-bold hover:bg-red-700 transition-colors"
                                        >
                                            Log Out
                                        </Link>
                                    </div>
                                    {/* Delete Account */}
                                    <div className="bg-white rounded-[16px] p-5 flex justify-between items-center shadow-sm border border-transparent">
                                        <div className="flex items-center gap-3 text-orange-600 font-semibold">
                                            <Trash2 size={20} />
                                            <span className="text-[15px]">
                                                Delete Account
                                            </span>
                                        </div>
                                        <button className="bg-[#D32F2F] text-white px-6 py-2 rounded-xl text-[12px] font-bold hover:bg-red-700 transition-colors">
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
