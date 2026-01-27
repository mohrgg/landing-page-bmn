'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    BarChart3,
    FileSpreadsheet,
    Package,
    ClipboardCheck,
    ExternalLink,
    Grid,
    Lock
} from 'lucide-react';
import LoginModal from '@/components/LoginModal';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/ui/BackButton';
import { motion } from 'framer-motion';

interface AppItem {
    id: string;
    name: string;
    description: string;
    url: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
}

const applications: AppItem[] = [
    {
        id: 'tabulasi',
        name: 'Tabulasi Data BMN',
        description: 'Upload dan kelola data BMN per Satker dengan integrasi Google Drive',
        url: 'http://tabulasi.bmn.local:3001',
        icon: <FileSpreadsheet className="w-8 h-8" />,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    },
    {
        id: 'monitoring',
        name: 'Monitoring PSP BMN',
        description: 'Pantau status PSP dan progress per wilayah secara real-time',
        url: 'http://monitoring.bmn.local:3002',
        icon: <BarChart3 className="w-8 h-8" />,
        color: 'text-green-600',
        bgColor: 'bg-green-50 hover:bg-green-100 border-green-200',
    },
    {
        id: 'inventarisasi',
        name: 'Inventarisasi BMN',
        description: 'Sistem manajemen inventarisasi dan opname aset BMN',
        url: 'http://inventarisasi.bmn.local:3003',
        icon: <Package className="w-8 h-8" />,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
    },
    {
        id: 'wasdal',
        name: 'Monitoring BMN',
        description: 'Pengawasan dan pengendalian Barang Milik Negara',
        url: 'http://wasdal.bmn.local:3004',
        icon: <ClipboardCheck className="w-8 h-8" />,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
    },
];

export default function AplikasiPage() {
    const router = useRouter();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { user, refreshAuth } = useAuth();
    const isLoggedIn = !!user;

    const getAppUrl = (originalUrl: string) => {
        if (typeof window === 'undefined') return originalUrl;
        const hostname = window.location.hostname;

        // Jika akses dari localhost, ubah domain .bmn.local menjadi localhost
        if (hostname.includes('localhost') || hostname === '127.0.0.1') {
            try {
                const urlObj = new URL(originalUrl);
                // Ganti hostname: tabulasi.bmn.local -> localhost
                // Port tetap sama (3001, 3002, dll)
                return `${urlObj.protocol}//localhost:${urlObj.port}`;
            } catch (e) {
                return originalUrl;
            }
        }
        return originalUrl;
    };

    const handleAppClick = (e: React.MouseEvent, url: string) => {
        e.preventDefault();

        if (!isLoggedIn) {
            setIsLoginModalOpen(true);
        } else {
            const targetUrl = getAppUrl(url);
            window.open(targetUrl, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-[#153e70] via-[#1e4a82] to-[#2a5d9e] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.svg')]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                    <div className="container-custom relative z-10">
                        <BackButton />

                        <div className="pb-12 pt-4 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <Grid className="w-5 h-5 text-[#c9a227]" />
                                    <span className="text-xs font-bold text-[#c9a227] uppercase tracking-widest">Aplikasi BMN</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Pilih Aplikasi</h1>
                                <p className="text-white/70 max-w-xl mx-auto">
                                    Akses aplikasi pengelolaan Barang Milik Negara
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Applications Grid */}
                <section className="py-12">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {applications.map((app, index) => (
                                <motion.div
                                    key={app.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={(e) => handleAppClick(e, app.url)}
                                    className={`group p-6 rounded-2xl border-2 transition-all duration-300 ${app.bgColor} cursor-pointer shadow-sm hover:shadow-lg`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl bg-white shadow-sm ${app.color}`}>
                                            {app.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-bold text-slate-800 group-hover:text-slate-900">
                                                    {app.name}
                                                </h3>
                                                {isLoggedIn ? (
                                                    <ExternalLink className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                ) : (
                                                    <Lock className="w-4 h-4 text-slate-400 opacity-70" />
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                {app.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Admin Management Card - Bottom Center & Only visible to INTERNAL role */}
                        {user && user.role === 'INTERNAL' && (
                            <div className="mt-8 flex justify-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={() => window.open('/admin', '_blank')}
                                    className="group p-6 rounded-2xl border-2 border-slate-800 bg-slate-900 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-lg"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-slate-800 text-yellow-400 shadow-sm flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-bold text-lg text-white group-hover:text-yellow-400 transition-colors">
                                                    Manajemen Akun
                                                </h3>
                                                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                                            </div>
                                            <p className="text-sm text-slate-400">
                                                Akses Dashboard Administrator
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        )}

                        {/* Info Footer */}
                        <div className="mt-12 text-center">
                            <p className="text-xs text-slate-400">
                                Pastikan Anda sudah login melalui Portal BMN untuk mengakses aplikasi
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* Login Modal Integration */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLoginSuccess={() => {
                    refreshAuth();
                    setIsLoginModalOpen(false);
                    router.refresh();
                }}
            />
        </div>
    );
}
