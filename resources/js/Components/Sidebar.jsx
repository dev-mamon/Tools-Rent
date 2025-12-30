import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import {
    LayoutDashboard,
    List,
    Repeat,
    CircleDollarSign,
    MessageSquare,
    Star,
    Settings,
    LogOut,
} from "lucide-react";

const Sidebar = () => {
    const { url } = usePage();
    const user = usePage().props.auth.user;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };

    const menuItems = [
        {
            icon: <LayoutDashboard size={20} />,
            label: "Dashboard",
            link: route("dashboard"),
            active: url === "/dashboard",
        },
        {
            icon: <List size={20} />,
            label: "My Tools",
            link: route("user.my-listings.index"),
            active: url.startsWith("/user/listings"),
        },
        {
            icon: <Repeat size={20} />,
            label: "My Rentals",
            link: route("user.my-rentals.index"),
            active: url.startsWith("/user/rentals"),
        },
        {
            icon: <CircleDollarSign size={20} />,
            label: "Earnings",
            link: route("user.earnings.index"),
            active: url.startsWith("/user/earnings"),
        },
        {
            icon: <MessageSquare size={20} />,
            label: "Message",
            link: route("user.message.index"),
            active: url.startsWith("/user/message"),
        },
        {
            icon: <Star size={20} />,
            label: "Reviews",
            link: route("user.review.index"),
            active: url.startsWith("/user/review"),
        },
        {
            icon: <Settings size={20} />,
            label: "Settings",
            link: route("user.setting.index"),
            active: url.startsWith("/user/setting"),
        },
    ];

    return (
        <aside className="w-[280px] bg-white dark:bg-gray-900 h-screen sticky top-0 border-r border-gray-100 dark:border-gray-800 flex flex-col py-8 z-20 transition-all duration-300">
            {/* Logo Section */}
            <div className="px-8 mb-10">
                <Link href="/" className="block">
                    <img
                        src="/assets/images/logo.png"
                        alt="Logo"
                        // dark:invert কালো লোগোকে ডার্ক মোডে সাদা করে দিবে
                        className="w-40 object-contain transition-all duration-300 dark:invert brightness-110 contrast-125 dark:brightness-200"
                    />
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                <p className="px-4 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                    Main Menu
                </p>
                {menuItems.map((item, idx) => (
                    <Link
                        key={idx}
                        href={item.link}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl group transition-all duration-200 ${
                            item.active
                                ? "bg-[#2D6A4F] text-white shadow-lg shadow-green-900/20"
                                : "text-gray-500 dark:text-gray-400 hover:bg-[#F8FBFA] dark:hover:bg-gray-800 hover:text-[#2D6A4F] dark:hover:text-emerald-400"
                        }`}
                    >
                        <span
                            className={
                                item.active
                                    ? "text-white"
                                    : "text-gray-400 group-hover:text-[#2D6A4F] dark:group-hover:text-emerald-400 transition-colors"
                            }
                        >
                            {item.icon}
                        </span>
                        <span className="font-bold text-[15px]">
                            {item.label}
                        </span>
                    </Link>
                ))}
            </nav>

            {/* User Profile & Logout Card */}
            <div className="mx-4 mt-auto bg-gray-50 dark:bg-gray-800/50 p-4 rounded-3xl border border-gray-100 dark:border-gray-700 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#2D6A4F] flex items-center justify-center text-white font-bold shadow-sm">
                        {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate leading-tight">
                            {user.name}
                        </p>
                        <p className="text-[11px] font-medium text-[#2D6A4F] dark:text-emerald-400 bg-[#EBF2F0] dark:bg-emerald-500/10 inline-block px-2 py-0.5 rounded-full mt-1">
                            {user.is_admin
                                ? "Administrator"
                                : "Verified Member"}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-gray-900 text-red-500 border border-red-50 dark:border-red-500/20 rounded-2xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200 group"
                >
                    <LogOut
                        size={18}
                        className="group-hover:-translate-x-1 transition-transform"
                    />
                    <span className="text-sm font-bold">Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
