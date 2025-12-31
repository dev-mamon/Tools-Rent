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
    Menu,
} from "lucide-react";
import { usePage, Link, router } from "@inertiajs/react";
import Sidebar from "./Sidebar"; // Import your Sidebar

const Navbar = () => {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [darkMode, setDarkMode] = useState(
        () => localStorage.getItem("theme") === "dark"
    );

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        document.documentElement.classList.toggle("dark", newMode);
        localStorage.setItem("theme", newMode ? "dark" : "light");
    };

    return (
        <>
            <nav className="h-16 md:h-20 bg-white dark:bg-gray-900 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="lg:hidden p-2 text-gray-600 dark:text-gray-300"
                    >
                        <Menu size={24} />
                    </button>

                    <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] dark:from-emerald-400 dark:to-green-300 bg-clip-text text-transparent">
                        Dashboard
                    </h1>

                    <div className="hidden xl:flex items-center gap-6 ml-4">
                        {["Overview", "Analytics", "Tools"].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#2D6A4F] transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 md:gap-6">
                    {/* Search - Hidden on Mobile, shown via icon or expanded on MD */}
                    <div className="hidden md:block relative w-48 lg:w-80">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-12 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <Link
                            href={route("browse-tools")}
                            className="hidden sm:block"
                        >
                            <button className="bg-[#2D6A4F] text-white p-2.5 md:px-5 md:py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2">
                                <span className="hidden md:inline">
                                    List Tool
                                </span>
                                <Plus size={16} />
                            </button>
                        </Link>

                        <button
                            onClick={toggleDarkMode}
                            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <img
                                    src={
                                        auth.user.avatar
                                            ? `/storage/${auth.user.avatar}`
                                            : `https://ui-avatars.com/api/?name=${auth.user.name}&background=2D6A4F&color=fff`
                                    }
                                    className="w-8 h-8 md:w-10 md:h-10 rounded-xl object-cover"
                                    alt="User"
                                />
                                <ChevronDown
                                    size={14}
                                    className={`hidden md:block text-gray-400 transition-transform ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2 z-50">
                                    <Link
                                        href={route("user.setting.index")}
                                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                    >
                                        <User size={16} />{" "}
                                        <span className="text-sm">Profile</span>
                                    </Link>
                                    <button
                                        onClick={() =>
                                            router.post(route("logout"))
                                        }
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50"
                                    >
                                        <LogOut size={16} />{" "}
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

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[60] lg:hidden">
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setMobileMenuOpen(false)}
                    ></div>
                    <div className="fixed inset-y-0 left-0 w-[280px] bg-white dark:bg-gray-900 shadow-xl">
                        <Sidebar
                            isMobile={true}
                            closeSidebar={() => setMobileMenuOpen(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
