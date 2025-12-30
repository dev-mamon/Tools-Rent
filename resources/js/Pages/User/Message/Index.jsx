import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Search, Plus, Mic, SendHorizontal } from "lucide-react";

export default function Message() {
    // Dummy Data
    const contacts = Array(10).fill({
        name: "Sarah Johnson",
        email: "kilwakesales@inquiry.com",
        lastMsg: "Thanks, I can't wait to see you tomorrow for coffee!",
        time: "12:01pm",
        unread: 1,
        avatar: "https://i.pravatar.cc/150?u=sarah",
    });

    return (
        <UserLayout>
            <div className="flex h-[calc(100vh-120px)] gap-6 font-sans transition-colors duration-300">
                {/* --- LEFT SIDE: INBOX LIST --- */}
                <div className="w-1/3 bg-white dark:bg-gray-900 rounded-[24px] flex flex-col overflow-hidden shadow-sm border border-gray-50 dark:border-gray-800">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                            Inbox
                        </h2>
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-3 text-gray-400 dark:text-gray-500"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Search message"
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-1 focus:ring-[#437C61] dark:text-gray-200 dark:placeholder-gray-500"
                            />
                        </div>
                        <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 mt-4 uppercase tracking-wider">
                            Pinned Conversations
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto px-2 pb-4 custom-scrollbar">
                        {contacts.map((contact, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all ${
                                    i === 0
                                        ? "bg-gray-50 dark:bg-gray-800"
                                        : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                }`}
                            >
                                <img
                                    src={contact.avatar}
                                    className="w-11 h-11 rounded-full object-cover border-2 border-transparent dark:border-gray-700"
                                    alt=""
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-bold text-[14px] text-gray-900 dark:text-gray-200">
                                            {contact.name}
                                        </h4>
                                        <span className="text-[10px] text-gray-400 dark:text-gray-500">
                                            {contact.time}
                                        </span>
                                    </div>
                                    <p className="text-[12px] text-gray-500 dark:text-gray-400 truncate font-medium mt-0.5">
                                        {contact.lastMsg}
                                    </p>
                                </div>
                                {contact.unread > 0 && (
                                    <span className="bg-[#437C61] dark:bg-emerald-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
                                        {contact.unread}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- RIGHT SIDE: CONVERSATION --- */}
                <div className="flex-1 bg-white dark:bg-gray-900 rounded-[24px] flex flex-col overflow-hidden shadow-sm border border-gray-50 dark:border-gray-800">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex justify-between items-start">
                        <div className="flex gap-3">
                            <img
                                src="https://i.pravatar.cc/150?u=sarah"
                                className="w-11 h-11 rounded-full object-cover"
                                alt=""
                            />
                            <div>
                                <h4 className="font-bold text-[16px] text-gray-900 dark:text-white">
                                    Sarah Johnson
                                </h4>
                                <p className="text-[12px] text-gray-400 dark:text-gray-500 font-medium">
                                    kilwakesales@inquiry.com
                                </p>
                            </div>
                        </div>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                            12:01pm (2 hours ago)
                        </span>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white dark:bg-gray-900 custom-scrollbar">
                        <div className="text-center text-[11px] text-gray-400 dark:text-gray-500 font-bold uppercase py-4">
                            Today 10:27am
                        </div>

                        {/* Received Message */}
                        <div className="flex gap-3 max-w-[70%]">
                            <img
                                src="https://i.pravatar.cc/150?u=sarah"
                                className="w-8 h-8 rounded-full mt-auto"
                                alt=""
                            />
                            <div className="bg-gray-100 dark:bg-gray-800 p-3.5 rounded-2xl rounded-bl-none text-[13px] font-medium text-gray-800 dark:text-gray-200">
                                Hey!
                            </div>
                        </div>

                        {/* Sent Message */}
                        <div className="flex flex-col items-end space-y-2">
                            <div className="bg-[#437C61] dark:bg-emerald-600 text-white p-4 rounded-2xl rounded-br-none text-[13px] max-w-[70%] leading-relaxed shadow-sm">
                                Hey we haven't seen eachoteher in like 2 weeks
                                hahaha do you want to go grab coffee nearby?
                            </div>
                        </div>

                        {/* More Received */}
                        <div className="flex gap-3 max-w-[70%]">
                            <img
                                src="https://i.pravatar.cc/150?u=sarah"
                                className="w-8 h-8 rounded-full"
                                alt=""
                            />
                            <div className="space-y-2">
                                <div className="bg-gray-100 dark:bg-gray-800 p-3.5 rounded-2xl text-[13px] font-medium text-gray-800 dark:text-gray-200">
                                    Yes I would love that!
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-800 p-3.5 rounded-2xl text-[13px] font-medium w-fit text-gray-800 dark:text-gray-200">
                                    Pick a place
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="p-6 pt-2 bg-white dark:bg-gray-900">
                        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl border border-transparent dark:border-gray-700">
                            <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-[#437C61] dark:hover:text-emerald-400 transition-colors">
                                <Plus size={22} />
                            </button>
                            <input
                                type="text"
                                placeholder="Message"
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                            />
                            <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-[#437C61] dark:hover:text-emerald-400 transition-colors">
                                <Mic size={22} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
