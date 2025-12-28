import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { router } from "@inertiajs/react";

const Pagination = ({ meta }) => {
    if (!meta) return null;

    const {
        current_page,
        last_page,
        per_page,
        from,
        to,
        total,
        prev_page_url,
        next_page_url,
        path,
    } = meta;

    // Logic: 8 pages before current, 3 pages after current
    const startPage = Math.max(1, current_page - 8);
    const endPage = Math.min(last_page, current_page + 3);

    // Create an array of page numbers [start...end]
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const handlePerPageChange = (e) => {
        const value = e.target.value;
        router.get(
            window.location.pathname,
            { per_page: value, page: 1 },
            {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            }
        );
    };

    const handlePageChange = (url) => {
        if (url) {
            router.get(
                url,
                {},
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                }
            );
        }
    };

    // Helper to generate URL for specific page number
    const getPageUrl = (page) => `${path}?page=${page}&per_page=${per_page}`;

    return (
        <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-[#F1F5F9] font-sans">
            {/* Left side: Rows per page and range info */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-[#94A3B8] text-[14px]">
                        Rows per page:
                    </span>
                    <select
                        value={per_page}
                        onChange={handlePerPageChange}
                        className="appearance-none bg-white border border-[#E2E8F0] rounded-md pl-3 pr-5 py-1 text-[#64748B] text-[12px] focus:outline-none cursor-pointer min-w-[60px]"
                    >
                        {[5, 10, 20, 50].map((val) => (
                            <option key={val} value={val}>
                                {val < 10 ? `0${val}` : val}
                            </option>
                        ))}
                    </select>
                </div>
                <span className="text-[#94A3B8] text-[14px] ml-2 font-normal">
                    {from || 0}-{to || 0} of {total}
                </span>
            </div>

            {/* Right side: Navigation buttons */}
            <div className="flex items-center gap-1.5">
                {/* Previous Button */}
                <button
                    onClick={() => handlePageChange(prev_page_url)}
                    disabled={!prev_page_url}
                    className={`w-8 h-8 flex items-center justify-center border border-[#E2E8F0] rounded-[4px] transition-colors ${
                        !prev_page_url
                            ? "text-[#E2E8F0] cursor-not-allowed"
                            : "text-[#94A3B8] hover:bg-gray-50"
                    }`}
                >
                    <ChevronLeft size={18} />
                </button>

                {/* Render Calculated Page Numbers */}
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(getPageUrl(page))}
                        className={`w-8 h-8 flex items-center justify-center font-medium text-[14px] rounded-[4px] border transition-colors ${
                            current_page === page
                                ? "bg-[#4D7C5F] text-white border-[#4D7C5F]"
                                : "text-[#64748B] border-[#E2E8F0] hover:bg-gray-50"
                        }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={() => handlePageChange(next_page_url)}
                    disabled={!next_page_url}
                    className={`w-8 h-8 flex items-center justify-center border border-[#E2E8F0] rounded-[4px] transition-colors ${
                        !next_page_url
                            ? "text-[#E2E8F0] cursor-not-allowed"
                            : "text-[#94A3B8] hover:bg-gray-50"
                    }`}
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
