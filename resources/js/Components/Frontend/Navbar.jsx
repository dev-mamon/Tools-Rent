import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import NavItem from "./NavItem"; // একই ফোল্ডার থেকে ইম্পোর্ট

export default function Navbar() {
    const [isSticky, setIsSticky] = useState(false);

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
            className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 w-[95%] max-w-7xl bg-white rounded-full shadow-lg px-8 py-3 flex justify-between items-center ${
                isSticky ? "top-4 shadow-2xl border border-gray-100" : "top-6"
            }`}
        >
            {/* Logo */}
            <Link href="/" className="flex items-center">
                <img
                    src="/assets/images/logo.png"
                    alt="Logo"
                    className="h-9 w-auto"
                />
            </Link>

            {/* Navigation Links using Map */}
            <div className="hidden md:flex space-x-10">
                {navLinks.map((link) => (
                    <NavItem
                        key={link.href}
                        href={link.href}
                        active={window.location.pathname === link.href}
                    >
                        {link.name}
                    </NavItem>
                ))}
            </div>

            {/* Right Buttons */}
            <div className="flex items-center space-x-4">
                <Link
                    href="/list-tool"
                    className="hidden sm:block rounded-full border border-[#10513D] px-6 py-2 text-sm font-bold text-[#10513D]"
                >
                    List Tool
                </Link>
                <Link
                    href="/login"
                    className="flex items-center rounded-full bg-[#40885A] px-6 py-2 text-sm font-bold text-white hover:bg-[#10513D] transition-all"
                >
                    Get Started <span className="ml-2">→</span>
                </Link>
            </div>
        </nav>
    );
}
