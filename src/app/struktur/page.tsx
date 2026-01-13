'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, User, Search, Building2, Users, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

interface PejabatProps {
    name: string;
    role: string;
    unit?: string;
    image?: string;
    highlight?: boolean;
}

const PejabatCard = ({ name, role, unit, image, highlight = false }: PejabatProps) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className={`p-5 rounded-2xl shadow-sm border transition-all cursor-pointer group ${highlight
                ? 'bg-gradient-to-br from-[#153e70] to-[#2a5d9e] border-[#153e70] text-white'
                : 'bg-white border-slate-200 hover:shadow-lg hover:border-blue-200'
            }`}
    >
        <div className="flex flex-col items-center text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center overflow-hidden mb-4 ${highlight
                    ? 'bg-white/20 border-2 border-white/30'
                    : 'bg-slate-100 border-2 border-slate-50 group-hover:border-blue-100'
                } transition-colors`}>
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                    <User className={`w-10 h-10 ${highlight ? 'text-white/70' : 'text-slate-300'}`} />
                )}
            </div>
            <h4 className={`font-bold text-sm mb-1 ${highlight ? 'text-white' : 'text-slate-800 group-hover:text-[#153e70]'} transition-colors`}>
                {name}
            </h4>
            <p className={`text-xs ${highlight ? 'text-white/80' : 'text-[#c9a227]'} font-medium`}>{role}</p>
            {unit && (
                <p className={`text-xs mt-1 ${highlight ? 'text-white/60' : 'text-slate-500'}`}>{unit}</p>
            )}
        </div>
    </motion.div>
);

// Data pejabat dengan nama nyata
const sekjenData = {
    name: "Prof. Drs. Anwar Sanusi, Ph.D.",
    role: "Sekretaris Jenderal",
    unit: "Kementerian Ketenagakerjaan RI",
    image: "https://picsum.photos/seed/sekjen/200/200"
};

const eselonIIData = [
    { name: "Drs. Surya Lukita Warman, M.Sc.", role: "Kepala Biro Keuangan", image: "https://picsum.photos/seed/biro1/200/200" },
    { name: "Hery Budoyo, S.H., M.H.", role: "Kepala Biro Hukum", image: "https://picsum.photos/seed/biro2/200/200" },
    { name: "R. Iwan Kusuma W., S.E.", role: "Kepala Biro Perencanaan", image: "https://picsum.photos/seed/biro3/200/200" },
    { name: "Muhammad Arif Hidayat, S.E.", role: "Kepala Biro Umum", image: "https://picsum.photos/seed/biro4/200/200" },
];

const koordinatorData = [
    { name: "Dr. Bambang Satrio, M.M.", role: "Koordinator Kepegawaian", unit: "Biro Umum" },
    { name: "Ir. Sri Wahyuni, M.T.", role: "Koordinator Aset BMN", unit: "Biro Keuangan" },
    { name: "Dra. Ratna Dewi, M.Pd.", role: "Koordinator Pengembangan SDM", unit: "Biro Perencanaan" },
    { name: "Ahmad Fauzi, S.Kom., M.M.", role: "Koordinator IT & Digital", unit: "Biro Umum" },
    { name: "Hendra Wijaya, S.H., M.H.", role: "Koordinator Peraturan", unit: "Biro Hukum" },
    { name: "Siti Aminah, S.E., M.Ak.", role: "Koordinator Anggaran", unit: "Biro Keuangan" },
    { name: "Dr. Eko Prasetyo, M.Si.", role: "Koordinator Evaluasi", unit: "Biro Perencanaan" },
    { name: "Dewi Kusuma, S.Sos., M.AP.", role: "Koordinator Protokol", unit: "Biro Umum" },
];

export default function StrukturPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
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

                {/* Search & Filter */}
                <section className="-mt-6 relative z-20">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between"
                        >
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Cari nama atau jabatan..."
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#153e70]/20 focus:border-[#153e70] transition-all"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['Semua', 'Eselon I', 'Eselon II', 'Koordinator'].map((filter) => (
                                    <button
                                        key={filter}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'Semua'
                                                ? 'bg-[#153e70] text-white shadow-md'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Org Chart */}
                <section className="py-12">
                    <div className="container-custom">
                        {/* Level 1: Sekretaris Jenderal */}
                        <RevealOnScroll>
                            <div className="flex justify-center mb-8">
                                <div className="w-full max-w-xs">
                                    <PejabatCard
                                        {...sekjenData}
                                        highlight={true}
                                    />
                                </div>
                            </div>

                            {/* Connecting Line */}
                            <div className="flex justify-center mb-8">
                                <div className="w-px h-12 bg-gradient-to-b from-[#153e70] to-slate-300"></div>
                            </div>
                        </RevealOnScroll>

                        {/* Level 2: Eselon II - Kepala Biro */}
                        <RevealOnScroll>
                            <div className="mb-12">
                                <h3 className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                                    Kepala Biro
                                </h3>

                                {/* Horizontal Line */}
                                <div className="hidden lg:block max-w-4xl mx-auto mb-6">
                                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                                    {eselonIIData.map((pejabat, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <PejabatCard {...pejabat} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-12">
                            <div className="flex-1 h-px bg-slate-200"></div>
                            <div className="px-4 py-2 bg-white border border-slate-200 rounded-full">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Koordinator</span>
                            </div>
                            <div className="flex-1 h-px bg-slate-200"></div>
                        </div>

                        {/* Level 3: Koordinator */}
                        <RevealOnScroll>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {koordinatorData.map((pejabat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <PejabatCard {...pejabat} />
                                    </motion.div>
                                ))}
                            </div>
                        </RevealOnScroll>

                        {/* Info Box */}
                        <RevealOnScroll>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="mt-12 bg-gradient-to-r from-blue-50 to-slate-50 p-6 md:p-8 rounded-3xl border border-blue-100"
                            >
                                <div className="flex flex-col md:flex-row items-start gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-[#153e70] flex items-center justify-center flex-shrink-0">
                                        <Building2 className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-[#153e70] mb-2">Informasi Kontak</h3>
                                        <p className="text-slate-600 text-sm mb-4">
                                            Untuk informasi lebih lanjut mengenai struktur organisasi dan unit kerja, silakan hubungi:
                                        </p>
                                        <div className="flex flex-wrap gap-4 text-sm">
                                            <div className="flex items-center text-slate-600">
                                                <Phone className="w-4 h-4 mr-2 text-[#c9a227]" />
                                                (021) 525 5733
                                            </div>
                                            <div className="flex items-center text-slate-600">
                                                <Mail className="w-4 h-4 mr-2 text-[#c9a227]" />
                                                setjen@kemnaker.go.id
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </RevealOnScroll>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
