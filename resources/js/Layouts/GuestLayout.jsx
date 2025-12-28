import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 antialiased flex flex-col">
            {/* Main Content Area */}
            {/* এখানে flex-grow ব্যবহার করা হয়েছে যাতে ফুটার সবসময় নিচে থাকে */}
            <main className="flex-grow">{children}</main>

            {/* --- Desktop Footer --- */}
            <footer className="bg-[#1a4332] pt-20 pb-10 text-white mt-auto">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Footer CTA Section */}
                    <div className="text-center mb-24">
                        <h2 className="text-4xl font-bold mb-6">
                            Get Started With Jardiloc
                        </h2>
                        <p className="text-green-100 max-w-2xl mx-auto mb-10 opacity-70 leading-relaxed">
                            We have considered our solutions to support every
                            stage of your growth. We are the fastest and easiest
                            way to launch SaaS showcase for our customers.
                        </p>
                        <button className="bg-white text-[#1a4332] px-10 py-4 rounded-full font-bold text-lg flex items-center mx-auto hover:bg-gray-100 transition">
                            Request to Rent{" "}
                            <span className="ml-3 text-xl">→</span>
                        </button>
                    </div>

                    {/* Footer Links Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
                        <div className="col-span-1">
                            <img
                                src="/assets/images/logo.png"
                                alt="Jardiloc"
                                className="h-10 w-auto brightness-0 invert mb-6"
                            />
                            <p className="text-sm leading-relaxed opacity-60">
                                Welcome to a place of refinement and beauty.
                                This is Jardiloc, we made for all tool rental
                                needs.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 text-lg">Company</h4>
                            <ul className="space-y-4 text-sm opacity-60">
                                <li>
                                    <Link href="#">Features</Link>
                                </li>
                                <li>
                                    <Link href="#">Browse Tools</Link>
                                </li>
                                <li>
                                    <Link href="#">How it works</Link>
                                </li>
                                <li>
                                    <Link href="#">Dashboard</Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 text-lg">Support</h4>
                            <ul className="space-y-4 text-sm opacity-60">
                                <li>
                                    <Link href="#">Legal Notice</Link>
                                </li>
                                <li>
                                    <Link href="#">Privacy Policy (GDPR)</Link>
                                </li>
                                <li>
                                    <Link href="#">Terms and Condition</Link>
                                </li>
                                <li>
                                    <Link href="#">Commission Policy</Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 text-lg">Contact</h4>
                            <div className="flex items-center text-sm opacity-60">
                                <span className="mr-3">✉️</span>
                                <span>contact@jardiloc.com</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 text-center text-xs opacity-50 tracking-wider">
                        Copyright © 2025 Jardiloc. All Rights Reserved
                    </div>
                </div>
            </footer>
        </div>
    );
}
