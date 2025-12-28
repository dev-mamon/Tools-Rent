import { Link } from "@inertiajs/react";
import { Star } from "lucide-react";

export default function PopularTools({ tools }) {
    // Array check
    const toolsList = Array.isArray(tools) ? tools : [];

    if (toolsList.length === 0) {
        return (
            <div className="text-center py-20 text-gray-500">
                No tools found.
            </div>
        );
    }

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-[32px] md:text-[40px] font-bold text-center text-[#10513D] mb-12">
                    Popular Tools Near You
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {toolsList.map((tool) => (
                        <div
                            key={tool.id}
                            className="bg-white rounded-[35px] border border-gray-100 p-3 shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Image Container */}
                            <div className="relative h-56 rounded-[28px] overflow-hidden">
                                <img
                                    src={tool.first_image_url}
                                    alt={tool.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {parseFloat(tool.price_per_day) > 70 && (
                                    <div className="absolute top-3 right-3 bg-[#3D7A54] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg">
                                        🏅 Top Rated
                                    </div>
                                )}
                            </div>

                            <div className="px-3 py-5">
                                {/* Title */}
                                <h3 className="text-[20px] font-bold text-[#10513D] mb-2 truncate">
                                    {tool.name}
                                </h3>

                                {/* Rating Section - APPLYED HERE */}
                                <div className="flex items-center gap-1 mb-1">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                // Default logic: 4 stars yellow, 5th star gray
                                                fill={
                                                    i < 4 ? "#FACC15" : "none"
                                                }
                                                className={
                                                    i < 4
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"
                                                }
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-400 text-[14px] ml-1 font-medium">
                                        (16)
                                    </span>
                                </div>

                                {/* Location */}
                                <p className="text-gray-400 text-[14px] mb-6 font-medium truncate">
                                    {tool.location_address || "Jersey City, NJ"}
                                </p>

                                {/* Footer: Price and Button */}
                                <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-[22px] font-extrabold text-[#10513D]">
                                            ${tool.price_per_day}
                                        </span>
                                        <span className="text-[#10513D] text-[14px] font-bold">
                                            / Day
                                        </span>
                                    </div>

                                    <Link
                                        href={`/browse-tools/details/${tool.slug}`}
                                        className="bg-[#3D7A54] hover:bg-[#10513D] text-white text-[13px] font-bold px-5 py-2.5 rounded-full flex items-center gap-2 transition-all"
                                    >
                                        Rent Now
                                        <span className="text-[16px]">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
