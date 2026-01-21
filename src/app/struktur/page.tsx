'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/ui/BackButton';

// Dynamically import OrgChart with SSR disabled to prevent 'document is not defined' error
const OrgChart = dynamic(() => import('@/components/OrgChart'), { ssr: false });


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
                        <BackButton />

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
                                <OrgChart />
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
