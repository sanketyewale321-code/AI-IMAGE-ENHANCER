import { useState } from "react";

const CompareSlider = ({ before, after, height = 320 }) => {
    const [isHovering, setIsHovering] = useState(false);

    if (!before || !after) return null;

    return (
        <div 
            className="grid grid-cols-2 gap-4 select-none"
            style={{ height: `${height}px` }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Before Image - Left Side */}
            <div className="relative group overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                    <img
                        src={before}
                        alt="Before"
                        className="absolute inset-0 w-full h-full object-cover"
                        draggable={false}
                    />
                </div>
                
                {/* Before Label */}
                <div className="absolute top-4 left-4 px-4 py-2 bg-red-500/90 backdrop-blur-sm rounded-lg shadow-lg">
                    <span className="text-white font-black text-lg tracking-wide">Before</span>
                </div>
                
                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
                
                {/* Image info on hover */}
                {isHovering && (
                    <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/80 backdrop-blur-sm rounded-xl">
                        <div className="text-white text-sm">
                            <div className="font-black mb-2 text-lg">Original Image</div>
                            <div className="opacity-90 text-xs">Click to view full size</div>
                        </div>
                    </div>
                )}
            </div>

            {/* After Image - Right Side */}
            <div className="relative group overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-300 dark:from-blue-700 dark:to-purple-800">
                    <img
                        src={after}
                        alt="After"
                        className="absolute inset-0 w-full h-full object-cover"
                        draggable={false}
                    />
                </div>
                
                {/* After Label */}
                <div className="absolute top-4 right-4 px-4 py-2 bg-green-500/90 backdrop-blur-sm rounded-lg shadow-lg">
                    <span className="text-white font-black text-lg tracking-wide">After</span>
                </div>
                
                {/* Enhancement indicator */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full">
                    <span className="text-white text-sm font-bold tracking-wide">AI Enhanced</span>
                </div>
                
                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
                
                {/* Image info on hover */}
                {isHovering && (
                    <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/80 backdrop-blur-sm rounded-xl">
                        <div className="text-white text-sm">
                            <div className="font-black mb-2 text-lg">Enhanced Image</div>
                            <div className="opacity-90 text-xs">AI-powered improvement</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompareSlider;
