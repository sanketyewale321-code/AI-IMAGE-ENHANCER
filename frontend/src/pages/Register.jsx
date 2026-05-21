import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { otpService } from "../services/otpService.js";

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [tempToken, setTempToken] = useState("");
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [canResend, setCanResend] = useState(false);

    // Timer for resend OTP
    useEffect(() => {
        if (timeLeft > 0 && showOTP) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && showOTP) {
            setCanResend(true);
        }
    }, [timeLeft, showOTP]);

    // Format time display
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const validateForm = () => {
        if (!showOTP) {
            if (!name.trim() || name.length < 2) {
                setError("Please enter your full name (at least 2 characters)");
                return false;
            }
            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                setError("Please enter a valid email address");
                return false;
            }
            if (password.length < 6) {
                setError("Password must be at least 6 characters");
                return false;
            }
            if (password !== confirmPassword) {
                setError("Passwords do not match");
                return false;
            }
        } else {
            if (otp.length !== 6) {
                setError("Please enter 6-digit OTP");
                return false;
            }
            if (!/^\d{6}$/.test(otp)) {
                setError("OTP must contain only numbers");
                return false;
            }
        }
        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setError("");
        setSuccess("");
        setLoading(true);
        
        try {
            if (!showOTP) {
                // First step: Register and send real OTP
                try {
                    const result = await register(name, email, password);
                    
                    // Generate and send real OTP
                    const otpResult = await otpService.sendOTP(email, 'registration');
                    
                    if (otpResult.success) {
                        setShowOTP(true);
                        setTempToken("temp_token_" + Date.now());
                        setTimeLeft(600); // 10 minutes
                        setCanResend(false);
                        setSuccess(`OTP sent to ${email}. Please check your email inbox.`);
                    } else {
                        setError(otpResult.message);
                    }
                } catch (registrationError) {
                    // Handle specific registration errors
                    if (registrationError.response?.status === 409) {
                        setError("An account with this email already exists. Please use a different email or try logging in.");
                    } else if (registrationError.response?.status === 400) {
                        setError(registrationError.response?.data?.message || "Invalid registration data. Please check your information.");
                    } else if (registrationError.response?.status === 422) {
                        setError(registrationError.response?.data?.message || "Validation failed. Please check all fields.");
                    } else {
                        setError("Registration failed. Please try again later.");
                    }
                    console.error("Registration error:", registrationError);
                }
            } else {
                // Second step: Verify real OTP
                const verificationResult = await otpService.verifyOTP(email, otp);
                
                if (verificationResult.success) {
                    // Complete registration
                    localStorage.setItem("token", "verified_token_" + Date.now());
                    localStorage.setItem("user", JSON.stringify({ name, email }));
                    setSuccess("Email verified successfully!");
                    
                    // Navigate to dashboard after a short delay
                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 1500);
                } else {
                    setError(verificationResult.message);
                }
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            setError("");
            setSuccess("");
            setLoading(true);
            
            const otpResult = await otpService.sendOTP(email, 'registration');
            
            if (otpResult.success) {
                setTimeLeft(600);
                setCanResend(false);
                setSuccess(`OTP resent to ${email}. Please check your email inbox.`);
            } else {
                setError(otpResult.message);
            }
        } catch (err) {
            setError("Failed to resend OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleOTPChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        setOtp(value);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
            <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2 5a4 4 0 11-8 0 4 4 0 018 0zM13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-2">
                            {showOTP ? "Verify Email" : "Create Account"}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            {showOTP 
                                ? `Enter the 6-digit code sent to ${email}`
                                : "Join AI Image Enhancer and transform your photos"
                            }
                        </p>
                    </div>

                    {/* Success Message */}
                    {success && (
                        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm text-green-700 dark:text-green-300 font-medium">{success}</span>
                            </div>
                        </div>
                    )}

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

                    {/* Registration Form */}
                    <form onSubmit={onSubmit} className="space-y-5">
                        {!showOTP ? (
                            // Registration Fields
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                                            placeholder="Create a password"
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Must be at least 6 characters
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-2a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                                            placeholder="Confirm your password"
                                            required
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            // OTP Verification Field
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Verification Code
                                </label>
                                <div className="flex justify-center space-x-2 mb-4">
                                    {[...Array(6)].map((_, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            maxLength={1}
                                            value={otp[index] || ''}
                                            onChange={(e) => {
                                                const newOtp = otp.split('');
                                                newOtp[index] = e.target.value;
                                                setOtp(newOtp.join(''));
                                                
                                                // Auto focus next input
                                                if (e.target.value && index < 5) {
                                                    const nextInput = document.getElementById(`otp-${index + 1}`);
                                                    if (nextInput) nextInput.focus();
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Backspace" && !otp[index] && index > 0) {
                                                    const prevInput = document.getElementById(`otp-${index - 1}`);
                                                    if (prevInput) prevInput.focus();
                                                }
                                            }}
                                            onPaste={(e) => {
                                                e.preventDefault();
                                                const pastedData = e.clipboardData.getData("text").slice(0, 6);
                                                setOtp(pastedData);
                                            }}
                                            id={`otp-${index}`}
                                            className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                            required
                                        />
                                    ))}
                                </div>
                                
                                {/* Timer and Resend */}
                                <div className="text-center space-y-2">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {canResend ? (
                                            <button
                                                type="button"
                                                onClick={handleResendOTP}
                                                disabled={loading}
                                                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                            >
                                                Resend verification code
                                            </button>
                                        ) : (
                                            <span>
                                                Resend code in <span className="font-semibold text-blue-600 dark:text-blue-400">{formatTime(timeLeft)}</span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>{showOTP ? "Verifying..." : "Creating account..."}</span>
                                </div>
                            ) : (
                                <span>{showOTP ? "Verify Email" : "Create Account"}</span>
                            )}
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-8 space-y-4">
                        <div className="text-center">
                            <Link
                                to="/login"
                                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                            >
                                Already have an account? Sign in
                            </Link>
                        </div>
                        
                        {showOTP && (
                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowOTP(false);
                                        setOtp("");
                                        setError("");
                                        setSuccess("");
                                    }}
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                                >
                                    ← Back to registration
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Terms and Privacy - Only show on registration step */}
                    {!showOTP && (
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                By creating an account, you agree to our{' '}
                                <Link to="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    Terms of Service
                                </Link>
                                {' '}and{' '}
                                <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;
