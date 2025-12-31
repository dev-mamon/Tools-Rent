import React from "react";
import UserLayout from "@/Layouts/UserLayout";

export default function LegalNotice() {
    return (
        <UserLayout>
            <div className="space-y-6 font-sans text-[#1A1A1A] dark:text-gray-100 transition-colors duration-300">
                <h2 className="text-[20px] font-bold text-gray-900 dark:text-white">
                    Legal Notice
                </h2>

                <div className="bg-white dark:bg-gray-900 rounded-[16px] shadow-sm overflow-hidden border border-gray-50 dark:border-gray-800">
                    <div className="p-8 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/10">
                        <p className="text-amber-800 dark:text-amber-200 font-medium">
                            Official legal disclosures and regulatory compliance
                            information.
                        </p>
                    </div>
                    <div className="p-8 text-gray-600 dark:text-gray-400">
                        <p>
                            This platform is operated by [Company Name]. All
                            rights reserved. Reproduction of any part of this
                            site is prohibited without prior written consent.
                        </p>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
