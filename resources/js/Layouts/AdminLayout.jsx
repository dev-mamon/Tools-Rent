import React from "react";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen flex bg-gray-100">
            <aside className="w-64 bg-gray-900 text-white p-4">
                <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

                <ul className="space-y-2">
                    <li>Dashboard</li>
                    <li>Users</li>
                </ul>
            </aside>

            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
