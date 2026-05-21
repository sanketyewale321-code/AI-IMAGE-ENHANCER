import { useState, useEffect } from "react";

const OTPVerification = ({ email, onVerify, onResend, loading, error }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(60);
    const [canResend, setCanResend] = useState(false);

    // Timer for resend OTP
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    // Handle input change
    const handleChange = (index, value) => {
        if (value.length > 1) return;
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    // Handle key press
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    // Handle paste
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        const newOtp = pastedData.split("").slice(0, 6);
        setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);
    };

    // Submit OTP
    const handleSubmit = (e) => {
        e.preventDefault();
        const otpString = otp.join("");
        if (otpString.length === 6) {
            onVerify(otpString);
        }
    };

    // Resend OTP
    const handleResend = () => {
        onResend();
        setTimeLeft(60);
        setCanResend(false);
        setOtp(["", "", "", "", "", "", ""]);
    };

    const otpString = otp.join("");

    return (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-2">
                    Verify Your Email
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    We sent a 6-digit code to<br />
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{email}</span>
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-red-700 dark:text-red-300 font-medium">{error}</span>
                    </div>
                </div>
            )}

            {/* OTP Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 text-center">
                        Enter verification code
                    </label>
                    <div className="flex justify-center space-x-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                required
                            />
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={otpString.length !== 6 || loading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
                >
                    {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Verifying...</span>
                        </div>
                    ) : (
                        <span>Verify Email</span>
                    )}
                </button>
            </form>

            {/* Resend Section */}
            <div className="text-center mt-6">
                {canResend ? (
                    <button
                        onClick={handleResend}
                        disabled={loading}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        Didn't receive the code? Resend
                    </button>
                ) : (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Resend code in <span className="font-semibold text-blue-600 dark:text-blue-400">{timeLeft}s</span>
                    </div>
                )}
            </div>

            {/* Back to Login */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => window.history.back()}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                >
                    ← Back to login
                </button>
            </div>
        </div>
    );
};

export default OTPVerification;
