import React, { useState, useEffect, useRef } from "react";
import { router, usePage } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import {
    Search,
    Plus,
    Mic,
    SendHorizontal,
    X,
    MessageSquare,
    Clock,
    Check,
    CheckCheck,
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
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [messageText, setMessageText] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState(initialMessages || []);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    // WebSocket subscription for real-time messages
    useEffect(() => {
        if (!selectedUser) return;

        // Subscribe to private channel for receiving messages
        window.Echo.private(`user.${authUser.id}`).listen(
            ".MessageSent",
            (event) => {
                // Only add message if it's from the currently selected user
                if (event.sender_id === selectedUser.id) {
                    const newMessage = {
                        id: event.id,
                        message: event.message,
                        sender_id: event.sender_id,
                        is_sent_by_me: false,
                        created_at_full: event.created_at_full,
                        created_at: formatMessageTime(event.created_at_full),
                        is_read: event.is_read,
                    };

                    setMessages((prev) => [...prev, newMessage]);

                    // Mark message as read
                    router.post(route("user.message.mark-read"), {
                        sender_id: event.sender_id,
                    });
                }
            }
        );

        // Cleanup on unmount
        return () => {
            window.Echo.private(`user.${authUser.id}`).stopListening(
                ".MessageSent"
            );
        };
    }, [selectedUser, authUser.id]);

    // Update messages when selected user changes
    useEffect(() => {
        setMessages(initialMessages || []);
        scrollToBottom();
    }, [initialMessages]);

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    };

    // Handle search input with debounce
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === "") {
            setShowSearchResults(false);
            setSearchResults([]);
            return;
        }

        setIsSearching(true);

        // Debounce search
        const timer = setTimeout(() => {
            router.get(
                route("user.message.index"),
                { search: query },
                {
                    preserveState: true,
                    replace: true,
                    onSuccess: () => {
                        setSearchResults(searchUsers || []);
                        setShowSearchResults(true);
                        setIsSearching(false);
                    },
                    onError: () => {
                        setIsSearching(false);
                    },
                }
            );
        }, 500);

        return () => clearTimeout(timer);
    };

    // Clear search
    const clearSearch = () => {
        setSearchQuery("");
        setShowSearchResults(false);
        setSearchResults([]);
        router.get(route("user.message.index"), {}, { preserveState: true });
    };

    // Select user to chat with
    const selectUser = (user) => {
        router.get(
            route("user.message.index"),
            { selected_user: user.id },
            {
                preserveState: true,
                onSuccess: () => {
                    setShowSearchResults(false);
                    setSearchQuery("");
                },
            }
        );
    };

    // Send message
    // Send message using Inertia router instead of fetch
    const sendMessage = (e) => {
        e.preventDefault();

        if (!messageText.trim() || !selectedUser || loading) return;

        setLoading(true);

        router.post(
            route("user.message.store"),
            {
                receiver_id: selectedUser.id,
                message: messageText,
            },
            {
                // This prevents a full page reload and keeps the scroll position
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setMessageText("");
                    scrollToBottom();
                },
                onFinish: () => {
                    setLoading(false);
                },
            }
        );
    };

    // Format time for display
    const formatMessageTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    // Group messages by date
    const groupMessagesByDate = () => {
        const groups = {};
        messages.forEach((message) => {
            const date = new Date(message.created_at_full).toLocaleDateString(
                "en-US",
                {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }
            );

            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
        });
        return groups;
    };

    const messageGroups = groupMessagesByDate();
    const displayList = showSearchResults ? searchResults : chatList;

    return (
        <UserLayout>
            <div className="flex h-[calc(100vh-120px)] gap-6 font-sans transition-colors duration-300">
                {/* --- LEFT SIDE: INBOX LIST --- */}
                <div className="w-1/3 bg-white dark:bg-gray-900 rounded-[24px] flex flex-col overflow-hidden shadow-sm border border-gray-50 dark:border-gray-800">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                            {showSearchResults ? "Search Results" : "Inbox"}
                        </h2>
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-3 text-gray-400 dark:text-gray-500"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-1 focus:ring-[#437C61] dark:text-gray-200 dark:placeholder-gray-500"
                            />
                            {searchQuery && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>

                        {!showSearchResults && (
                            <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 mt-4 uppercase tracking-wider">
                                Conversations
                            </p>
                        )}
                    </div>

                    {/* User List */}
                    <div className="flex-1 overflow-y-auto px-2 pb-4 custom-scrollbar">
                        {isSearching ? (
                            <div className="text-center py-8">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#437C61]"></div>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">
                                    Searching...
                                </p>
                            </div>
                        ) : displayList.length > 0 ? (
                            displayList.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => selectUser(user)}
                                    className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                                        selectedUser?.id === user.id
                                            ? "bg-gray-50 dark:bg-gray-800 border-l-4 border-[#437C61]"
                                            : ""
                                    }`}
                                >
                                    <img
                                        src={user.avatar}
                                        className="w-11 h-11 rounded-full object-cover border-2 border-transparent dark:border-gray-700"
                                        alt={user.name}
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                user.name
                                            )}&background=437C61&color=fff`;
                                        }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-bold text-[14px] text-gray-900 dark:text-gray-200">
                                                {user.name}
                                            </h4>
                                            {user.time && (
                                                <span className="text-[10px] text-gray-400 dark:text-gray-500">
                                                    {user.time}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[12px] text-gray-500 dark:text-gray-400 truncate font-medium mt-0.5">
                                            {user.lastMsg || user.email}
                                        </p>
                                    </div>
                                    {!user.isContact && showSearchResults && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                selectUser(user);
                                            }}
                                            className="flex items-center gap-1 text-xs text-[#437C61] dark:text-emerald-400 font-medium px-2 py-1 rounded bg-[#437C61]/10 dark:bg-emerald-400/10 hover:bg-[#437C61]/20 dark:hover:bg-emerald-400/20 transition-colors"
                                        >
                                            <MessageSquare size={12} />
                                            New
                                        </button>
                                    )}
                                    {user.unread > 0 && (
                                        <span className="bg-[#437C61] dark:bg-emerald-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
                                            {user.unread}
                                        </span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500 dark:text-gray-400">
                                    {showSearchResults
                                        ? "No users found"
                                        : "No conversations yet"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- RIGHT SIDE: CONVERSATION --- */}
                <div className="flex-1 bg-white dark:bg-gray-900 rounded-[24px] flex flex-col overflow-hidden shadow-sm border border-gray-50 dark:border-gray-800">
                    {selectedUser ? (
                        <>
                            {/* Header */}
                            <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex justify-between items-start">
                                <div className="flex gap-3">
                                    <img
                                        src={selectedUser.avatar}
                                        className="w-11 h-11 rounded-full object-cover"
                                        alt={selectedUser.name}
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                selectedUser.name
                                            )}&background=437C61&color=fff`;
                                        }}
                                    />
                                    <div>
                                        <h4 className="font-bold text-[16px] text-gray-900 dark:text-white">
                                            {selectedUser.name}
                                        </h4>
                                        <p className="text-[12px] text-gray-400 dark:text-gray-500 font-medium">
                                            {selectedUser.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                                    <Clock size={12} />
                                    {messages.length > 0
                                        ? `${messages.length} messages`
                                        : "Start a conversation"}
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div
                                ref={messagesContainerRef}
                                className="flex-1 overflow-y-auto p-6 messages-container bg-white dark:bg-gray-900 custom-scrollbar"
                            >
                                {messages.length > 0 ? (
                                    Object.entries(messageGroups).map(
                                        ([date, dateMessages]) => (
                                            <div key={date}>
                                                <div className="text-center text-[11px] text-gray-400 dark:text-gray-500 font-bold uppercase py-4">
                                                    {date}
                                                </div>
                                                {dateMessages.map((msg) => (
                                                    <div
                                                        key={msg.id}
                                                        className={`flex gap-3 mb-4 ${
                                                            msg.is_sent_by_me
                                                                ? "justify-end"
                                                                : ""
                                                        }`}
                                                    >
                                                        {!msg.is_sent_by_me && (
                                                            <img
                                                                src={
                                                                    selectedUser.avatar
                                                                }
                                                                className="w-8 h-8 rounded-full mt-auto"
                                                                alt={
                                                                    selectedUser.name
                                                                }
                                                                onError={(
                                                                    e
                                                                ) => {
                                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                                        selectedUser.name
                                                                    )}&background=437C61&color=fff`;
                                                                }}
                                                            />
                                                        )}
                                                        <div
                                                            className={`max-w-[70%] ${
                                                                msg.is_sent_by_me
                                                                    ? "flex flex-col items-end"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <div
                                                                className={`p-3.5 rounded-2xl ${
                                                                    msg.is_sent_by_me
                                                                        ? "bg-[#437C61] dark:bg-emerald-600 text-white rounded-br-none"
                                                                        : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none"
                                                                }`}
                                                            >
                                                                <p className="text-[13px] font-medium">
                                                                    {
                                                                        msg.message
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div
                                                                className={`text-[10px] text-gray-400 dark:text-gray-500 mt-1 px-1 ${
                                                                    msg.is_sent_by_me
                                                                        ? "text-right"
                                                                        : ""
                                                                }`}
                                                            >
                                                                {msg.created_at}
                                                                {msg.is_sent_by_me && (
                                                                    <span className="ml-1">
                                                                        {msg.is_read ? (
                                                                            <CheckCheck
                                                                                size={
                                                                                    12
                                                                                }
                                                                                className="inline ml-1"
                                                                            />
                                                                        ) : (
                                                                            <Check
                                                                                size={
                                                                                    12
                                                                                }
                                                                                className="inline ml-1"
                                                                            />
                                                                        )}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    )
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                            <MessageSquare
                                                className="text-gray-400 dark:text-gray-500"
                                                size={32}
                                            />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            No messages yet
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
                                            Start a conversation with{" "}
                                            {selectedUser.name} by sending your
                                            first message below.
                                        </p>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Message Input */}
                            <div className="p-6 pt-2 bg-white dark:bg-gray-900">
                                <form onSubmit={sendMessage}>
                                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl border border-transparent dark:border-gray-700">
                                        <button
                                            type="button"
                                            className="p-2 text-gray-400 dark:text-gray-500 hover:text-[#437C61] dark:hover:text-emerald-400 transition-colors"
                                        >
                                            <Plus size={22} />
                                        </button>
                                        <input
                                            type="text"
                                            value={messageText}
                                            onChange={(e) =>
                                                setMessageText(e.target.value)
                                            }
                                            placeholder={`Message ${selectedUser.name}`}
                                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                                            disabled={loading}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === "Enter" &&
                                                    !e.shiftKey
                                                ) {
                                                    e.preventDefault();
                                                    sendMessage(e);
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="p-2 text-gray-400 dark:text-gray-500 hover:text-[#437C61] dark:hover:text-emerald-400 transition-colors"
                                        >
                                            <Mic size={22} />
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={
                                                !messageText.trim() || loading
                                            }
                                            className={`p-2 rounded-lg transition-colors ${
                                                messageText.trim() && !loading
                                                    ? "bg-[#437C61] dark:bg-emerald-600 text-white hover:bg-[#37634f] dark:hover:bg-emerald-700"
                                                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                            }`}
                                        >
                                            {loading ? (
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <SendHorizontal size={22} />
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        /* Empty State when no user is selected */
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-24 h-24 mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <MessageSquare
                                    className="text-gray-400 dark:text-gray-500"
                                    size={48}
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
                                Select a conversation
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
                                Choose a conversation from the list or search
                                for a user to start a new chat.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                                <Search size={16} />
                                <span>Search for users to start chatting</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
}
