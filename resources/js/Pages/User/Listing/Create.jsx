import React, { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import { Calendar, MapPin, Upload, Info, X } from "lucide-react";

export default function CreateListing() {
    const [showTooltip, setShowTooltip] = useState(false);
    const [previews, setPreviews] = useState([]);

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        category: "",
        description: "",
        price_per_day: "",
        quantity: "1",
        availability_from: "",
        availability_to: "",
        location: "",
        lat: "", // New
        lng: "", // New
        images: [],
    });

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = [...data.images, ...files].slice(0, 10);
        setData("images", newImages);
        const newPreviews = newImages.map((file) => URL.createObjectURL(file));
        setPreviews(newPreviews);
    };

    const removeImage = (index) => {
        const filteredImages = data.images.filter((_, i) => i !== index);
        const filteredPreviews = previews.filter((_, i) => i !== index);
        setData("images", filteredImages);
        setPreviews(filteredPreviews);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("user.my-listings.store"), { forceFormData: true });
    };

    return (
        <UserLayout>
            <Head title="Tools Create" />
            <div className="space-y-10 font-sans text-[#1A1A1A]">
                {/* 1. BREADCRUMB */}
                <nav className="flex items-center gap-2 text-lg md:text-xl">
                    <span className="text-gray-500 cursor-pointer hover:text-gray-700">
                        My listings
                    </span>
                    <span className="text-gray-400">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </span>
                    <span className="font-semibold">Add tool</span>
                </nav>

                <section>
                    <form onSubmit={submit} className="mx-auto space-y-8 pb-20">
                        <div className="bg-white p-8 rounded-[24px] shadow-sm space-y-6">
                            {/* Tool Name & Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Tool Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Add tool name"
                                        className="w-full bg-[#E7EEEC] border-none rounded-xl p-3"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Category
                                    </label>
                                    <select
                                        className="w-full bg-[#E7EEEC] border-none rounded-xl p-3 text-gray-400"
                                        onChange={(e) =>
                                            setData("category", e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Select tool category
                                        </option>
                                        <option value="Gardening">
                                            Gardening
                                        </option>
                                        <option value="Power Tools">
                                            Power Tools
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Description
                                </label>
                                <textarea
                                    rows="4"
                                    placeholder="Write tool description here"
                                    className="w-full bg-[#E7EEEC] border-none rounded-xl p-3"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                ></textarea>
                            </div>

                            {/* Pricing */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Set Price Per day
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="$20.00"
                                        className="w-full bg-[#E7EEEC] border-none rounded-xl p-3"
                                        value={data.price_per_day}
                                        onChange={(e) =>
                                            setData(
                                                "price_per_day",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="relative">
                                    <label className="block text-sm font-medium mb-2">
                                        You get after rental
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={`$${(
                                                data.price_per_day * 0.92
                                            ).toFixed(2)}`}
                                            readOnly
                                            onClick={() =>
                                                setShowTooltip(!showTooltip)
                                            }
                                            className="w-full bg-[#E7EEEC] border-none rounded-xl p-3 pr-10 cursor-pointer focus:outline-none"
                                        />
                                        <Info
                                            size={18}
                                            className="absolute right-3 top-3 text-green-600 pointer-events-none"
                                        />
                                    </div>
                                    {showTooltip && (
                                        <div className="absolute -top-14 right-0 bg-white shadow-xl p-3 rounded-lg border border-gray-100 text-[10px] w-48 z-20 animate-in fade-in zoom-in duration-200">
                                            <p className="font-bold text-[#2D6A4F]">
                                                8% platform fee applies.
                                            </p>
                                            <p className="text-gray-500">
                                                You keep 92% of your earnings.
                                            </p>
                                            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white border-b border-r border-gray-100 rotate-45"></div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Availability */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Availability
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="date"
                                        className="w-full bg-[#E7EEEC] border-none rounded-xl p-3"
                                        onChange={(e) =>
                                            setData(
                                                "availability_from",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <input
                                        type="date"
                                        className="w-full bg-[#E7EEEC] border-none rounded-xl p-3"
                                        onChange={(e) =>
                                            setData(
                                                "availability_to",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            {/* Location Section - Lat/Lng added here */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Location
                                </label>
                                <div className="relative mb-4">
                                    <input
                                        type="text"
                                        placeholder="Choose location address"
                                        className="w-full bg-[#E7EEEC] border-none rounded-xl p-3"
                                        value={data.location}
                                        onChange={(e) =>
                                            setData("location", e.target.value)
                                        }
                                    />
                                    <MapPin
                                        size={18}
                                        className="absolute right-3 top-3 text-green-700"
                                    />
                                </div>

                                {/* Latitude & Longitude Input Fields */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500 ml-1">
                                            Latitude
                                        </label>
                                        <input
                                            type="number"
                                            step="any"
                                            placeholder="e.g. 23.8103"
                                            className="w-full bg-[#E7EEEC] border-none rounded-xl p-3"
                                            value={data.lat}
                                            onChange={(e) =>
                                                setData("lat", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500 ml-1">
                                            Longitude
                                        </label>
                                        <input
                                            type="number"
                                            step="any"
                                            placeholder="e.g. 90.4125"
                                            className="w-full bg-[#E7EEEC] border-none rounded-xl p-3"
                                            value={data.lng}
                                            onChange={(e) =>
                                                setData("lng", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="w-full h-64 bg-gray-200 rounded-2xl overflow-hidden relative">
                                    <img
                                        src="/map-placeholder.png"
                                        alt="Map"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Upload Media Section */}
                        <div className="bg-white p-8 rounded-[24px] shadow-sm">
                            <h3 className="text-lg font-bold mb-6">
                                Upload Media
                            </h3>
                            <div className="border-2 border-dashed border-gray-100 rounded-[24px] p-12 flex flex-col items-center justify-center space-y-4">
                                <input
                                    type="file"
                                    id="image-input"
                                    multiple
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        document
                                            .getElementById("image-input")
                                            .click()
                                    }
                                    className="bg-[#2D6A4F] text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold"
                                >
                                    <Upload size={20} /> Select Photos
                                </button>
                                <p className="text-sm text-gray-400">
                                    or drag photos here (Up to 10 photos)
                                </p>
                            </div>

                            <div className="grid grid-cols-5 gap-4 mt-8">
                                {previews.map((src, index) => (
                                    <div
                                        key={index}
                                        className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative group"
                                    >
                                        <img
                                            src={src}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="button"
                                className="flex-1 bg-white border border-[#2D6A4F] text-[#2D6A4F] py-4 rounded-full font-bold"
                            >
                                Save & Preview
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-[#2D6A4F] text-white py-4 rounded-full font-bold flex items-center justify-center gap-2"
                            >
                                {processing
                                    ? "Processing..."
                                    : "Request for Listing"}{" "}
                                <span className="text-xl">→</span>
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </UserLayout>
    );
}
