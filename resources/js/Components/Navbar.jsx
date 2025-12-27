import React from "react";
import { Search, Bell, ChevronDown, Plus } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="h-[90px] bg-white border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-10">
            {/* Page Title */}
            <h1 className="text-[28px] font-bold text-black tracking-tight">
                Dashboard
            </h1>

            <div className="flex items-center gap-8">
                {/* Search Bar - Note the specific border and light text */}
                <div className="relative w-[480px]">
                    <Search
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2D6A4F]"
                        size={20}
                    />
                    <input
                        type="text"
                        placeholder="Search for what you want to rent"
                        className="w-full pl-14 pr-6 py-3.5 rounded-full border border-[#E8F3EE] bg-white text-[15px] focus:outline-none placeholder:text-gray-400"
                    />
                </div>

                {/* List Tool Button - Gradient background and custom Plus icon */}
                <button className="flex items-center gap-3 bg-gradient-to-r from-[#4D906E] to-[#1B4332] text-white pl-7 pr-2 py-2 rounded-full font-medium text-[16px] hover:opacity-90 transition-all">
                    List tool
                    <div className="bg-white rounded-full p-1 flex items-center justify-center">
                        <Plus
                            size={16}
                            className="text-[#1B4332] stroke-[3px]"
                        />
                    </div>
                </button>

                {/* Language Selector */}
                <div className="flex items-center gap-2 cursor-pointer ml-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center text-lg">
                        🇬🇧
                    </div>
                    <span className="font-bold text-[16px] text-black">
                        Eng (Uk)
                    </span>
                    <ChevronDown size={18} className="text-gray-400 ml-1" />
                </div>

                {/* Notification Bell with light background square */}
                <div className="relative p-3 bg-[#EBF2F0] rounded-xl cursor-pointer">
                    <Bell
                        size={24}
                        className="text-[#2D6A4F] fill-[#2D6A4F]/10"
                    />
                    <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#4ADE80] rounded-full border-2 border-white"></span>
                </div>

                {/* User Profile - Specific typography and spacing */}
                <div className="flex items-center gap-3 ml-2">
                    <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-gray-50"
                        alt="Musfiq Profile"
                    />
                    <div className="flex flex-col justify-center">
                        <h4 className="text-[17px] font-bold text-[#1D1E45] leading-tight">
                            Musfiq
                        </h4>
                        <p className="text-[13px] text-gray-400 font-medium">
                            Admin
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
