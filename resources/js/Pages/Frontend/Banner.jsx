import Navbar from "@/Components/Frontend/Navbar";
import { Search, ArrowRight, Leaf, Sparkles } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Banner() {
    return (
        <section className="min-h-screen flex flex-col bg-[#4b4b4b] dark:bg-gray-950 relative overflow-hidden font-sans transition-colors duration-300">
            <Navbar />
            <div
                className="absolute left-0 top-0 h-full w-[55%] skew-x-12 -translate-x-32 hidden lg:block bg-cover bg-center opacity-50 dark:opacity-30"
                style={{ backgroundImage: "url('/assets/images/banner.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/70" />
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex items-center justify-center relative z-10 p-4 pt-32 lg:pt-20">
                <div className="relative w-full max-w-[1000px] min-h-[600px] bg-white dark:bg-gray-900 rounded-[40px] shadow-2xl flex overflow-hidden border border-transparent dark:border-gray-800 transition-all">
                    <div className="hidden md:flex w-[45%] p-5">
                        <div className="w-full h-full rounded-[28px] overflow-hidden grayscale-[20%] dark:grayscale-[50%] relative group">
                            <img
                                src="/assets/images/banner.jpg"
                                alt="Tools Visual"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-emerald-900/20" />
                        </div>
                    </div>

                    {/* RIGHT CONTENT (লগইন পেজের ফর্মের জায়গায় এখন টাইটেল ও সার্চ) */}
                    <div className="w-full md:w-[55%] px-10 lg:px-16 py-14 flex flex-col justify-center">
                        {/* Logo & Badge */}
                        <div className="mb-10">
                            <div className="flex flex-col items-center lg:items-start mb-6">
                                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-[#2d5a43] dark:text-emerald-400">
                                    <Leaf
                                        className="w-6 h-6"
                                        strokeWidth={1.8}
                                    />
                                </div>
                                <span className="mt-2 text-[#2d5a43] dark:text-emerald-400 font-black text-xl uppercase tracking-tighter">
                                    Jardiloc
                                </span>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-4 text-center lg:text-left">
                                Don't Buy It. <br />
                                <span className="text-emerald-600 dark:text-emerald-400">
                                    Just Rent It.
                                </span>
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium text-center lg:text-left">
                                Access high-quality tools in your neighborhood.
                            </p>
                        </div>

                        {/* Search Section (লগইন পেজের ইনপুট স্টাইল) */}
                        <div className="space-y-6 max-w-[400px] mx-auto lg:ml-0 w-full">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">
                                    Find what you need
                                </label>
                                <div className="group relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                                        <Search size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search tools (mowers, drills...)"
                                        className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-2 flex flex-col gap-3">
                                <button className="w-full bg-[#10513D] dark:bg-emerald-600 hover:bg-[#1a6b52] dark:hover:bg-emerald-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-900/20 dark:shadow-black/20 transition-all flex items-center justify-center gap-2 active:scale-95 group">
                                    Search Now
                                    <ArrowRight
                                        size={18}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                </button>

                                <Link
                                    href={route("register")}
                                    className="w-full flex justify-center items-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold py-4 rounded-2xl text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                                >
                                    Become a Lender
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
