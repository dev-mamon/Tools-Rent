import { Link } from "@inertiajs/react";

export default function Category() {
    const categories = [
        {
            id: 1,
            name: "Power Tools",
            count: "450 tools",
            icon: "https://cdn-icons-png.flaticon.com/512/3259/3259410.png",
        },
        {
            id: 2,
            name: "Hand Tools",
            count: "320 tools",
            icon: "https://cdn-icons-png.flaticon.com/512/2500/2500441.png",
        },
        {
            id: 3,
            name: "Garden Equipment",
            count: "280 tools",
            icon: "https://cdn-icons-png.flaticon.com/512/1518/1518915.png",
        },
        {
            id: 4,
            name: "Lawn Care",
            count: "180 tools",
            icon: "https://cdn-icons-png.flaticon.com/512/1518/1518863.png",
        },
        {
            id: 5,
            name: "Plumbing",
            count: "180 tools",
            icon: "https://cdn-icons-png.flaticon.com/512/3011/3011402.png",
        },
        {
            id: 6,
            name: "Outdoor",
            count: "180 tools",
            icon: "https://cdn-icons-png.flaticon.com/512/628/628283.png",
        },
        {
            id: 7,
            name: "Painting",
            count: "120 tools",
            icon: "https://cdn-icons-png.flaticon.com/512/3059/3059434.png",
        },
        {
            id: 8,
            name: "Measuring",
            count: "90 tools",
            icon: "https://cdn-icons-png.flaticon.com/512/3566/3566415.png",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-[#10513D] mb-16">
                    Browse by Categories
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="bg-[#F8F9F8] p-10 rounded-[20px] flex flex-col items-center justify-center transition-all cursor-pointer hover:shadow-md group"
                        >
                            <div className="mb-4">
                                {/* SVG/Icon color filter to match #10513D */}
                                <img
                                    src={cat.icon}
                                    alt={cat.name}
                                    className="w-12 h-12 object-contain"
                                    style={{
                                        filter: "invert(21%) sepia(26%) saturate(1451%) hue-rotate(117deg) brightness(91%) contrast(92%)",
                                    }}
                                />
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg">
                                {cat.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {cat.count}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
