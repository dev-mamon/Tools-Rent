import { Head, Link, useForm } from "@inertiajs/react";
import { Mail, Leaf, ArrowLeft } from "lucide-react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <>
            <Head title="Forgot Password" />

            <div className="min-h-screen flex items-center justify-center bg-[#4b4b4b] relative overflow-hidden font-sans">
                {/* Background Banner (Login Style) */}
                <div
                    className="absolute left-0 top-0 h-full w-[55%] skew-x-12 -translate-x-32 hidden lg:block bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/assets/images/banner.jpg')",
                    }}
                >
                    <div className="absolute inset-0 bg-black/70" />
                </div>

                <div className="relative z-10 w-full max-w-[960px] min-h-[560px] bg-white rounded-[40px] shadow-2xl flex overflow-hidden m-4">
                    {/* Left Image */}
                    <div className="hidden md:flex w-[45%] p-5">
                        <div className="w-full h-full rounded-[28px] overflow-hidden">
                            <img
                                src="/assets/images/banner.jpg"
                                className="w-full h-full object-cover"
                                alt="Banner"
                            />
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="w-full md:w-[55%] px-10 lg:px-16 py-14 flex flex-col justify-center items-center">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-50 text-[#2d5a43] mx-auto mb-4">
                                <Leaf className="w-8 h-8" />
                            </div>
                            <h2 className="text-[#2d5a43] text-2xl font-black uppercase tracking-widest">
                                Reset Password
                            </h2>
                            <p className="text-gray-400 text-sm mt-2 px-4">
                                Enter your email to receive password reset
                                instructions.
                            </p>
                        </div>

                        {status && (
                            <div className="mb-4 font-medium text-sm text-green-600 bg-green-50 p-3 rounded-xl w-full max-w-[360px] text-center">
                                {status}
                            </div>
                        )}

                        <form
                            onSubmit={submit}
                            className="w-full max-w-[360px] space-y-6"
                        >
                            <div>
                                <label className="text-[11px] font-semibold text-gray-500 ml-1 mb-1 block">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="Enter email your address"
                                        className="w-full pl-11 pr-4 py-3.5 text-xs rounded-full border border-gray-200 focus:ring-1 focus:ring-emerald-500 outline-none shadow-sm"
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-[10px] mt-1 ml-2">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-[#2d5a43] to-[#1a3a2a] hover:opacity-90 text-white font-bold py-4 rounded-full text-sm shadow-lg transition-all active:scale-[0.98]"
                            >
                                Reset Password
                            </button>

                            <div className="text-center">
                                <Link
                                    href={route("login")}
                                    className="text-xs text-gray-400 font-bold hover:text-[#2d5a43] flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-3 h-3" /> Back to
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
