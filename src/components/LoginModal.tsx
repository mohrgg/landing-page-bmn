'use client';

import { useState } from 'react';
import { X, User, Lock, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess?: (user: { username: string; role: string; name: string }) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                // Call success callback immediately
                if (onLoginSuccess) {
                    onLoginSuccess(data.user);
                }

                // Close modal after short delay for visual feedback
                setTimeout(() => {
                    setSuccess(false);
                    setUsername('');
                    setPassword('');
                    onClose();
                }, 500);
            } else {
                setError(data.message || 'Login gagal');
            }
        } catch {
            setError('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setError('');
        setSuccess(false);
        setUsername('');
        setPassword('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop - animasi ringan CSS */}
            <div
                className="fixed inset-0 bg-black/50 z-[60] animate-[fadeIn_150ms_ease-out]"
                onClick={handleClose}
                style={{ animation: 'fadeIn 150ms ease-out' }}
            />

            {/* Modal Container - animasi ringan CSS */}
            <div className="fixed inset-0 flex items-center justify-center z-[70] p-4 pointer-events-none">
                <div
                    className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto relative"
                    style={{ animation: 'scaleIn 200ms ease-out' }}
                >
                    {/* Header Gradient */}
                    <div className="h-2 bg-gradient-to-r from-[#153e70] to-blue-500"></div>

                    {/* Close Button */}
                    <button
                        onClick={handleClose}
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
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none placeholder:text-slate-300"
                                        placeholder="Masukkan NIP atau Username"
                                        disabled={isLoading || success}
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
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none placeholder:text-slate-300"
                                        placeholder="••••••••"
                                        disabled={isLoading || success}
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

                            {/* Error Message */}
                            {error && (
                                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            {/* Success Message */}
                            {success && (
                                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm">
                                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                    Login berhasil!
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading || success || !username || !password}
                                className="w-full flex items-center justify-center gap-2 bg-[#153e70] hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : success ? (
                                    <>
                                        <CheckCircle className="w-4 h-4" /> Berhasil!
                                    </>
                                ) : (
                                    <>
                                        Masuk Portal <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Demo Credentials */}
                        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center mb-2">🔐 Demo Credentials</p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="text-center p-2 bg-white rounded-lg">
                                    <p className="text-slate-400 text-[10px]">SATKER</p>
                                    <p className="text-slate-600 font-mono font-bold">satker01 / 123</p>
                                </div>
                                <div className="text-center p-2 bg-white rounded-lg">
                                    <p className="text-slate-400 text-[10px]">ADMIN</p>
                                    <p className="text-slate-600 font-mono font-bold">admin / 123</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Helper */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-slate-400">
                                Butuh bantuan akses? <a href="#" className="text-blue-600 font-bold hover:underline">Hubungi Admin</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
