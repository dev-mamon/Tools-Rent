import React from "react";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";

export default function UserLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#E7EEEC]">
            {/* Sidebar-কে একটি নির্দিষ্ট জায়গায় রাখার জন্য sticky ব্যবহার করা হয়েছে */}
            <div className="h-screen sticky top-0">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col min-h-screen">
                <Navbar />
                {/* overflow-y-auto এখানে দরকার নেই যদি পুরো পেজ স্ক্রল করতে চান */}
                <div className="p-8 flex-1">{children}</div>
            </div>
        </div>
    );
}
