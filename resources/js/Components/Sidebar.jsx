import React from "react";
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
    const menuItems = [
        {
            icon: <LayoutDashboard size={20} />,
            label: "Dashboard",
            active: true,
        },
        { icon: <List size={20} />, label: "My Listings", active: false },
        { icon: <Repeat size={20} />, label: "My Rentals", active: false },
        {
            icon: <CircleDollarSign size={20} />,
            label: "Earnings",
            active: false,
        },
        { icon: <MessageSquare size={20} />, label: "Message", active: false },
        { icon: <Star size={20} />, label: "Reviews", active: false },
        { icon: <Settings size={20} />, label: "Settings", active: false },
    ];

    return (
        <aside className="w-64 bg-white min-h-screen border-r border-gray-100 flex flex-col py-6">
            <div className="px-8 mb-10 text-center">
                <div className="flex flex-col items-center">
                    <img
                        src="assets/images/logo.png"
                        alt="Jardiloc"
                        className="w-60 mb-1"
                    />
                </div>
            </div>

            <nav className="flex-1 px-2 space-y-2">
                {menuItems.map((item, idx) => (
                    <div
                        key={idx}
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
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar; // This line fixes the error
