'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PejabatCardProps {
    name: string;
    role: string;
    unit?: string;
    highlight?: boolean;
}

const PejabatCard = ({ name, role, unit, highlight = false }: PejabatCardProps) => (
    <div className={`px-3 py-2 rounded-lg border-2 text-center ${highlight
            ? 'bg-[#153e70] border-[#153e70] text-white'
            : 'bg-white border-slate-300 hover:border-[#153e70] hover:shadow-md transition-all'
        }`} style={{ width: '140px' }}>
        <h4 className={`font-bold text-xs leading-tight ${highlight ? 'text-white' : 'text-slate-800'}`}>
            {name}
        </h4>
        <p className={`text-[10px] mt-1 font-semibold uppercase ${highlight ? 'text-[#c9a227]' : 'text-[#c9a227]'}`}>
            {role}
        </p>
        {unit && (
            <p className={`text-[9px] mt-0.5 leading-tight ${highlight ? 'text-white/70' : 'text-slate-500'}`}>
                {unit}
            </p>
        )}
    </div>
);

// Data pejabat sesuai gambar
const sekjenData = {
    name: "Dr. Cris Kuntadi, S.E., M.M.",
    role: "Sekretaris Jenderal"
};

const direkturData = {
    name: "Yoki Yulizar, M.Sc.",
    role: "Direktur",
    unit: "Politeknik Ketenagakerjaan"
};

const kepalaBiroData = [
    { name: "Dian Kreshnadjati, S.E, M.M.", role: "Kepala Biro", unit: "Organisasi & SDM Aparatur" },
    { name: "Dr. Narsih, S.Pd., M.M.", role: "Plt Kepala Biro", unit: "Keuangan & BMN" },
    { name: "Muhammad Arif Hidayat, M.Eng, M.P.P.", role: "Kepala Biro", unit: "Kerjasama" },
    { name: "Dr. Narsih, S.Pd., M.M.", role: "Kepala Pusat", unit: "Pengembangan SDM Ketenagakerjaan" },
    { name: "Faried Abdurahman Nur Yuliono, S.STP., M.M.", role: "Kepala Biro", unit: "Humas" },
    { name: "Surya Lukita Warman, B. Eng., M.Sc.", role: "Plt Kepala", unit: "Pusat Pasar Kerja" },
    { name: "Reni Mursidayanti, S.H., M.H.", role: "Kepala Biro", unit: "Hukum" },
];

export default function StrukturPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header />

            <main className="pt-20">
                {/* Hero Section - mirip Profil Satker */}
                <section className="bg-gradient-to-br from-[#153e70] via-[#1e4a82] to-[#2a5d9e] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                    <div className="container-custom relative z-10">
                        {/* Breadcrumb */}
                        <div className="pt-8 pb-4">
                            <Link href="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors text-sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Kembali ke Beranda
                            </Link>
                        </div>

                        {/* Title */}
                        <div className="pb-12 pt-4 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <Users className="w-6 h-6 text-[#c9a227]" />
                                    <span className="text-xs font-bold text-[#c9a227] uppercase tracking-widest">Organisasi</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Struktur Organisasi</h1>
                                <p className="text-white/70 max-w-2xl mx-auto">
                                    Susunan pejabat struktural Sekretariat Jenderal Kementerian Ketenagakerjaan Republik Indonesia
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Org Chart Section */}
                <section className="py-12">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200 overflow-x-auto"
                        >
                            {/* Scrollable container for mobile */}
                            <div className="min-w-[900px]">
                                {/* Level 1: Sekretaris Jenderal - Centered */}
                                <div className="flex justify-center mb-0">
                                    <div className="flex flex-col items-center">
                                        <PejabatCard {...sekjenData} highlight={true} />

                                        {/* Vertical line down from Sekjen */}
                                        <div className="w-0.5 h-8 bg-slate-300"></div>
                                    </div>
                                </div>

                                {/* Main Horizontal line with branches */}
                                <div className="relative flex justify-center">
                                    {/* Main horizontal line spanning all kepalaˇbiro */}
                                    <div className="absolute top-0 left-[10%] right-[10%] h-0.5 bg-slate-300"></div>

                                    {/* Branch line to Direktur (right side) */}
                                    <div className="absolute top-0 right-[15%] w-0.5 h-10 bg-slate-300"></div>
                                </div>

                                {/* Level 2: Direktur - Right Side */}
                                <div className="flex justify-end pr-[12%] mt-10 mb-6">
                                    <PejabatCard {...direkturData} />
                                </div>

                                {/* Vertical lines down to each Kepala Biro */}
                                <div className="flex justify-between px-[10%] -mt-6">
                                    {kepalaBiroData.map((_, index) => (
                                        <div key={index} className="flex flex-col items-center" style={{ width: '140px' }}>
                                            <div className="w-0.5 h-8 bg-slate-300"></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Level 3: Kepala Biro - Row */}
                                <div className="flex justify-between px-[10%]">
                                    {kepalaBiroData.map((pejabat, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <PejabatCard {...pejabat} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
