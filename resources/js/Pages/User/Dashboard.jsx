import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";
import {
    Box,
    RefreshCcw,
    CircleDollarSign,
    TrendingUp,
    Star,
    Calendar,
    Download,
} from "lucide-react";
import {
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
    const stats = [
        {
            label: "Total Listing",
            value: "120",
            change: "+12%",
            trend: "up",
            icon: (
                <Box className="w-5 h-5 text-[#2D5A43] dark:text-emerald-400" />
            ),
        },
        {
            label: "Active Rents",
            value: "24",
            change: "+8%",
            trend: "up",
            icon: (
                <RefreshCcw className="w-5 h-5 text-[#2D5A43] dark:text-emerald-400" />
            ),
        },
        {
            label: "Total Earnings",
            value: "$2,450",
            change: "+18%",
            trend: "up",
            icon: (
                <CircleDollarSign className="w-5 h-5 text-[#2D5A43] dark:text-emerald-400" />
            ),
        },
        {
            label: "Customer Reviews",
            value: "4.8",
            change: "+0.2",
            trend: "up",
            icon: (
                <Star className="w-5 h-5 text-[#2D5A43] dark:text-emerald-400" />
            ),
        },
    ];

    const earningsData = [
        { month: "Jan", earnings: 1800 },
        { month: "Feb", earnings: 2100 },
        { month: "Mar", earnings: 1900 },
        { month: "Apr", earnings: 2400 },
        { month: "May", earnings: 2200 },
        { month: "Jun", earnings: 2450 },
    ];

    const categoryData = [
        { name: "Gardening", value: 35, color: "#2D5A43" },
        { name: "Construction", value: 25, color: "#437C61" },
        { name: "Power Tools", value: 20, color: "#5FA883" },
        { name: "Hand Tools", value: 15, color: "#7DD1A4" },
        { name: "Other", value: 5, color: "#A7C4B5" },
    ];

    return (
        <UserLayout>
            <Head title="Dashboard" />
            <div className="space-y-6 font-sans text-[#1A1A1A] dark:text-gray-100 transition-colors duration-300">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            Dashboard Overview
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Welcome back! Here's your tool performance.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                            <Calendar className="w-4 h-4" /> Last 6 Months
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#2D5A43] dark:bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-[#1B3D2F] dark:hover:bg-emerald-700 transition-all shadow-md">
                            <Download className="w-4 h-4" /> Export
                        </button>
                    </div>
                </div>

                {/* 1. STATS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                                        {stat.label}
                                    </p>
                                    <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
                                        {stat.value}
                                    </p>
                                    <div className="flex items-center gap-1 mt-2 text-green-600 dark:text-emerald-400">
                                        <TrendingUp className="w-4 h-4" />
                                        <span className="text-sm font-medium">
                                            {stat.change}
                                        </span>
                                        <span className="text-gray-500 dark:text-gray-500 text-xs ml-1">
                                            last month
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3 rounded-xl bg-[#E9F2EE] dark:bg-emerald-500/10 transition-colors">
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 2. CHARTS SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Line Chart Card */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                            Earnings Overview
                        </h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={earningsData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#e5e7eb"
                                        className="dark:opacity-10"
                                    />
                                    <XAxis
                                        dataKey="month"
                                        stroke="#9ca3af"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#9ca3af"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#111827",
                                            border: "none",
                                            borderRadius: "8px",
                                            color: "#fff",
                                        }}
                                        itemStyle={{ color: "#10b981" }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="earnings"
                                        stroke="#2D5A43"
                                        strokeWidth={4}
                                        dot={{ r: 4, fill: "#2D5A43" }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pie Chart Card */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                            Tool Categories
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 space-y-2">
                            {categoryData.map((category, index) => (
                                <div
                                    key={index}
                                    className="flex items-center text-sm"
                                >
                                    <div
                                        className="w-3 h-3 rounded-full mr-2"
                                        style={{
                                            backgroundColor: category.color,
                                        }}
                                    />
                                    <span className="text-gray-700 dark:text-gray-300">
                                        {category.name}
                                    </span>
                                    <span className="ml-auto font-bold dark:text-white">
                                        {category.value}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. QUICK ACTIONS */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                        Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            {
                                title: "Add New Tool",
                                desc: "List a new tool",
                                icon: <Box className="w-6 h-6" />,
                            },
                            {
                                title: "View Reports",
                                desc: "Performance insights",
                                icon: <TrendingUp className="w-6 h-6" />,
                            },
                            {
                                title: "Download",
                                desc: "Earnings report",
                                icon: <Download className="w-6 h-6" />,
                            },
                        ].map((action, i) => (
                            <button
                                key={i}
                                className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl text-left hover:border-[#2D5A43] dark:hover:border-emerald-500 hover:bg-gray-50 dark:hover:bg-gray-800 group transition-all"
                            >
                                <div className="w-12 h-12 bg-[#E9F2EE] dark:bg-emerald-500/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#2D5A43] dark:group-hover:bg-emerald-600 transition-colors">
                                    <span className="text-[#2D5A43] dark:text-emerald-400 group-hover:text-white">
                                        {action.icon}
                                    </span>
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white">
                                    {action.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                    {action.desc}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
