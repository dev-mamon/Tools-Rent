import React, { useEffect } from "react";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import { usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";

export default function UserLayout({ children }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                position: "bottom-right",
                duration: 4000,
                style: {
                    borderRadius: "12px",
                    background: "#333",
                    color: "#fff",
                },
            });
        }
        if (flash?.error) {
            toast.error(flash.error, {
                position: "top-right",
            });
        }
    }, [flash]);

    return (
        <div className="flex min-h-screen bg-[#E7EEEC] dark:bg-gray-950 transition-colors duration-300">
            <Toaster />
            <div className="h-screen sticky top-0 border-r border-gray-200 dark:border-gray-800">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
                <Navbar />

                {/* Main Content Area */}
                <main className="p-8 flex-1 transition-colors duration-300">
                    {children}
                </main>
            </div>
        </div>
    );
}
