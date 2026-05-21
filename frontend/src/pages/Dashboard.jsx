import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const API_BASE = "http://localhost:5000/api";

const Dashboard = () => {
    const { user, token } = useAuth();
    const [stats, setStats] = useState({ total: 0, lastUploadDate: null });

    useEffect(() => {
        (async () => {
            if (!token) return;
            const { data } = await axios.get(`${API_BASE}/images`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const total = data.length;
            const lastUploadDate = data?.[0]?.createdAt || null;
            setStats({ total, lastUploadDate });
        })();
    }, [token]);

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                            Welcome back, {user?.name || "User"}!
                        </h1>
                        <p className="text-gray-600">Here's your AI image enhancement journey at a glance</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* User Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div className="text-2xl font-bold text-gray-800">
                            {user?.name?.split(' ')[0] || "User"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-sm text-gray-500">Account Name</div>
                        <div className="text-xs text-gray-400">Premium Member</div>
                    </div>
                </div>

                {/* Total Images Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="text-2xl font-bold text-gray-800">
                            {stats.total}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-sm text-gray-500">Images Enhanced</div>
                        <div className="text-xs text-green-600 font-medium">
                            {stats.total > 0 ? '+' + Math.round(stats.total * 10) + '% this month' : 'Start enhancing!'}
                        </div>
                    </div>
                </div>

                {/* Last Upload Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="text-sm font-bold text-gray-800 text-right">
                            {stats.lastUploadDate ? 
                                new Date(stats.lastUploadDate).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric' 
                                }) : 
                                'Never'
                            }
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-sm text-gray-500">Last Activity</div>
                        <div className="text-xs text-gray-400">
                            {stats.lastUploadDate ? 
                                new Date(stats.lastUploadDate).toLocaleTimeString('en-US', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                }) : 
                                'No activity yet'
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        to="/"
                        className="group flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-medium text-gray-800">Enhance New Image</div>
                                <div className="text-sm text-gray-500">Upload and enhance another image</div>
                            </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>

                    <Link
                        to="/history"
                        className="group flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-medium text-gray-800">View History</div>
                                <div className="text-sm text-gray-500">Browse your enhancement history</div>
                            </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Achievement Section */}
            {stats.total >= 5 && (
                <div className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold mb-1">🎉 Achievement Unlocked!</h3>
                            <p className="text-yellow-100">You've enhanced {stats.total} images with AI!</p>
                        </div>
                        <div className="text-4xl">🏆</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
