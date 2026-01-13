'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Phone, Mail, Building2, Users, FileBarChart, Trophy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProfilSatkerPage() {
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

                    {/* Header Profile */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8"
                    >
                        <div className="h-48 bg-gradient-to-r from-[#153e70] to-[#2a5d9e] relative">
                            {/* Pattern Overlay */}
                            <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')]"></div>
                            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <div className="px-8 pb-8 -mt-16 flex flex-col md:flex-row gap-6 items-end md:items-start relative z-10">
                            <div className="w-32 h-32 rounded-2xl bg-white p-2 shadow-lg border border-slate-100 flex items-center justify-center">
                                <Building2 className="w-16 h-16 text-[#153e70]" />
                            </div>
                            <div className="flex-1 pt-4 md:pt-16 space-y-2">
                                <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-wide uppercase border border-blue-100">
                                    Eselon I
                                </div>
                                <h1 className="text-3xl font-bold text-slate-800">Sekretariat Jenderal</h1>
                                <p className="text-slate-500 text-lg">Kementerian Ketenagakerjaan Republik Indonesia</p>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-600 pt-2">
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-2 text-[#c9a227]" />
                                        Jl. Gatot Subroto Kav. 51, Jakarta Selatan
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="w-4 h-4 mr-2 text-[#c9a227]" />
                                        (021) 525 5733
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="w-4 h-4 mr-2 text-[#c9a227]" />
                                        setjen@kemnaker.go.id
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Total Aset BMN', value: 'Rp 1.2 T', icon: FileBarChart, color: 'text-blue-600', bg: 'bg-blue-50' },
                            { label: 'Jumlah Pegawai', value: '1,240', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
                            { label: 'Luas Tanah', value: '45.2 Ha', icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-50' },
                            { label: 'Nilai IPA', value: '98.5', icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-50' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                            >
                                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</h3>
                                <p className="text-slate-500 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Main Content: Gallery & Info */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Content: Description & Gallery */}
                        <div className="lg:col-span-2 space-y-8">
                            <motion.section
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200"
                            >
                                <h2 className="text-xl font-bold text-[#153e70] mb-6 flex items-center">
                                    <span className="w-1 h-6 bg-[#c9a227] mr-3 rounded-full"></span>
                                    Tentang Satuan Kerja
                                </h2>
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    Sekretariat Jenderal Kementerian Ketenagakerjaan mempunyai tugas menyelenggarakan koordinasi pelaksanaan tugas, pembinaan, dan pemberian dukungan administrasi kepada seluruh unsur organisasi di lingkungan Kementerian Ketenagakerjaan.
                                </p>
                                <p className="text-slate-600 leading-relaxed">
                                    Dalam melaksanakan tugas sebagaimana dimaksud, Sekretariat Jenderal menyelenggarakan fungsi konsultasi dan koordinasi pelaksanaan kebijakan di bidang ketenagakerjaan, serta pengelolaan barang milik negara yang tertib dan akuntabel.
                                </p>
                            </motion.section>

                            {/* Gallery Mockup */}
                            <motion.section
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200"
                            >
                                <h2 className="text-xl font-bold text-[#153e70] mb-6 flex items-center">
                                    <span className="w-1 h-6 bg-[#c9a227] mr-3 rounded-full"></span>
                                    Galeri Fasilitas BMN
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {[1, 2, 3, 4, 5, 6].map((item) => (
                                        <div key={item} className="aspect-square bg-slate-100 rounded-xl overflow-hidden relative group">
                                            <div className="absolute inset-0 bg-slate-200 animate-pulse"></div>
                                            <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">
                                                Fasilitas {item}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        </div>

                        {/* Right Content: Sidebar Map */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200"
                            >
                                <h3 className="font-bold text-slate-800 mb-4">Lokasi Kantor</h3>
                                <div className="aspect-video bg-slate-100 rounded-xl mb-4 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">
                                        <MapPin className="w-8 h-8 opacity-50" />
                                    </div>
                                </div>
                                <button className="w-full py-3 rounded-xl bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition-colors">
                                    Buka di Google Maps
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
