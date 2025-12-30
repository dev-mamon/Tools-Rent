import React from "react";
import { Star } from "lucide-react";

const Testimonial = () => {
    const reviews = [
        {
            id: 1,
            text: "Our visual designer lets you drag and drop your own way to their custom apps for both of keep desktop, mobile & tab. Creating your account to our website and use it for your required time and we always ready to give you support all the time.",
            name: "Kevin Martin",
            role: "Founder, TechMatter",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
        },
        {
            id: 2,
            text: "Our visual designer lets you drag and drop your own way to their custom apps for both of keep desktop, mobile & tab. Creating your account to our website and use it for your required time and we always ready to give you support all the time.",
            name: "Kevin Martin",
            role: "Founder, TechMatter",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
        },
    ];

    return (
        <section className="py-24 bg-[#F0F5F2] dark:bg-gray-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 text-center">
                {/* Badge */}
                <div className="inline-block bg-[#E1EAE5] dark:bg-emerald-900/20 text-[#10513D] dark:text-emerald-400 px-5 py-1.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase mb-6 border border-transparent dark:border-emerald-800/30">
                    3200+ Happy Customers are trusting us
                </div>

                {/* Heading */}
                <h2 className="text-[32px] md:text-[45px] font-bold text-[#10513D] dark:text-white mb-16 tracking-tight">
                    What our satisfied clients say about us
                </h2>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {reviews.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white dark:bg-gray-900 rounded-[24px] p-10 text-left shadow-sm hover:shadow-md dark:hover:shadow-black/30 border border-transparent dark:border-gray-800 transition-all group"
                        >
                            {/* Review Text */}
                            <p className="text-[#4A5568] dark:text-gray-300 text-[15px] leading-[1.8] mb-10 font-medium italic">
                                "{item.text}"
                            </p>

                            {/* Profile and Rating */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#10513D]/10 dark:border-emerald-500/20">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#1a1a1a] dark:text-gray-100 text-[16px]">
                                            {item.name}
                                        </h4>
                                        <p className="text-gray-400 dark:text-gray-500 text-[13px] font-medium">
                                            {item.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Star Rating */}
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill="#FACC15"
                                            className="text-yellow-400"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
