import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import NavItem from "./NavItem";

export default function Navbar() {
    const [isSticky, setIsSticky] = useState(false);
    const { url } = usePage(); // Inertia-র বর্তমান URL পাওয়ার জন্য

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Browse tools", href: "/browse-tools" },
        { name: "How it works", href: "/how-it-works" },
    ];

    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 w-[95%] max-w-7xl
            /* লাইট মোড স্টাইল */
            bg-white text-gray-900 shadow-lg
            /* ডার্ক মোড স্টাইল */
            dark:bg-gray-900/90 dark:text-white dark:backdrop-blur-md dark:border-gray-800 rounded-full flex justify-between items-center px-8 py-3 ${
                isSticky
                    ? "top-4 shadow-2xl border border-gray-100 dark:border-gray-700"
                    : "top-6"
            }`}
        >
            {/* Logo */}
            <Link href="/" className="flex items-center">
                <img
                    src="/assets/images/logo.png"
                    alt="Logo"
                    // ডার্ক মোডে লোগো সাদা করার জন্য invert ব্যবহার করা হয়েছে
                    className="h-9 w-auto dark:invert dark:brightness-200"
                />
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-10">
                {navLinks.map((link) => (
                    <NavItem
                        key={link.href}
                        href={link.href}
                        // Inertia-র url ব্যবহার করে active state চেক করা ভালো
                        active={url === link.href}
                    >
                        {link.name}
                    </NavItem>
                ))}
            </div>

            {/* Right Buttons */}
            <div className="flex items-center space-x-4">
                <Link
                    href="/browse-tools"
                    className="hidden sm:block rounded-full border border-[#10513D] dark:border-emerald-500 px-6 py-2 text-sm font-bold text-[#10513D] dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all"
                >
                    List Tool
                </Link>
                <Link
                    href="/login"
                    className="flex items-center rounded-full bg-[#40885A] dark:bg-emerald-600 px-6 py-2 text-sm font-bold text-white hover:bg-[#10513D] dark:hover:bg-emerald-700 transition-all shadow-md active:scale-95"
                >
                    Get Started <span className="ml-2">→</span>
                </Link>
            </div>
        </nav>
    );
}
