import React from "react";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";

export default function UserLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#E7EEEC]  ">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-8 ">{children}</div>
            </div>
        </div>
    );
}
