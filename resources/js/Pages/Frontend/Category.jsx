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
        <section className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-[#10513D] dark:text-emerald-400 mb-16">
                    Browse by Categories
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="bg-[#F8F9F8] dark:bg-gray-900 p-10 rounded-[20px] border border-transparent dark:border-gray-800 flex flex-col items-center justify-center transition-all cursor-pointer hover:shadow-md dark:hover:shadow-emerald-900/20 group"
                        >
                            <div className="mb-4">
                                <img
                                    src={cat.icon}
                                    alt={cat.name}
                                    className="w-12 h-12 object-contain transition-all"
                                    style={{
                                        filter: document.documentElement.classList.contains(
                                            "dark"
                                        )
                                            ? "invert(64%) sepia(85%) saturate(365%) hue-rotate(106deg) brightness(101%) contrast(92%)"
                                            : "invert(21%) sepia(26%) saturate(1451%) hue-rotate(117deg) brightness(91%) contrast(92%)",
                                    }}
                                />
                            </div>
                            <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg text-center">
                                {cat.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {cat.count}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
