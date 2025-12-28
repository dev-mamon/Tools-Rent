import React from "react";
import { Search } from "lucide-react";

const Header = ({ title, subtitle }) => {
    return (
        <div
            className="pt-48 pb-40 flex flex-col items-center text-center px-6 relative"
            style={{
                background: "linear-gradient(180deg, #10513D 0%, #165E47 100%)",
            }}
        >
            {/* Top Badge */}
            <div className="mb-8">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase text-white/90">
                    Share Tools. Grow Communities.
                </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
                {title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-white/70 mb-16 font-medium max-w-lg">
                {subtitle}
            </p>

            {/* --- সার্চ বার পজিশন পরিবর্তন করা হয়েছে --- */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-20 w-[95%] max-w-5xl z-40">
                <div className="flex items-center bg-white rounded-full p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-gray-50">
                    <div className="pl-7 pr-3 text-gray-400">
                        <Search size={22} strokeWidth={2.5} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for what you want to rent"
                        className="w-full py-4 text-[16px] text-gray-700 placeholder-gray-400 border-none focus:ring-0 outline-none bg-transparent"
                    />
                    <button className="bg-[#10513D] hover:bg-[#1a6b52] text-white px-12 py-4 rounded-full text-[16px] font-bold transition-all shadow-md active:scale-95 whitespace-nowrap">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
