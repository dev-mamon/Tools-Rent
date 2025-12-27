import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { useForm } from "@inertiajs/react";
import { Camera } from "lucide-react";

export default function ProfileUpdate() {
    const { data, setData, post, processing, errors } = useForm({
        name: "Musfiq",
        email: "email@mail.com",
        phone: "+923787248724872",
        avatar: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("update-profile"));
    };

    return (
        <UserLayout>
            <div className="max-w-3xl mx-auto">
                <h2 className="text-[20px] font-bold mb-8">Edit Profile</h2>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-10 rounded-[24px] shadow-sm space-y-6"
                >
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative">
                            <img
                                src="https://i.pravatar.cc/150?u=musfiq"
                                className="w-24 h-24 rounded-2xl object-cover border-4 border-gray-50"
                                alt="Profile"
                            />
                            <label className="absolute -bottom-2 -right-2 bg-[#437C61] p-2 rounded-full shadow-md cursor-pointer text-white hover:bg-[#36634d] transition-colors">
                                <Camera size={16} />
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) =>
                                        setData("avatar", e.target.files[0])
                                    }
                                />
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full px-5 py-3 bg-gray-50 border-none rounded-[14px] text-sm focus:ring-2 focus:ring-[#437C61]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full px-5 py-3 bg-gray-50 border-none rounded-[14px] text-sm focus:ring-2 focus:ring-[#437C61]"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                className="w-full px-5 py-3 bg-gray-50 border-none rounded-[14px] text-sm focus:ring-2 focus:ring-[#437C61]"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            disabled={processing}
                            className="w-full bg-[#437C61] text-white py-3.5 rounded-[14px] font-bold text-sm hover:bg-[#36634d] transition-all shadow-md"
                        >
                            {processing ? "Updating..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </UserLayout>
    );
}
