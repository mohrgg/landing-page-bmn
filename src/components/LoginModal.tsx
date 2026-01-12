'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login delay
        setTimeout(() => {
            setIsLoading(false);
            onClose(); // Close on "success"
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] transition-all"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 flex items-center justify-center z-[70] p-4 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto relative"
                        >
                            {/* Header Gradient */}
                            <div className="h-2 bg-gradient-to-r from-[#153e70] to-blue-500"></div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-8 pt-10">
                                {/* Logo & Title */}
                                <div className="text-center mb-8">
                                    <div className="relative w-16 h-16 mx-auto mb-4">
                                        <Image
                                            src="/images/logo-kemnaker.png"
                                            alt="Logo Kemnaker"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#153e70]">Selamat Datang</h2>
                                    <p className="text-sm text-slate-500 mt-1">Silakan masuk untuk mengakses Portal BMN</p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-[#153e70] uppercase tracking-wider ml-1">
                                            NIP / Nama Pengguna
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                            </div>
                                            <input
                                                type="text"
                                                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all placeholder:text-slate-300"
                                                placeholder="Masukkan NIP atau Username"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center ml-1">
                                            <label className="text-xs font-bold text-[#153e70] uppercase tracking-wider">
                                                Kata Sandi
                                            </label>
                                            <a href="#" className="text-xs text-blue-600 hover:text-blue-800 hover:underline">
                                                Lupa Kata Sandi?
                                            </a>
                                        </div>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all placeholder:text-slate-300"
                                                placeholder="••••••••"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center gap-2 bg-[#153e70] hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Masuk Portal <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* Footer Helper */}
                                <div className="mt-8 text-center">
                                    <p className="text-xs text-slate-400">
                                        Butuh bantuan akses? <a href="#" className="text-blue-600 font-bold hover:underline">Hubungi Admin</a>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
