import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import { Timer, RefreshCcw } from "lucide-react";

export default function VerifyEmail({ status, auth }) {
    const [timeLeft, setTimeLeft] = useState(600);
    const boxRefs = [useRef(), useRef(), useRef(), useRef()]; // ৪টি বক্সের জন্য রেফারেন্স

    const { data, setData, post, processing, errors } = useForm({
        code: ["", "", "", ""], // ৪টি আলাদা ডিজিট
    });

    // কাউন্টডাউন টাইমার
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // ইনপুট হ্যান্ডলিং লজিক (এক বক্স থেকে অন্য বক্সে যাওয়ার জন্য)
    const handleChange = (index, value) => {
        if (isNaN(value)) return; // শুধু সংখ্যা এলাউ করবে

        const newCode = [...data.code];
        newCode[index] = value.substring(value.length - 1);
        setData("code", newCode);

        // পরের বক্সে ফোকাস করা
        if (value && index < 3) {
            boxRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // ব্যাকস্পেস চাপলে আগের বক্সে যাবে
        if (e.key === "Backspace" && !data.code[index] && index > 0) {
            boxRefs[index - 1].current.focus();
        }
    };

    const submit = (e) => {
        e.preventDefault();
        // ৪টি ডিজিটকে একসাথে জোড়া লাগিয়ে পাঠানো
        const finalCode = data.code.join("");
        post(route("verification.verify_code"), {
            data: { code: finalCode },
        });
    };

    const formatTime = (s) =>
        `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

    return (
        <>
            <Head title="Verify Email" />

            <div className="min-h-screen flex items-center justify-center bg-[#4b4b4b] relative overflow-hidden font-sans">
                {/* Background Image (Same as Login) */}
                <div
                    className="absolute left-0 top-0 h-full w-[55%] skew-x-12 -translate-x-32 hidden lg:block bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/assets/images/banner.jpg')",
                    }}
                >
                    <div className="absolute inset-0 bg-black/70" />
                </div>

                {/* Main Card */}
                <div className="relative z-10 w-full max-w-[960px] min-h-[560px] bg-white rounded-[40px] shadow-2xl flex overflow-hidden m-4">
                    {/* Left Image Section */}
                    <div className="hidden md:flex w-[45%] p-5">
                        <div className="w-full h-full rounded-[28px] overflow-hidden">
                            <img
                                src="/assets/images/banner.jpg"
                                className="w-full h-full object-cover"
                                alt="Banner"
                            />
                        </div>
                    </div>

                    {/* Right Content Section */}
                    <div className="w-full md:w-[55%] px-10 lg:px-16 py-14 flex flex-col justify-center items-center text-center">
                        {/* Logo */}
                        <div className="mb-6">
                            <img
                                src="/assets/images/logo.png"
                                className="w-16 h-16 mx-auto mb-2"
                                alt="Jardiloc"
                            />
                            <h1 className="text-[#2d5a43] font-black text-xl uppercase tracking-widest">
                                Jardiloc
                            </h1>
                        </div>

                        <h2 className="text-[#2d5a43] text-2xl font-bold mb-2">
                            Enter the verification code
                        </h2>
                        <p className="text-gray-500 text-sm mb-8">
                            We sent code to{" "}
                            <span className="text-[#2d5a43] font-semibold">
                                {auth?.user?.email}
                            </span>
                        </p>

                        <form
                            onSubmit={submit}
                            className="w-full max-w-[360px] space-y-8"
                        >
                            {/* 4-Digit Input Boxes */}
                            <div className="flex justify-between gap-3 px-4">
                                {data.code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={boxRefs[index]}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) =>
                                            handleChange(index, e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            handleKeyDown(index, e)
                                        }
                                        className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-100 rounded-2xl focus:border-emerald-500 focus:ring-0 outline-none transition-all shadow-sm"
                                    />
                                ))}
                            </div>

                            {/* Timer */}
                            <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-400">
                                <Timer className="w-4 h-4" />
                                <span>Expires in: {formatTime(timeLeft)}</span>
                            </div>

                            {/* Continue Button */}
                            <button
                                type="submit"
                                disabled={processing || data.code.includes("")}
                                className="w-full bg-[#2d5a43] hover:bg-[#1f412c] text-white font-bold py-4 rounded-full shadow-lg transition-transform active:scale-95 disabled:opacity-50"
                            >
                                Continue
                            </button>

                            {/* Resend Link */}
                            <button
                                type="button"
                                onClick={() => post(route("verification.send"))}
                                className="flex items-center justify-center gap-2 w-full text-[#2d5a43] font-bold text-sm hover:underline"
                            >
                                <RefreshCcw className="w-4 h-4" /> Resend OTP
                            </button>
                        </form>

                        <p className="mt-8 text-xs text-gray-400 px-6">
                            We've sent a 4 digit verification code to your
                            email. Check your spam folder in case you didn't
                            receive the code.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
