import Navbar from "@/Components/Frontend/Navbar";

export default function Banner() {
    return (
        <section className="relative w-full overflow-hidden">
            <Navbar />

            {/* Hero Content Section */}
            <div
                className="pt-40 pb-28 flex flex-col items-center text-center px-6 relative z-10"
                style={{
                    background:
                        "linear-gradient(180deg, #10513D 0%, #40885A 100%)",
                }}
            >
                <div className="mt-10 flex flex-col items-center">
                    <div className="mb-6">
                        <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-white">
                            Share Tools. Grow Communities.
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mb-6 text-white">
                        Rent Tools, Save Money; <br /> Build Together
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-10">
                        Find the right tools in your neighborhood
                    </p>
                </div>

                {/* Search Bar */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[90%] max-w-3xl z-30">
                    <div className="flex items-center bg-white rounded-full p-2 shadow-2xl overflow-hidden">
                        <div className="pl-6 pr-2">
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search for what you want to rent"
                            className="w-full py-3.5 text-gray-800 placeholder-gray-400 border-none focus:ring-0"
                        />
                        <button className="bg-[#40885A] hover:bg-[#10513D] text-white px-12 py-3.5 rounded-full font-bold transition-all shadow-md">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Background Image Area */}
            <div className="relative w-full h-[450px] z-0">
                <img
                    src="/assets/images/banner.jpg"
                    alt="Garden Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
            </div>
        </section>
    );
}
