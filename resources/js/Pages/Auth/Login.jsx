import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Leaf } from "lucide-react";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Login" />

            {/* ===== PAGE WRAPPER ===== */}
            <div className="min-h-screen flex items-center justify-center bg-[#4b4b4b] dark:bg-gray-950 relative overflow-hidden font-sans transition-colors duration-300">
                <div
                    className="absolute left-0 top-0 h-full w-[55%] skew-x-12 -translate-x-32 hidden lg:block bg-cover bg-center opacity-50 dark:opacity-30"
                    style={{
                        backgroundImage: "url('/assets/images/banner.jpg')",
                    }}
                >
                    <div className="absolute inset-0 bg-black/70" />
                </div>

                {/* ===== MAIN CARD ===== */}
                <div className="relative z-10 w-full max-w-[960px] min-h-[560px] bg-white dark:bg-gray-900 rounded-[40px] shadow-2xl flex overflow-hidden m-4 border border-transparent dark:border-gray-800 transition-all">
                    {/* ===== LEFT IMAGE ===== */}
                    <div className="hidden md:flex w-[45%] p-5">
                        <div className="w-full h-full rounded-[28px] overflow-hidden grayscale-[20%] dark:grayscale-[50%]">
                            <img
                                src="/assets/images/banner.jpg"
                                alt="Gardening"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* ===== RIGHT FORM ===== */}
                    <div className="w-full md:w-[55%] px-10 lg:px-16 py-14 flex flex-col justify-center">
                        {/* Logo */}
                        <div className="text-center mb-10">
                            <div className="flex flex-col items-center mb-4">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-[#2d5a43] dark:text-emerald-400">
                                    <Leaf
                                        className="w-6 h-6"
                                        strokeWidth={1.8}
                                    />
                                </div>
                                <span className="mt-2 text-[#2d5a43] dark:text-emerald-400 font-black text-xl uppercase">
                                    Jardiloc
                                </span>
                            </div>

                            <h2 className="text-[#2d5a43] dark:text-emerald-400 text-lg font-bold uppercase">
                                Welcome back
                            </h2>
                            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                                Sign in to your account to continue
                            </p>
                        </div>

                        {/* ===== FORM ===== */}
                        <form
                            onSubmit={submit}
                            className="space-y-5 max-w-[360px] mx-auto w-full"
                        >
                            {/* Email */}
                            <div>
                                <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 ml-1 mb-1 block uppercase tracking-wider">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-600" />
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="Enter email address"
                                        className="w-full pl-11 pr-4 py-3 text-xs rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-emerald-500 dark:focus:ring-emerald-400 outline-none transition-all"
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 dark:text-red-400 text-[10px] mt-1 ml-2">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 ml-1 mb-1 block uppercase tracking-wider">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-600" />

                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        placeholder="Enter your password"
                                        className="w-full pl-11 pr-11 py-3 text-xs rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-emerald-500 dark:focus:ring-emerald-400 outline-none transition-all"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>

                                <div className="flex justify-end mt-1">
                                    <Link
                                        href="#"
                                        className="text-[10px] font-bold text-gray-400 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                {errors.password && (
                                    <p className="text-red-500 dark:text-red-400 text-[10px] mt-1 ml-2">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="pt-4 space-y-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-[#2d5a43] dark:bg-emerald-600 hover:bg-[#1f412c] dark:hover:bg-emerald-700 text-white font-bold py-3 rounded-full text-sm shadow-md transition-all active:scale-[0.98] disabled:opacity-70"
                                >
                                    {processing ? "Signing In..." : "Sign In"}
                                </button>

                                <Link
                                    href={route("register")}
                                    className="w-full flex justify-center items-center border border-[#2d5a43] dark:border-emerald-600 text-[#2d5a43] dark:text-emerald-400 font-bold py-3 rounded-full text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
                                >
                                    Create an account
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
