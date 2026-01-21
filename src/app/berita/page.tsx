'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Newspaper, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import BackButton from '@/components/ui/BackButton';

interface NewsItem {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    image: string;
}

const newsData: NewsItem[] = [
    {
        id: 1,
        title: 'Kemnaker Raih Opini WTP ke-10 Berturut-turut dari BPK',
        excerpt: 'Kementerian Ketenagakerjaan kembali meraih opini Wajar Tanpa Pengecualian (WTP) dari Badan Pemeriksa Keuangan atas Laporan Keuangan Tahun 2023.',
        date: '12 Januari 2026',
        category: 'Pencapaian',
        image: 'https://picsum.photos/seed/wtp/800/400',
    },
    {
        id: 2,
        title: 'Sosialisasi Pengelolaan BMN Tahun 2026',
        excerpt: 'Biro Umum menyelenggarakan sosialisasi terkait kebijakan baru pengelolaan Barang Milik Negara untuk seluruh Satuan Kerja.',
        date: '10 Januari 2026',
        category: 'Pengumuman',
        image: 'https://picsum.photos/seed/sosialisasi/800/400',
    },
    {
        id: 3,
        title: 'Inventarisasi Aset Digital Dimulai',
        excerpt: 'Program digitalisasi inventarisasi aset BMN menggunakan aplikasi SIMAK BMN versi terbaru telah dimulai.',
        date: '8 Januari 2026',
        category: 'Berita',
        image: 'https://picsum.photos/seed/digital/800/400',
    },
    {
        id: 4,
        title: 'Workshop Sertifikasi Tanah BMN',
        excerpt: 'Pelaksanaan workshop percepatan sertifikasi tanah BMN bekerja sama dengan BPN di seluruh wilayah Indonesia.',
        date: '5 Januari 2026',
        category: 'Kegiatan',
        image: 'https://picsum.photos/seed/workshop/800/400',
    },
];

const categories = ['Semua', 'Berita', 'Pengumuman', 'Pencapaian', 'Kegiatan'];

export default function BeritaPage() {
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
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <Newspaper className="w-5 h-5 text-[#c9a227]" />
                                    <span className="text-xs font-bold text-[#c9a227] uppercase tracking-widest">Berita & Pengumuman</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Semua Berita</h1>
                                <p className="text-white/70 max-w-xl mx-auto">
                                    Informasi terkini seputar pengelolaan Barang Milik Negara di lingkungan Kementerian Ketenagakerjaan.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Filter & Search */}
                <section className="py-8 border-b border-slate-200 bg-white sticky top-16 z-40">
                    <div className="container-custom">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            {/* Categories */}
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${cat === 'Semua'
                                            ? 'bg-[#153e70] text-white'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Cari berita..."
                                    className="pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* News Grid */}
                <section className="py-12">
                    <div className="container-custom">
                        <RevealOnScroll>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {newsData.map((news, index) => (
                                    <motion.article
                                        key={news.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition-all group"
                                    >
                                        <Link href={`/berita/${news.id}`} className="block">
                                            <div className="h-48 relative overflow-hidden">
                                                <img
                                                    src={news.image}
                                                    alt={news.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                                <div className="absolute bottom-3 left-3">
                                                    <span className="px-3 py-1 bg-[#c9a227] text-white text-xs font-bold rounded-full">
                                                        {news.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <div className="flex items-center text-slate-400 text-xs mb-2">
                                                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                                    {news.date}
                                                </div>
                                                <h3 className="font-bold text-slate-800 group-hover:text-[#153e70] transition-colors line-clamp-2 mb-2">
                                                    {news.title}
                                                </h3>
                                                <p className="text-sm text-slate-500 line-clamp-2">{news.excerpt}</p>
                                                <span className="inline-flex items-center mt-3 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                                                    Baca Selengkapnya
                                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.article>
                                ))}
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
