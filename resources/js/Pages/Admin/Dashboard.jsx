import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome to admin panel</p>
        </div>
    );
}

Dashboard.layout = (page) => <AdminLayout>{page}</AdminLayout>;
