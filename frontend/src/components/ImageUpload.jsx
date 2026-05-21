const ImageUpload = (props) => {
    const ShowImageHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            props.UploadImageHandler(file);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="group relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500"></div>
                
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                    {/* Premium header */}
                    <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative px-8 py-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">AI Image Enhancement</h2>
                                    <p className="text-blue-100 text-sm">Powered by advanced neural networks</p>
                                </div>
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
                    </div>
                    
                    <div className="p-8">
                        <label
                            htmlFor="fileInput"
                            className="group relative block w-full cursor-pointer"
                        >
                            <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                                onChange={ShowImageHandler}
                                accept="image/*"
                            />
                            
                            <div className="relative border-3 border-dashed border-gray-200/50 rounded-2xl p-8 text-center transition-all duration-500 group-hover:border-blue-300/70 group-hover:bg-gradient-to-br group-hover:from-blue-50/30 group-hover:to-purple-50/30">
                                {/* Background pattern */}
                                <div className="absolute inset-0 opacity-5">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                                            </pattern>
                                        </defs>
                                        <rect width="100%" height="100%" fill="url(#grid)" />
                                    </svg>
                                </div>
                                
                                {/* Upload Icon with enhanced animation */}
                                <div className="relative mx-auto w-20 h-20 mb-6">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                    {/* Pulse effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl animate-ping opacity-20"></div>
                                </div>
                                
                                <div className="relative space-y-3">
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                        Drop your image here
                                    </h3>
                                    <p className="text-gray-600 font-medium">
                                        or click to browse from your device
                                    </p>
                                    <div className="flex items-center justify-center space-x-3 text-sm text-gray-500">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">PNG</span>
                                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">JPG</span>
                                        <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full font-medium">WEBP</span>
                                        <span className="text-gray-400">• Max 10MB</span>
                                    </div>
                                </div>
                            </div>
                        </label>
                        
                        {/* Premium Feature Cards */}
                        <div className="mt-8 grid grid-cols-3 gap-4">
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-xl blur-xl group-hover:from-blue-500/20 transition-all duration-500"></div>
                                <div className="relative bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-blue-200/30 hover:border-blue-300/50 transition-all duration-300">
                                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-gray-800 text-sm mb-1">Lightning Fast</h4>
                                    <p className="text-xs text-gray-600">Process images in seconds</p>
                                </div>
                            </div>
                            
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent rounded-xl blur-xl group-hover:from-purple-500/20 transition-all duration-500"></div>
                                <div className="relative bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-purple-200/30 hover:border-purple-300/50 transition-all duration-300">
                                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-gray-800 text-sm mb-1">AI Powered</h4>
                                    <p className="text-xs text-gray-600">Advanced neural networks</p>
                                </div>
                            </div>
                            
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent rounded-xl blur-xl group-hover:from-green-500/20 transition-all duration-500"></div>
                                <div className="relative bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-green-200/30 hover:border-green-300/50 transition-all duration-300">
                                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-gray-800 text-sm mb-1">Premium Quality</h4>
                                    <p className="text-xs text-gray-600">Studio-grade results</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;
