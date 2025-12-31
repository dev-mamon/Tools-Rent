import React, { useState, useRef, useEffect } from "react";
import {
    Search,
    Bell,
    ChevronDown,
    Plus,
    LogOut,
    User,
    Sun,
    Moon,
} from "lucide-react";
import { usePage, Link, router } from "@inertiajs/react";

const Navbar = () => {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const dropdownRef = useRef(null);

    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark";
    });

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };

    // ২. থিম টগল ফাংশন
    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [darkMode]);

    return (
        <nav className="h-20 bg-white dark:bg-gray-900 flex items-center justify-between px-8 sticky top-0 z-50 transition-colors duration-300">
            {/* Left Section */}
            <div className="flex items-center gap-10">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#2D6A4F] via-[#4D906E] to-[#1B4332] dark:from-emerald-400 dark:to-green-300 bg-clip-text text-transparent tracking-tight">
                    Dashboard
                </h1>

                <div className="hidden md:flex items-center gap-6">
                    {["Overview", "Analytics", "Tools"].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#2D6A4F] dark:hover:text-emerald-400 transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">
                <div className="relative">
                    <div
                        className={`relative w-80 transition-all duration-300 ${
                            searchFocused ? "scale-105" : ""
                        }`}
                    >
                        <Search
                            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                                searchFocused
                                    ? "text-[#2D6A4F] dark:text-emerald-400"
                                    : "text-gray-400"
                            }`}
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search tools..."
                            className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 dark:focus:ring-emerald-400/20 text-gray-900 dark:text-gray-100"
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link href={route("browse-tools")}>
                        <button className="group relative flex items-center gap-2 bg-[#2D6A4F] dark:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all">
                            <span>List Tool</span>
                            <Plus size={14} />
                        </button>
                    </Link>

                    {/* ডার্ক মোড বাটন - এখন এটি রিফ্রেশ হলেও সঠিক আইকন দেখাবে */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <div className="relative group">
                        <button className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        </button>
                    </div>

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <img
                                src={
                                    auth.user.avatar
                                        ? `/storage/${auth.user.avatar}`
                                        : `https://ui-avatars.com/api/?name=${auth.user.name}&background=2D6A4F&color=fff`
                                }
                                className="w-10 h-10 rounded-xl object-cover ring-2 ring-white dark:ring-gray-800"
                                alt="User"
                            />
                            <div className="hidden lg:block text-left">
                                <p className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-none">
                                    {auth.user.name.split(" ")[0]}
                                </p>
                                <p className="text-[10px] text-[#2D6A4F] dark:text-emerald-400 font-bold uppercase mt-1">
                                    Premium
                                </p>
                            </div>
                            <ChevronDown
                                size={14}
                                className={`text-gray-400 transition-transform ${
                                    isOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2 z-50">
                                <Link
                                    href={route("user.setting.index")}
                                    className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                >
                                    <User size={16} />
                                    <span className="text-sm font-medium">
                                        My Profile
                                    </span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                                >
                                    <LogOut size={16} />
                                    <span className="text-sm font-bold">
                                        Sign Out
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
