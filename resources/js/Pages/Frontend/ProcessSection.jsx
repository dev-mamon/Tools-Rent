import React from "react";

const ProcessSection = () => {
    const steps = [
        {
            number: "01",
            title: "Register Now",
            description:
                "Creating account to our website and now use it for your required time.",
        },
        {
            number: "02",
            title: "Complete Setup",
            description:
                "Set up your professional profile and list your tools with ease.",
        },
        {
            number: "03",
            title: "Start Using Service",
            description:
                "Start renting tools or lending your own to the community today.",
        },
    ];

    return (
        <section
            className="py-24 px-6 text-white text-center transition-colors duration-500
            /* লাইট মোড গ্রাডিয়েন্ট */
            bg-gradient-to-b from-[#10513D] to-[#1a3a2f]
            /* ডার্ক মোড গ্রাডিয়েন্ট */
            dark:from-[#05110d] dark:to-gray-950"
        >
            <div className="max-w-6xl mx-auto">
                {/* Subtitle Badge */}
                <div className="inline-block bg-white/10 dark:bg-emerald-500/10 backdrop-blur-md border border-white/20 dark:border-emerald-500/20 px-5 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase mb-8">
                    How Jardiloc Works
                </div>

                {/* Section Heading */}
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                    Learn about our process
                </h2>

                <p className="text-emerald-50/70 dark:text-gray-400 max-w-2xl mx-auto mb-20 text-sm md:text-base leading-relaxed">
                    We have considered our solutions to support every stage of
                    your personal growth. We are the fastest and easiest way to
                    get started with tool sharing.
                </p>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                    {/* Connecting Line for Desktop (Optional Design Element) */}
                    <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[1px] border-t border-dashed border-white/20 z-0"></div>

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center group relative z-10"
                        >
                            {/* Circle Number */}
                            <div className="w-20 h-20 bg-white dark:bg-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg]">
                                <span className="text-[#10513D] dark:text-white text-2xl font-black">
                                    {step.number}
                                </span>
                            </div>

                            {/* Step Text */}
                            <h3 className="text-2xl font-bold mb-4 dark:text-emerald-400">
                                {step.title}
                            </h3>
                            <p className="text-white/70 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-[280px]">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
