import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 antialiased flex flex-col transition-colors duration-300">
            {/* Main Content Area */}
            <main className="flex-grow">{children}</main>

            {/* --- Footer --- */}
            <footer className="bg-[#1a4332] dark:bg-[#0a1f18] pt-20 pb-10 text-white mt-auto border-t border-white/5 dark:border-white/5">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Footer Links Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10 dark:border-white/5">
                        <div className="col-span-1">
                            {/* Logo: dark mode compatible visibility */}
                            <img
                                src="/assets/images/logo.png"
                                alt="Jardiloc"
                                className="h-10 w-auto brightness-0 invert mb-6"
                            />
                            <p className="text-sm leading-relaxed opacity-60 dark:text-gray-400">
                                Welcome to a place of refinement and beauty.
                                This is Jardiloc, we made for all tool rental
                                needs.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 text-lg">Company</h4>
                            <ul className="space-y-4 text-sm opacity-60 dark:text-gray-400">
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-emerald-400 transition"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-emerald-400 transition"
                                    >
                                        Browse Tools
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-emerald-400 transition"
                                    >
                                        How it works
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-emerald-400 transition"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 text-lg">Support</h4>
                            <ul className="space-y-4 text-sm opacity-60 dark:text-gray-400">
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-emerald-400 transition"
                                    >
                                        Legal Notice
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-emerald-400 transition"
                                    >
                                        Privacy Policy (GDPR)
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-emerald-400 transition"
                                    >
                                        Terms and Condition
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-emerald-400 transition"
                                    >
                                        Commission Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 text-lg">Contact</h4>
                            <div className="flex items-center text-sm opacity-60 dark:text-gray-400">
                                <span className="mr-3">✉️</span>
                                <span>contact@jardiloc.com</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 text-center text-xs opacity-50 tracking-wider dark:text-gray-500">
                        Copyright © 2025 Jardiloc. All Rights Reserved
                    </div>
                </div>
            </footer>
        </div>
    );
}
