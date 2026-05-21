import React, { useState, useEffect } from "react";

const Loading = () => {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { name: "Analyzing image content", icon: "🔍" },
        { name: "Applying AI enhancements", icon: "🤖" },
        { name: "Optimizing quality", icon: "✨" },
        { name: "Finalizing results", icon: "🎯" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100;
                return prev + Math.random() * 15;
            });
        }, 500);

        const stepInterval = setInterval(() => {
            setCurrentStep(prev => (prev + 1) % steps.length);
        }, 2000);

        return () => {
            clearInterval(interval);
            clearInterval(stepInterval);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl relative overflow-hidden">
            {/* Background animated particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Main AI Brain Container */}
            <div className="relative z-10">
                {/* Outer glow ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
                
                {/* Central AI icon */}
                <div className="relative w-20 h-20 mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    
                    {/* Orbiting elements */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                        <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1 shadow-lg"></div>
                        <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-purple-400 rounded-full transform -translate-x-1/2 translate-y-1 shadow-lg"></div>
                        <div className="absolute left-0 top-1/2 w-3 h-3 bg-pink-400 rounded-full transform -translate-y-1/2 -translate-x-1 shadow-lg"></div>
                        <div className="absolute right-0 top-1/2 w-3 h-3 bg-indigo-400 rounded-full transform -translate-y-1/2 translate-x-1 shadow-lg"></div>
                    </div>
                    
                    {/* Pulsing rings */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/30 animate-ping"></div>
                    <div className="absolute inset-0 rounded-2xl border-2 border-purple-400/20 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                </div>
            </div>

            {/* Loading Text and Progress */}
            <div className="relative z-10 text-center space-y-4 mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    AI is working its magic
                </h3>
                <p className="text-gray-600 font-medium">Enhancing your image with advanced AI algorithms...</p>
                
                {/* Progress Bar */}
                <div className="w-64 mx-auto">
                    <div className="relative h-2 bg-gray-200/50 rounded-full overflow-hidden">
                        <div 
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-medium">
                        {Math.round(Math.min(progress, 100))}% Complete
                    </div>
                </div>
            </div>

            {/* Processing Steps */}
            <div className="relative z-10 w-full max-w-md">
                <div className="space-y-3">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-500 ${
                                index === currentStep 
                                    ? 'bg-white/80 shadow-lg border border-blue-200/50 scale-105' 
                                    : index < currentStep 
                                    ? 'bg-green-50/80 border border-green-200/50' 
                                    : 'bg-white/30 border border-gray-200/30'
                            }`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                                index === currentStep 
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white animate-pulse' 
                                    : index < currentStep 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-gray-200 text-gray-500'
                            }`}>
                                {index < currentStep ? '✓' : step.icon}
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm font-medium transition-colors duration-300 ${
                                    index === currentStep ? 'text-blue-700' : index < currentStep ? 'text-green-700' : 'text-gray-500'
                                }`}>
                                    {step.name}
                                </p>
                                {index === currentStep && (
                                    <div className="flex items-center space-x-1 mt-1">
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/30 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-xs text-gray-400 font-medium">
                Neural Network Processing
            </div>
        </div>
    );
};

export default Loading;
