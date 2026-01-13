'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { RevealOnScroll } from './ui/RevealOnScroll';

interface NewsItem {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    image: string;
    featured?: boolean;
}

const newsData: NewsItem[] = [
    {
        id: 1,
        title: 'Kemnaker Raih Opini WTP ke-10 Berturut-turut dari BPK',
        excerpt: 'Kementerian Ketenagakerjaan kembali meraih opini Wajar Tanpa Pengecualian (WTP) dari Badan Pemeriksa Keuangan atas Laporan Keuangan Tahun 2023.',
        date: '12 Jan 2026',
        category: 'Pencapaian',
        image: 'https://picsum.photos/seed/wtp/800/400',
        featured: true,
    },
    {
        id: 2,
        title: 'Sosialisasi Pengelolaan BMN Tahun 2026',
        excerpt: 'Biro Umum menyelenggarakan sosialisasi terkait kebijakan baru pengelolaan Barang Milik Negara untuk seluruh Satuan Kerja.',
        date: '10 Jan 2026',
        category: 'Pengumuman',
        image: 'https://picsum.photos/seed/sosialisasi/200/200',
    },
    {
        id: 3,
        title: 'Inventarisasi Aset Digital Dimulai',
        excerpt: 'Program digitalisasi inventarisasi aset BMN menggunakan aplikasi SIMAK BMN versi terbaru telah dimulai.',
        date: '8 Jan 2026',
        category: 'Berita',
        image: 'https://picsum.photos/seed/digital/200/200',
    },
    {
        id: 4,
        title: 'Workshop Sertifikasi Tanah BMN',
        excerpt: 'Pelaksanaan workshop percepatan sertifikasi tanah BMN bekerja sama dengan BPN di seluruh wilayah Indonesia.',
        date: '5 Jan 2026',
        category: 'Kegiatan',
        image: 'https://picsum.photos/seed/workshop/200/200',
    },
];

export default function NewsSection() {
    const featuredNews = newsData.find(n => n.featured);
    const regularNews = newsData.filter(n => !n.featured);

    return (
        <section id="berita" className="py-20 bg-slate-50">
            <div className="container-custom">
                <RevealOnScroll>
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Newspaper className="w-5 h-5 text-[#c9a227]" />
                                <span className="text-xs font-bold text-[#c9a227] uppercase tracking-widest">Berita & Pengumuman</span>
                            </div>
                            <h2 className="text-3xl font-bold text-[#153e70]">Informasi Terkini</h2>
                        </div>
                        <Link
                            href="#"
                            className="mt-4 md:mt-0 text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                        >
                            Lihat Semua Berita
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Featured Article */}
                        {featuredNews && (
                            <motion.article
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all group"
                            >
                                <div className="h-56 relative overflow-hidden">
                                    <img
                                        src={featuredNews.image}
                                        alt={featuredNews.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="px-3 py-1 bg-[#c9a227] text-white text-xs font-bold rounded-full">
                                            {featuredNews.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center text-slate-400 text-xs mb-3">
                                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                        {featuredNews.date}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#153e70] transition-colors line-clamp-2">
                                        {featuredNews.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                                        {featuredNews.excerpt}
                                    </p>
                                    <Link href={`/berita/${featuredNews.id}`} className="inline-flex items-center mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700">
                                        Baca Selengkapnya
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </motion.article>
                        )}

                        {/* Regular Articles */}
                        <div className="space-y-4">
                            {regularNews.map((news, index) => (
                                <motion.article
                                    key={news.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ x: 5 }}
                                    className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all group flex gap-4"
                                >
                                    <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full">
                                                {news.category}
                                            </span>
                                            <span className="text-[10px] text-slate-400">{news.date}</span>
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-[#153e70] transition-colors line-clamp-2 mb-1">
                                            {news.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 line-clamp-2">{news.excerpt}</p>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
