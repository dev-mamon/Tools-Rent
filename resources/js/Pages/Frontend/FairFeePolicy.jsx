import React from "react";
import { Wrench, CalendarCheck, Banknote } from "lucide-react";

const FairFeePolicy = () => {
    const policies = [
        {
            icon: (
                <Wrench className="w-6 h-6 text-[#10513D] dark:text-emerald-400" />
            ),
            title: "List Your Tools",
            description:
                "Register and list your tools on our platform. Set your rental prices and availability",
            footer: "No upfront fees",
        },
        {
            icon: (
                <CalendarCheck className="w-6 h-6 text-[#10513D] dark:text-emerald-400" />
            ),
            title: "Receive Bookings",
            description:
                "User browse and book your tools. We handle the payment processing securely.",
            footer: "Only pay when you earn",
        },
        {
            icon: (
                <Banknote className="w-6 h-6 text-[#10513D] dark:text-emerald-400" />
            ),
            title: "Earn Money",
            description:
                "Get paid directly to your account. We only take a small 10% commission on successful rentals.",
            footer: "90% earnings is yours",
        },
    ];

    return (
        <section className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 text-center">
                {/* Subtitle Badge */}
                <div className="inline-block bg-[#F0F7F4] dark:bg-emerald-900/20 text-[#10513D] dark:text-emerald-400 px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 border border-[#E0E9E5] dark:border-emerald-800/50">
                    How Jardiloc Commission Works
                </div>

                {/* Heading */}
                <h2 className="text-[32px] md:text-[42px] font-bold text-[#10513D] dark:text-emerald-400 mb-3">
                    Our Fair Fee Policy
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-16">
                    Simple, Transparent, Pricing for everyone
                </p>

                {/* Policy Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {policies.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-900 rounded-[24px] p-10 border border-gray-100 dark:border-gray-800 shadow-[0_4px_25px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-xl dark:hover:border-emerald-800/50 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 bg-[#F0F7F4] dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-8 transition-colors group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800/50">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                                {item.title}
                            </h3>
                            <p className="text-gray-400 dark:text-gray-400 text-sm leading-relaxed mb-8 md:h-12">
                                {item.description}
                            </p>
                            <div className="text-[#40885A] dark:text-emerald-400 font-bold text-sm pt-4 border-t border-gray-50 dark:border-gray-800">
                                {item.footer}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Commission Banner */}
                <div className="bg-[#EEF4F1] dark:bg-gray-900 rounded-[24px] p-10 mb-12 border border-transparent dark:border-gray-800">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        Just 8%-15% commission on successful rentals
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No hidden fees. No monthly charges. Only pay when you
                        earn
                    </p>
                </div>

                {/* CTA Button */}
                <button className="bg-[#10513D] dark:bg-emerald-600 hover:bg-[#1a3a2f] dark:hover:bg-emerald-500 text-white font-bold py-4 px-10 rounded-full flex items-center gap-2 mx-auto transition-all shadow-lg hover:shadow-xl active:scale-95">
                    Start Listing
                    <span className="text-xl">→</span>
                </button>
            </div>
        </section>
    );
};

export default FairFeePolicy;
