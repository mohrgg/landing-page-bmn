'use client';

import {
    BarChart3,
    FileSpreadsheet,
    Package,
    ClipboardCheck,
    ArrowLeft,
    ExternalLink,
    Grid
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
        name: 'Wasdal BMN',
        description: 'Pengawasan dan pengendalian Barang Milik Negara',
        url: 'http://wasdal.bmn.local:3004',
        icon: <ClipboardCheck className="w-8 h-8" />,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
    },
];

export default function AplikasiPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 animate-[fadeIn_500ms_ease-out]">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-slate-600 hover:text-[#153e70] transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span className="text-sm font-medium">Kembali</span>
                            </Link>
                            <div className="h-6 w-px bg-slate-200"></div>
                            <div className="flex items-center gap-3">
                                <div className="relative w-8 h-8">
                                    <Image
                                        src="/images/logo-kemnaker.png"
                                        alt="Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-sm font-bold text-[#153e70]">Portal Aplikasi BMN</h1>
                                    <p className="text-[10px] text-slate-500">Kementerian Ketenagakerjaan RI</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-12">
                <div className="text-center mb-10 animate-[scaleIn_500ms_ease-out]">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-[#153e70]">
                        <Grid className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Pilih Aplikasi</h2>
                    <p className="text-slate-500">Akses aplikasi pengelolaan Barang Milik Negara</p>
                </div>

                {/* App Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {applications.map((app, index) => (
                        <a
                            key={app.id}
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group p-6 rounded-2xl border-2 transition-all duration-300 ${app.bgColor} animate-[scaleIn_500ms_ease-out_both]`}
                            style={{ animationDelay: `${index * 100}ms` }}
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
                                        <ExternalLink className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {app.description}
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Info Footer */}
                <div className="mt-12 text-center">
                    <p className="text-xs text-slate-400">
                        Pastikan Anda sudah login melalui Portal BMN untuk mengakses aplikasi
                    </p>
                </div>
            </main>
        </div>
    );
}
