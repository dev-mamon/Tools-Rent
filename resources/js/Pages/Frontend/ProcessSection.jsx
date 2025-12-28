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
                "Creating account to our website and now use it for your required time.",
        },
        {
            number: "03",
            title: "Start Using Service",
            description:
                "Creating account to our website and now use it for your required time.",
        },
    ];

    return (
        <section
            className="py-20 px-6 text-white text-center"
            style={{
                background: "linear-gradient(180deg, #10513D 0%, #1a3a2f 100%)", // Dark green gradient matching the theme
            }}
        >
            <div className="max-w-6xl mx-auto">
                {/* Subtitle Badge */}
                <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6">
                    How Jardiloc Works
                </div>

                {/* Section Heading */}
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Learn about our process
                </h2>

                <p className="text-white/80 max-w-2xl mx-auto mb-16 text-sm leading-relaxed">
                    We have considered our solutions to support every stage of
                    your personal growth. We are the fastest and easiest way to
                    launch an attractive.
                </p>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center group"
                        >
                            {/* Circle Number */}
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl transition-transform duration-300 group-hover:scale-110">
                                <span className="text-[#10513D] text-2xl font-bold">
                                    {step.number}
                                </span>
                            </div>

                            {/* Step Text */}
                            <h3 className="text-xl font-bold mb-4">
                                {step.title}
                            </h3>
                            <p className="text-white/70 text-sm leading-relaxed max-w-[250px]">
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
