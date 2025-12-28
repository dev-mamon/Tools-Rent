import React from "react";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";

export default function UserLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#E7EEEC]">
            <div className="h-screen sticky top-0">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col min-h-screen">
                <Navbar />

                <div className="p-8 flex-1">{children}</div>
            </div>
        </div>
    );
}
