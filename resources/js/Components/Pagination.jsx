import React from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const Pagination = () => {
    return (
        <div className="flex items-center justify-between px-8 py-4 bg-white border-t border-[#EDF2F7]">
            {/* Left side: Rows per page */}
            <div className="flex items-center gap-3">
                <span className="text-[#94A3B8] text-[15px]">
                    Rows per page:
                </span>
                <div className="relative group">
                    <select className="appearance-none bg-white border border-[#CBD5E1] rounded-[10px] pl-4 pr-10 py-2 text-[#64748B] font-medium text-[15px] focus:outline-none focus:ring-1 focus:ring-green-600 cursor-pointer">
                        <option>05</option>
                        <option>10</option>
                        <option>20</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <ChevronDown size={18} className="text-[#94A3B8]" />
                    </div>
                </div>
            </div>

            {/* Right side: Page navigation */}
            <div className="flex items-center gap-6">
                <span className="text-[#94A3B8] text-[15px] font-medium">
                    1-4 of 4
                </span>

                <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button className="w-10 h-10 flex items-center justify-center border border-[#CBD5E1] rounded-[10px] text-[#CBD5E1] hover:bg-gray-50 transition-colors">
                        <ChevronLeft size={20} />
                    </button>

                    {/* Active Page Number */}
                    <button className="w-10 h-10 flex items-center justify-center border border-[#CBD5E1] rounded-[10px] text-[#94A3B8] font-semibold text-[15px]">
                        1
                    </button>

                    {/* Next Button */}
                    <button className="w-10 h-10 flex items-center justify-center border border-[#CBD5E1] rounded-[10px] text-[#CBD5E1] hover:bg-gray-50 transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
