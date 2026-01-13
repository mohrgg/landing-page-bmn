'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, User, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PejabatProps {
    name: string;
    role: string;
    image?: string;
}

const PejabatCard = ({ name, role, image }: PejabatProps) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group"
    >
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-slate-50 group-hover:border-blue-100 transition-colors">
            {image ? (
                <Image src={image} alt={name} width={64} height={64} className="object-cover" />
            ) : (
                <User className="w-8 h-8 text-slate-300" />
            )}
        </div>
        <div>
            <h4 className="font-bold text-slate-800 text-sm group-hover:text-[#153e70] transition-colors">{name}</h4>
            <p className="text-xs text-slate-500">{role}</p>
        </div>
    </motion.div>
);

export default function StrukturPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header />

            <main className="pt-24 pb-16">
                <div className="container-custom">
                    {/* Breadcrumb & Back */}
                    <div className="mb-8">
                        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-[#153e70] transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali ke Beranda
                        </Link>
                    </div>

                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h1 className="text-3xl font-bold text-[#153e70] mb-4">Struktur Organisasi</h1>
                        <p className="text-slate-500">
                            Susunan pejabat struktural Sekretariat Jenderal Kementerian Ketenagakerjaan Republik Indonesia.
                        </p>
                    </div>

                    {/* Filter Bar */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari nama atau jabatan..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#153e70]/20 focus:border-[#153e70]"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100">
                                <Filter className="w-4 h-4 mr-2" />
                                Filter Unit
                            </button>
                        </div>
                    </div>

                    {/* Org Chart Tree Layout (Simplified) */}
                    <div className="relative">
                        {/* Connecting Lines Layer */}
                        <div className="absolute inset-0 pointer-events-none hidden lg:block">
                            {/* Line from Head to Eselon II */}
                            <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-px h-[60px] bg-slate-300"></div>
                            <div className="absolute top-[140px] left-[16.66%] right-[16.66%] h-px bg-slate-300"></div>

                            {/* Vertical lines to Eselon II */}
                            {[16.66, 38.88, 61.11, 83.33].map((pos) => (
                                <div key={pos} className="absolute top-[140px] w-px h-[40px] bg-slate-300" style={{ left: `${pos}%` }}></div>
                            ))}
                        </div>

                        {/* Level 1: Kepala Satker (Kapus/Sekjen) */}
                        <div className="flex justify-center mb-16">
                            <div className="w-full max-w-sm">
                                <PejabatCard
                                    name="Prof. Drs. Anwar Sanusi, Ph.D."
                                    role="Sekretaris Jenderal Kemnaker"
                                />
                            </div>
                        </div>

                        {/* Level 2: Eselon II */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                            <PejabatCard name="Drs. Surya Lukita Warman, M.Sc." role="Kepala Biro Keuangan" />
                            <PejabatCard name="Hery Budoyo, S.H., M.H." role="Kepala Biro Umum" />
                            <PejabatCard name="R. Iwan Kusuma W., S.E." role="Kepala Biro Perencanaan" />
                            <PejabatCard name="Muhammad Arif Hidayat" role="Kepala Biro Kerjasama" />
                        </div>

                        {/* More People Grid */}
                        <div className="mt-16 pt-16 border-t border-slate-200">
                            <h3 className="font-bold text-[#153e70] mb-6 text-center">Pejabat Fungsional & Koordinator</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                    <PejabatCard key={i} name={`Nama Pejabat ${i}`} role={`Koordinator Bidang ${i}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
