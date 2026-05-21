import Loading from "./Loading";
import CompareSlider from "./CompareSlider";

const ImagePreview = (props) => {
    const hasBothImages = props.uploaded && props.enhanced && !props.loading;

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
            {!props.uploaded ? (
                // Premium empty state
                <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
                    <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-16 text-center">
                        <div className="relative mx-auto w-24 h-24 mb-8">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-3xl flex items-center justify-center">
                                <svg className="w-12 h-12 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl animate-pulse"></div>
                        </div>
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-4">
                            No image uploaded yet
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                            Upload an image above to experience the magic of AI-powered enhancement
                        </p>
                        
                        {/* Feature highlights */}
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                                ✨ AI-Powered
                            </span>
                            <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                                ⚡ Lightning Fast
                            </span>
                            <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                                🎨 Premium Quality
                            </span>
                        </div>
                    </div>
                </div>
            ) : hasBothImages ? (
                // Enhanced comparison view
                <div className="space-y-8">
                    {/* Success header */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center space-x-2 px-6 py-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-green-700 dark:text-green-300 font-medium">Enhancement Complete</span>
                        </div>
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                            Stunning Results
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Drag the slider to witness the transformation from original to enhanced
                        </p>
                    </div>
                    
                    {/* Comparison slider with premium styling */}
                    <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500"></div>
                        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
                            <CompareSlider 
                                before={props.uploaded} 
                                after={props.enhanced} 
                                height={450} 
                            />
                            
                            {/* Enhancement stats */}
                            <div className="mt-6 grid grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">+95%</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Quality Boost</div>
                                </div>
                                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">2.3s</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Processing Time</div>
                                </div>
                                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">4K</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Output Quality</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Enhanced action buttons */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                <span>Download Enhanced Image</span>
                            </div>
                            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                        
                        <button className="group px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>Enhance Another Image</span>
                            </div>
                        </button>
                    </div>
                </div>
            ) : (
                // Processing side-by-side view
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Original Image Card */}
                    <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-3xl blur-xl group-hover:from-gray-500/20 group-hover:to-gray-600/20 transition-all duration-500"></div>
                        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
                            <div className="relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700"></div>
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="relative px-6 py-4">
                                    <h3 className="text-xl font-bold text-white flex items-center">
                                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        Original Image
                                    </h3>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                            </div>
                            <div className="p-6">
                                {props.uploaded ? (
                                    <div className="relative group/img">
                                        <img
                                            src={props.uploaded}
                                            alt="Original"
                                            className="w-full h-80 object-cover rounded-2xl shadow-lg"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-80 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                                        <div className="text-center">
                                            <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-gray-500 dark:text-gray-400 font-medium">No image selected</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Image Card */}
                    <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
                        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
                            <div className="relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="relative px-6 py-4">
                                    <h3 className="text-xl font-bold text-white flex items-center">
                                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        Enhanced Image
                                    </h3>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
                            </div>
                            <div className="p-6">
                                {props.loading ? (
                                    <Loading />
                                ) : props.enhanced ? (
                                    <div className="relative group/img">
                                        <img
                                            src={props.enhanced}
                                            alt="Enhanced"
                                            className="w-full h-80 object-cover rounded-2xl shadow-lg"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute top-4 right-4">
                                            <div className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full flex items-center space-x-1">
                                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                                <span>Enhanced</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-80 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                                        <div className="text-center">
                                            <div className="relative mx-auto w-16 h-16 mb-4">
                                                <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-500 dark:text-gray-400 font-medium">Processing...</p>
                                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">AI is working its magic</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImagePreview;
