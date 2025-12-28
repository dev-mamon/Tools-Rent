import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Leaf, User } from "lucide-react";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Register" />

            {/* ===== PAGE WRAPPER ===== */}
            <div className="min-h-screen flex items-center justify-center bg-[#4b4b4b] relative overflow-hidden font-sans">
                <div
                    className="absolute left-0 top-0 h-full w-[55%] skew-x-12 -translate-x-32 hidden lg:block bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/assets/images/banner.jpg')",
                    }}
                >
                    <div className="absolute inset-0 bg-black/70" />
                </div>

                {/* ===== MAIN CARD ===== */}
                <div className="relative z-10 w-full max-w-[960px] min-h-[600px] bg-white rounded-[40px] shadow-2xl flex overflow-hidden m-4">
                    {/* ===== LEFT IMAGE ===== */}
                    <div className="hidden md:flex w-[45%] p-5">
                        <div className="w-full h-full rounded-[28px] overflow-hidden">
                            <img
                                src="/assets/images/banner.jpg"
                                alt="Gardening"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* ===== RIGHT FORM ===== */}
                    <div className="w-full md:w-[55%] px-10 lg:px-16 py-10 flex flex-col justify-center">
                        {/* Logo */}
                        <div className="text-center mb-8">
                            <div className="flex flex-col items-center mb-4">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-50 text-[#2d5a43]">
                                    <Leaf
                                        className="w-6 h-6"
                                        strokeWidth={1.8}
                                    />
                                </div>
                                <span className="mt-2 text-[#2d5a43] font-black text-xl uppercase">
                                    Jardiloc
                                </span>
                            </div>
                            <h2 className="text-[#2d5a43] text-lg font-bold uppercase">
                                Join the Community
                            </h2>
                            <p className="text-gray-400 text-xs mt-1">
                                Create your account to start gardening
                            </p>
                        </div>

                        {/* ===== FORM ===== */}
                        <form
                            onSubmit={submit}
                            className="space-y-4 max-w-[360px] mx-auto w-full"
                        >
                            {/* Name */}
                            <div>
                                <label className="text-[11px] font-semibold text-gray-500 ml-1 mb-1 block">
                                    {" "}
                                    Full Name{" "}
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="Enter your name"
                                        className="w-full pl-11 pr-4 py-3 text-xs rounded-full border border-gray-200 focus:ring-1 focus:ring-emerald-500 outline-none"
                                        required
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-red-500 text-[10px] mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-[11px] font-semibold text-gray-500 ml-1 mb-1 block">
                                    {" "}
                                    Email Address{" "}
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="Enter email address"
                                        className="w-full pl-11 pr-4 py-3 text-xs rounded-full border border-gray-200 focus:ring-1 focus:ring-emerald-500 outline-none"
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-[10px] mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="text-[11px] font-semibold text-gray-500 ml-1 mb-1 block">
                                    {" "}
                                    Password{" "}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        placeholder="Create a password"
                                        className="w-full pl-11 pr-11 py-3 text-xs rounded-full border border-gray-200 focus:ring-1 focus:ring-emerald-500 outline-none"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-[10px] mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="text-[11px] font-semibold text-gray-500 ml-1 mb-1 block">
                                    {" "}
                                    Confirm Password{" "}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Repeat your password"
                                        className="w-full pl-11 pr-4 py-3 text-xs rounded-full border border-gray-200 focus:ring-1 focus:ring-emerald-500 outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit and Link */}
                            <div className="pt-4 space-y-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-[#2d5a43] hover:bg-[#1f412c] text-white font-bold py-3 rounded-full text-sm shadow-md transition"
                                >
                                    Create Account
                                </button>

                                <div className="text-center">
                                    <span className="text-[11px] text-gray-400">
                                        Already have an account?{" "}
                                    </span>
                                    <Link
                                        href={route("login")}
                                        className="text-[11px] font-bold text-[#2d5a43] hover:underline"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
