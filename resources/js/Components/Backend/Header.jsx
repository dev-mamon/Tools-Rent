import React from "react";
import { Search } from "lucide-react";

const Header = ({ title, subtitle }) => {
    return (
        <div
            className="pt-48 pb-40 flex flex-col items-center text-center px-6 relative transition-colors duration-500
            bg-gradient-to-b from-[#10513D] to-[#165E47]
            dark:from-[#05110d] dark:to-[#0a1a15]"
        >
            {/* Subtle Overlay for better contrast */}
            <div className="absolute inset-0 bg-black/5 dark:bg-black/20 z-0 pointer-events-none"></div>

            {/* Top Badge */}
            <div className="mb-8 relative z-10">
                <span className="bg-white/10 dark:bg-emerald-500/10 backdrop-blur-md border border-white/20 dark:border-emerald-500/20 px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase text-white/90">
                    Share Tools. Grow Communities.
                </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight relative z-10 drop-shadow-md">
                {title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-white/70 dark:text-emerald-50/60 mb-16 font-medium max-w-lg relative z-10">
                {subtitle}
            </p>

            {/* Professional Search Bar */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-20 w-[95%] max-w-5xl z-40">
                <div className="flex items-center bg-white dark:bg-gray-900 rounded-full p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] dark:shadow-black/50 border border-gray-50 dark:border-gray-800 transition-all focus-within:ring-4 focus-within:ring-[#10513D]/10 dark:focus-within:ring-emerald-500/10 group">
                    <div className="pl-7 pr-3 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                        <Search size={22} strokeWidth={2.5} />
                    </div>

                    <input
                        type="text"
                        placeholder="Search for what you want to rent"
                        className="w-full py-4 text-[16px] text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 border-none focus:ring-0 outline-none bg-transparent"
                    />
                    <button className="bg-[#10513D] dark:bg-emerald-600 hover:bg-[#1a6b52] dark:hover:bg-emerald-500 text-white px-8 md:px-12 py-4 rounded-full text-[16px] font-bold transition-all shadow-md active:scale-95 whitespace-nowrap">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
