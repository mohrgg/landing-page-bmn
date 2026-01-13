'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tree, TreeNode } from 'react-organizational-chart';

interface NodeProps {
    name: string;
    title: string;
    unit?: string;
    highlight?: boolean;
}

const OrgCard = ({ name, title, unit, highlight = false }: NodeProps) => (
    <div className={`inline-block px-4 py-3 rounded-xl border-2 text-center transition-all hover:shadow-lg hover:-translate-y-1 ${highlight
            ? 'bg-gradient-to-br from-[#153e70] to-[#2a5d9e] border-[#153e70] text-white'
            : 'bg-white border-slate-300 hover:border-[#153e70]'
        }`} style={{ minWidth: '130px', maxWidth: '150px' }}>
        <div className={`font-bold text-[11px] leading-tight ${highlight ? 'text-white' : 'text-slate-800'}`}>
            {name}
        </div>
        <div className={`text-[9px] font-semibold uppercase mt-1 ${highlight ? 'text-[#c9a227]' : 'text-[#c9a227]'}`}>
            {title}
        </div>
        {unit && (
            <div className={`text-[8px] mt-1 leading-tight ${highlight ? 'text-white/70' : 'text-slate-500'}`}>
                {unit}
            </div>
        )}
    </div>
);

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
                        <div className="pt-8 pb-4">
                            <Link href="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors text-sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Kembali ke Beranda
                            </Link>
                        </div>

                        <div className="pb-12 pt-4 text-center">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
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
                            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 overflow-x-auto"
                        >
                            <div className="min-w-[1100px] py-4">
                                <Tree
                                    lineWidth="2px"
                                    lineColor="#cbd5e1"
                                    lineBorderRadius="8px"
                                    label={
                                        <OrgCard
                                            name="Dr. Cris Kuntadi, S.E., M.M."
                                            title="Sekretaris Jenderal"
                                            highlight={true}
                                        />
                                    }
                                >
                                    <TreeNode label={
                                        <OrgCard
                                            name="Yoki Yulizar, M.Sc."
                                            title="Direktur"
                                            unit="Politeknik Ketenagakerjaan"
                                        />
                                    } />
                                    <TreeNode label={
                                        <OrgCard
                                            name="Dian Kreshnadjati, S.E, M.M."
                                            title="Kepala Biro"
                                            unit="Organisasi & SDM Aparatur"
                                        />
                                    } />
                                    <TreeNode label={
                                        <OrgCard
                                            name="Dr. Narsih, S.Pd., M.M."
                                            title="Plt Kepala Biro"
                                            unit="Keuangan & BMN"
                                        />
                                    } />
                                    <TreeNode label={
                                        <OrgCard
                                            name="Muhammad Arif Hidayat"
                                            title="Kepala Biro"
                                            unit="Kerjasama"
                                        />
                                    } />
                                    <TreeNode label={
                                        <OrgCard
                                            name="Dr. Narsih, S.Pd., M.M."
                                            title="Kepala Pusat"
                                            unit="Pengembangan SDM Naker"
                                        />
                                    } />
                                    <TreeNode label={
                                        <OrgCard
                                            name="Faried A. Nur Yuliono"
                                            title="Kepala Biro"
                                            unit="Humas"
                                        />
                                    } />
                                    <TreeNode label={
                                        <OrgCard
                                            name="Surya Lukita Warman"
                                            title="Plt Kepala"
                                            unit="Pusat Pasar Kerja"
                                        />
                                    } />
                                    <TreeNode label={
                                        <OrgCard
                                            name="Reni Mursidayanti, S.H., M.H."
                                            title="Kepala Biro"
                                            unit="Hukum"
                                        />
                                    } />
                                </Tree>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
