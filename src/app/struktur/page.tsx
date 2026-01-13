'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Users, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tree, TreeNode } from 'react-organizational-chart';

// Premium Card Component
const OrgCard = ({ name, title, role, image, highlight = false }: { name: string; title: string; role?: string; image?: string; highlight?: boolean }) => (
    <div className={`inline-flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group bg-white ${highlight
            ? 'border-[#153e70] ring-4 ring-blue-50/50'
            : 'border-slate-200 hover:border-blue-300'
        }`} style={{ minWidth: '180px' }}>

        {/* Avatar */}
        <div className={`w-14 h-14 rounded-full mb-3 flex items-center justify-center overflow-hidden border-2 ${highlight ? 'border-[#153e70] bg-blue-50' : 'border-slate-100 bg-slate-50'
            }`}>
            {image ? (
                <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
                <UserCircle2 className={`w-10 h-10 ${highlight ? 'text-[#153e70]' : 'text-slate-300'}`} />
            )}
        </div>

        {/* Info */}
        <div className="text-center">
            <h4 className={`font-bold text-sm mb-1 ${highlight ? 'text-[#153e70]' : 'text-slate-800'}`}>
                {name}
            </h4>
            <div className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full inline-block mb-1 ${highlight ? 'bg-[#153e70] text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                {title}
            </div>
            {role && (
                <p className="text-[10px] text-slate-500 font-medium">{role}</p>
            )}
        </div>
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
                                    Struktur organisasi yang dirancang untuk efisiensi dan transparansi pengelolaan BMN
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
                            <div className="min-w-[1000px] py-8">
                                <Tree
                                    lineWidth="2px"
                                    lineColor="#cbd5e1"
                                    lineBorderRadius="12px"
                                    label={
                                        <OrgCard
                                            name="Pemimpin Tertinggi"
                                            title="Sekretaris Jenderal"
                                            role="Pimpinan Unit Eselon I"
                                            highlight={true}
                                            image="https://picsum.photos/seed/sekjen/200"
                                        />
                                    }
                                >
                                    {/* Level 2 Nodes */}
                                    <TreeNode label={
                                        <OrgCard
                                            name="Kepala Biro A"
                                            title="Kepala Biro"
                                            role="Biro Keuangan & BMN"
                                            image="https://picsum.photos/seed/biro1/200"
                                        />
                                    }>
                                        <TreeNode label={
                                            <OrgCard
                                                name="Koordinator A1"
                                                title="Koordinator"
                                                role="Bagian Anggaran"
                                            />
                                        } />
                                        <TreeNode label={
                                            <OrgCard
                                                name="Koordinator A2"
                                                title="Koordinator"
                                                role="Bagian Perbendaharaan"
                                            />
                                        } />
                                    </TreeNode>

                                    <TreeNode label={
                                        <OrgCard
                                            name="Kepala Biro B"
                                            title="Kepala Biro"
                                            role="Biro Umum"
                                            image="https://picsum.photos/seed/biro2/200"
                                        />
                                    }>
                                        <TreeNode label={
                                            <OrgCard
                                                name="Koordinator B1"
                                                title="Koordinator"
                                                role="Bagian Rumah Tangga"
                                            />
                                        } />
                                    </TreeNode>

                                    <TreeNode label={
                                        <OrgCard
                                            name="Kepala Pusat C"
                                            title="Kepala Pusat"
                                            role="Pusat Data & Info"
                                            image="https://picsum.photos/seed/kapus1/200"
                                        />
                                    }>
                                        <TreeNode label={
                                            <OrgCard
                                                name="Koordinator C1"
                                                title="Koordinator"
                                                role="Infrastruktur TIK"
                                            />
                                        } />
                                        <TreeNode label={
                                            <OrgCard
                                                name="Koordinator C2"
                                                title="Koordinator"
                                                role="Aplikasi & Sistem"
                                            />
                                        } />
                                    </TreeNode>
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
