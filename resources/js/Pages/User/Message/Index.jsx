import React, { useState, useEffect, useRef } from "react";
import { router, usePage } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import {
    Search,
    SendHorizontal,
    MessageSquare,
    Check,
    CheckCheck,
    MoreHorizontal,
    SquarePen,
    BellOff,
} from "lucide-react";

export default function Message() {
    const {
        chatList,
        searchUsers,
        selectedUser,
        messages: initialMessages,
        authUser,
    } = usePage().props;

    const [searchQuery, setSearchQuery] = useState("");
    const [messageText, setMessageText] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    useEffect(() => {
        setMessages(initialMessages || []);
    }, [initialMessages]);

    // WebSocket Listeners
    useEffect(() => {
        const channel = window.Echo.private(`user.${authUser.id}`);

        channel.listen(".MessageSent", (event) => {
            if (selectedUser && event.sender_id === selectedUser.id) {
                const incoming = {
                    id: event.id,
                    message: event.message,
                    sender_id: event.sender_id,
                    is_sent_by_me: false,
                    created_at_full: event.created_at_full,
                    is_read: true,
                };
                setMessages((prev) => [...prev, incoming]);
                router.post(
                    route("user.message.mark-read"),
                    { sender_id: event.sender_id },
                    {
                        preserveScroll: true,
                        preserveState: true,
                        showProgress: false,
                    }
                );
            } else {
                router.reload({
                    only: ["chatList"],
                    preserveState: true,
                    showProgress: false,
                });
            }
        });

        channel.listen(".UserTyping", (event) => {
            if (selectedUser && event.user_id === selectedUser.id) {
                setIsTyping(event.is_typing);
            }
        });

        return () =>
            channel.stopListening(".MessageSent").stopListening(".UserTyping");
    }, [selectedUser, authUser.id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // Search Logic
    useEffect(() => {
        if (searchQuery.length > 0) {
            const delayDebounceFn = setTimeout(() => {
                router.get(
                    route("user.message.index"),
                    { search: searchQuery },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        showProgress: false,
                        only: ["searchUsers"],
                    }
                );
            }, 300);
            return () => clearTimeout(delayDebounceFn);
        }
    }, [searchQuery]);

    // Typing Logic
    const handleInputChange = (e) => {
        setMessageText(e.target.value);
        if (!selectedUser) return;

        router.post(
            route("user.message.typing"),
            { receiver_id: selectedUser.id, is_typing: true },
            { preserveState: true, preserveScroll: true, showProgress: false }
        );

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            router.post(
                route("user.message.typing"),
                { receiver_id: selectedUser.id, is_typing: false },
                {
                    preserveState: true,
                    preserveScroll: true,
                    showProgress: false,
                }
            );
        }, 2000);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (!messageText.trim() || loading) return;

        setLoading(true);
        router.post(
            route("user.message.store"),
            {
                receiver_id: selectedUser.id,
                message: messageText,
            },
            {
                onSuccess: () => setMessageText(""),
                onFinish: () => setLoading(false),
                preserveScroll: true,
                preserveState: true,
                showProgress: false,
            }
        );
    };

    const formatTime = (stamp) => {
        return new Date(stamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    const formatLastMsgTime = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return "Just now";

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes}m`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h`;

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d`;

        return date.toLocaleDateString([], { month: "short", day: "numeric" });
    };

    return (
        <UserLayout>
            <div className="flex h-[calc(100vh-100px)] bg-white dark:bg-black antialiased">
                {/* Sidebar */}
                <div className="w-[360px] border-r dark:border-gray-800 flex flex-col overflow-hidden">
                    <div className="px-4 pt-4 pb-2">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold dark:text-white">
                                Chats
                            </h1>
                        </div>

                        <div className="relative mb-4">
                            <Search
                                className="absolute left-3 top-2.5 text-gray-500"
                                size={18}
                            />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full border-none focus:ring-0 text-[15px]"
                                placeholder="Search Messenger"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
                        {(searchQuery ? searchUsers : chatList)?.map((user) => (
                            <div
                                key={user.id}
                                onClick={() =>
                                    router.get(
                                        route("user.message.index"),
                                        {
                                            selected_user: user.id,
                                        },
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                            showProgress: false,
                                        }
                                    )
                                }
                                className={`flex items-center gap-3 p-3 mx-2 rounded-2xl cursor-pointer transition-all ${
                                    selectedUser?.id === user.id
                                        ? "bg-[#E7F3FF] dark:bg-blue-900/20"
                                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}
                            >
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={
                                            user.avatar ||
                                            `https://ui-avatars.com/api/?name=${user.name}&background=437C61&color=fff`
                                        }
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#31A24C] border-2 border-white dark:border-gray-900 rounded-full"></div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div className="truncate">
                                            <h4
                                                className={`text-[15px] truncate dark:text-gray-100 ${
                                                    user.unread > 0
                                                        ? "font-bold"
                                                        : "font-medium"
                                                }`}
                                            >
                                                {user.name}
                                            </h4>
                                            <p
                                                className={`text-[14px] truncate ${
                                                    user.unread > 0
                                                        ? "font-bold text-black dark:text-white"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                {user.lastMsg || user.email}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-2">
                                            <span className="text-xs text-gray-500">
                                                {formatLastMsgTime(user.time)}
                                            </span>
                                            {user.unread > 0 && (
                                                <span className="bg-blue-600 w-2.5 h-2.5 rounded-full mt-1"></span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {selectedUser ? (
                        <>
                            <div className="h-[60px] px-4 border-b dark:border-gray-800 flex items-center justify-between bg-white dark:bg-black">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <img
                                            src={
                                                selectedUser.avatar ||
                                                `https://ui-avatars.com/api/?name=${selectedUser.name}`
                                            }
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-black rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[15px] leading-tight dark:text-white">
                                            {selectedUser.name}
                                        </h4>
                                        <p className="text-[12px] text-gray-500">
                                            {isTyping
                                                ? "Typing..."
                                                : "Active now"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-9 custom-scrollbar bg-white dark:bg-black flex flex-col">
                                {messages.map((msg, i) => {
                                    const showDate =
                                        i === 0 ||
                                        new Date(
                                            msg.created_at_full
                                        ).toDateString() !==
                                            new Date(
                                                messages[i - 1].created_at_full
                                            ).toDateString();
                                    return (
                                        <React.Fragment key={msg.id || i}>
                                            {showDate && (
                                                <div className="text-center my-6">
                                                    <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
                                                        {new Date(
                                                            msg.created_at_full
                                                        ).toLocaleDateString(
                                                            [],
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            }
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                            <div
                                                className={`flex ${
                                                    msg.is_sent_by_me
                                                        ? "justify-end"
                                                        : "justify-start"
                                                } items-end gap-2 mb-1`}
                                            >
                                                {!msg.is_sent_by_me && (
                                                    <img
                                                        src={
                                                            selectedUser.avatar ||
                                                            `https://ui-avatars.com/api/?name=${selectedUser.name}`
                                                        }
                                                        className="w-7 h-7 rounded-full mb-1"
                                                        alt="avatar"
                                                    />
                                                )}
                                                <div
                                                    className={`max-w-[70%] px-4 py-2 rounded-2xl text-[15px] shadow-sm ${
                                                        msg.is_sent_by_me
                                                            ? "bg-[#0084FF] text-white rounded-br-none"
                                                            : "bg-[#F0F0F0] dark:bg-gray-800 dark:text-gray-200 rounded-bl-none text-black"
                                                    }`}
                                                >
                                                    {msg.message}
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="p-4 bg-white dark:bg-black">
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-[#F0F2F5] dark:bg-gray-800 rounded-full px-4 py-2 flex items-center">
                                        <input
                                            className="flex-1 bg-transparent border-none focus:ring-0 text-[15px] py-1 dark:text-white"
                                            placeholder="Aa"
                                            value={messageText}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button
                                        disabled={
                                            !messageText.trim() || loading
                                        }
                                        className="text-[#0084FF] hover:opacity-80 disabled:opacity-30 transition-opacity"
                                        onClick={sendMessage}
                                    >
                                        <SendHorizontal
                                            size={24}
                                            fill="currentColor"
                                        />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-black">
                            <MessageSquare
                                size={80}
                                className="text-gray-100 mb-4"
                                strokeWidth={1}
                            />
                            <p className="text-gray-500 font-medium text-lg">
                                Select a chat to start messaging
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
}
