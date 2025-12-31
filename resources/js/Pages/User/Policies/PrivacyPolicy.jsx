import React from "react";
import UserLayout from "@/Layouts/UserLayout";

export default function PrivacyPolicy() {
    return (
        <UserLayout>
            <div className="space-y-6 font-sans text-[#1A1A1A] dark:text-gray-100 transition-colors duration-300">
                <h2 className="text-[20px] font-bold text-gray-900 dark:text-white">
                    Privacy Policy
                </h2>

                <div className="bg-white dark:bg-gray-900 rounded-[16px] shadow-sm p-8 border border-gray-50 dark:border-gray-800">
                    <div className="space-y-6">
                        <p className="text-gray-600 dark:text-gray-400">
                            Your privacy is important to us. It is our policy to
                            respect your privacy regarding any information we
                            may collect.
                        </p>

                        <div className="bg-[#F8FAFA] dark:bg-gray-800/50 p-6 rounded-lg">
                            <h3 className="font-bold mb-2">Data We Collect</h3>
                            <ul className="list-disc ml-5 text-gray-600 dark:text-gray-400 space-y-2">
                                <li>
                                    Account information (Name, Email, Phone)
                                </li>
                                <li>Transaction history and rental logs</li>
                                <li>Device information and IP addresses</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
