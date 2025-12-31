import React from "react";
import UserLayout from "@/Layouts/UserLayout";

export default function TermsAndCondition() {
    return (
        <UserLayout>
            <div className="space-y-6 font-sans text-[#1A1A1A] dark:text-gray-100 transition-colors duration-300">
                <h2 className="text-[20px] font-bold text-gray-900 dark:text-white">
                    Terms and Conditions
                </h2>

                <div className="bg-white dark:bg-gray-900 rounded-[16px] shadow-sm p-8 border border-gray-50 dark:border-gray-800 leading-relaxed">
                    <div className="prose dark:prose-invert max-w-none space-y-4">
                        <section>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                1. Introduction
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Welcome to our platform. By accessing this
                                website, you agree to comply with these terms...
                            </p>
                        </section>
                        <section>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                2. Usage License
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Permission is granted to temporarily download
                                one copy of the materials on our website for
                                personal, non-commercial viewing only.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
