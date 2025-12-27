import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    List,
    Repeat,
    CircleDollarSign,
    MessageSquare,
    Star,
    Settings,
} from "lucide-react";

const Sidebar = () => {
    const { url } = usePage(); // বর্তমান URL চেক করার জন্য

    const menuItems = [
        {
            icon: <LayoutDashboard size={20} />,
            label: "Dashboard",
            link: route("dashboard"),
            active: url === "/dashboard",
        },
        {
            icon: <List size={20} />,
            label: "My Listings",
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
            active: url === "/user/setting",
        },
    ];

    return (
        <aside className="w-64 bg-white h-screen sticky top-0 border-r border-gray-100 flex flex-col py-6 z-10">
            {/* Logo Area */}
            <div className="px-8 mb-10 text-center">
                <Link href="/">
                    <img
                        src="/assets/images/logo.png"
                        alt="Jardiloc"
                        className="w-60 mb-1"
                    />
                </Link>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                {menuItems.map((item, idx) => (
                    <Link
                        key={idx}
                        href={item.link}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                            item.active
                                ? "bg-[#2D6A4F] text-white shadow-md shadow-green-900/10"
                                : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                        }`}
                    >
                        {item.icon}
                        <span className="font-semibold text-sm">
                            {item.label}
                        </span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
