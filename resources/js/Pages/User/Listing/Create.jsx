import React, { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import { Calendar, MapPin, Upload, Info, X, Plus, Trash2 } from "lucide-react";

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
        lat: "",
        lng: "",
        images: [],
        specifications: [{ name: "" }],
        guidelines: [{ name: "" }],
    });

    // --- Dynamic Handlers ---
    const addField = (type) => setData(type, [...data[type], { name: "" }]);

    const removeField = (type, index) => {
        const list = [...data[type]];
        list.splice(index, 1);
        setData(type, list);
    };

    const handleFieldChange = (type, index, value) => {
        const list = [...data[type]];
        list[index].name = value;
        setData(type, list);
    };

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
            <Head title="Create Tool Listing" />
            <div className="space-y-10 font-sans text-[#1A1A1A]">
                <nav className="flex items-center gap-2 text-lg md:text-xl">
                    <span className="text-gray-500">My listings</span>
                    <span className="text-gray-400">/</span>
                    <span className="font-semibold">Add tool</span>
                </nav>

                <form onSubmit={submit} className="mx-auto space-y-8 pb-20">
                    <div className="bg-white p-8 rounded-[24px] shadow-sm space-y-6">
                        {/* Name & Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Tool Name
                                </label>
                                <input
                                    type="text"
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
                                    className="w-full bg-[#E7EEEC] border-none rounded-xl p-3"
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                >
                                    <option value="">
                                        Select tool category
                                    </option>
                                    <option value="Gardening">Gardening</option>
                                    <option value="Power Tools">
                                        Power Tools
                                    </option>
                                </select>
                                {errors.category && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.category}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                rows="4"
                                className="w-full bg-[#E7EEEC] border-none rounded-xl p-3"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            ></textarea>
                            {errors.description && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Pricing */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Price Per day ($)
                                </label>
                                <input
                                    type="number"
                                    className="w-full bg-[#E7EEEC] border-none rounded-xl p-3"
                                    value={data.price_per_day}
                                    onChange={(e) =>
                                        setData("price_per_day", e.target.value)
                                    }
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-medium mb-2">
                                    You get (92%)
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={`$${(
                                            data.price_per_day * 0.92
                                        ).toFixed(2)}`}
                                        readOnly
                                        className="w-full bg-[#E7EEEC] border-none rounded-xl p-3 pr-10"
                                    />
                                    <Info
                                        size={18}
                                        className="absolute right-3 top-3 text-green-600 cursor-help"
                                        onClick={() =>
                                            setShowTooltip(!showTooltip)
                                        }
                                    />
                                </div>
                                {showTooltip && (
                                    <div className="absolute -top-12 right-0 bg-white shadow-lg p-2 rounded text-[10px] w-40 border z-10">
                                        8% platform fee applies. You keep 92%.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Available From
                                </label>
                                <input
                                    type="date"
                                    className="w-full bg-[#E7EEEC] border-none rounded-xl p-3"
                                    value={data.availability_from}
                                    onChange={(e) =>
                                        setData(
                                            "availability_from",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Available To
                                </label>
                                <input
                                    type="date"
                                    className="w-full bg-[#E7EEEC] border-none rounded-xl p-3"
                                    value={data.availability_to}
                                    onChange={(e) =>
                                        setData(
                                            "availability_to",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium">
                                Location
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Address"
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
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="number"
                                    step="any"
                                    placeholder="Latitude"
                                    className="w-full bg-[#E7EEEC] border-none rounded-xl p-3 text-sm"
                                    value={data.lat}
                                    onChange={(e) =>
                                        setData("lat", e.target.value)
                                    }
                                />
                                <input
                                    type="number"
                                    step="any"
                                    placeholder="Longitude"
                                    className="w-full bg-[#E7EEEC] border-none rounded-xl p-3 text-sm"
                                    value={data.lng}
                                    onChange={(e) =>
                                        setData("lng", e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* Dynamic Specifications */}
                        <div className="border-t pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold">Specifications</h3>
                                <button
                                    type="button"
                                    onClick={() => addField("specifications")}
                                    className="text-[#2D6A4F] text-sm font-bold flex items-center gap-1"
                                >
                                    <Plus size={16} /> Add
                                </button>
                            </div>
                            {data.specifications.map((item, i) => (
                                <div key={i} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        className="flex-1 bg-[#E7EEEC] border-none rounded-xl p-3"
                                        value={item.name}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                "specifications",
                                                i,
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g. Battery Life: 4hrs"
                                    />
                                    {data.specifications.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeField("specifications", i)
                                            }
                                            className="text-red-500"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Dynamic Guidelines */}
                        <div className="border-t pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold">Guidelines</h3>
                                <button
                                    type="button"
                                    onClick={() => addField("guidelines")}
                                    className="text-[#2D6A4F] text-sm font-bold flex items-center gap-1"
                                >
                                    <Plus size={16} /> Add
                                </button>
                            </div>
                            {data.guidelines.map((item, i) => (
                                <div key={i} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        className="flex-1 bg-[#E7EEEC] border-none rounded-xl p-3"
                                        value={item.name}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                "guidelines",
                                                i,
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g. Return clean"
                                    />
                                    {data.guidelines.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeField("guidelines", i)
                                            }
                                            className="text-red-500"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Media */}
                    <div className="bg-white p-8 rounded-[24px] shadow-sm">
                        <h3 className="text-lg font-bold mb-6">Upload Media</h3>
                        <div className="border-2 border-dashed border-gray-100 rounded-[24px] p-12 text-center">
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
                                className="bg-[#2D6A4F] text-white px-6 py-3 rounded-xl inline-flex items-center gap-2"
                            >
                                <Upload size={20} /> Select Photos
                            </button>
                            <p className="mt-4 text-sm text-gray-400">
                                Up to 10 photos
                            </p>
                        </div>
                        <div className="grid grid-cols-5 gap-4 mt-8">
                            {previews.map((src, index) => (
                                <div
                                    key={index}
                                    className="aspect-square rounded-xl overflow-hidden relative group"
                                >
                                    <img
                                        src={src}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        {errors.images && (
                            <p className="text-red-500 text-xs mt-2">
                                {errors.images}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            className="flex-1 bg-white border border-[#2D6A4F] text-[#2D6A4F] py-4 rounded-full font-bold"
                        >
                            Preview
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 bg-[#2D6A4F] text-white py-4 rounded-full font-bold"
                        >
                            {processing ? "Processing..." : "Submit Listing →"}
                        </button>
                    </div>
                </form>
            </div>
        </UserLayout>
    );
}
