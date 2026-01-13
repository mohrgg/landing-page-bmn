'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, User, Clock, Share2, Bookmark, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface NewsItem {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    image: string;
    author: string;
    readTime: string;
}

const newsData: NewsItem[] = [
    {
        id: 1,
        title: 'Kemnaker Raih Opini WTP ke-10 Berturut-turut dari BPK',
        excerpt: 'Kementerian Ketenagakerjaan kembali meraih opini Wajar Tanpa Pengecualian (WTP) dari Badan Pemeriksa Keuangan atas Laporan Keuangan Tahun 2023.',
        content: `
            <p>Kementerian Ketenagakerjaan Republik Indonesia kembali menorehkan prestasi gemilang dengan meraih opini Wajar Tanpa Pengecualian (WTP) dari Badan Pemeriksa Keuangan (BPK) atas Laporan Keuangan Tahun 2023. Pencapaian ini merupakan yang ke-10 kalinya secara berturut-turut sejak tahun 2014.</p>
            
            <h3>Komitmen Pengelolaan Keuangan yang Transparan</h3>
            <p>Sekretaris Jenderal Kementerian Ketenagakerjaan menyampaikan bahwa pencapaian ini merupakan bukti komitmen seluruh jajaran Kemnaker dalam mengelola keuangan negara secara transparan, akuntabel, dan sesuai dengan standar akuntansi pemerintahan.</p>
            
            <p>"Opini WTP ini bukan hanya soal angka dan laporan, tetapi cerminan dari integritas dan profesionalisme seluruh pegawai Kemnaker dalam menjalankan tugas-tugasnya," ujar Sekjen Kemnaker.</p>
            
            <h3>Pengelolaan BMN yang Optimal</h3>
            <p>Salah satu faktor kunci keberhasilan ini adalah pengelolaan Barang Milik Negara (BMN) yang optimal. Melalui sistem inventarisasi yang terintegrasi dan pengawasan yang ketat, Kemnaker berhasil menjaga akurasi data aset negara.</p>
            
            <p>Beberapa upaya yang dilakukan antara lain:</p>
            <ul>
                <li>Implementasi sistem SIMAK BMN secara menyeluruh</li>
                <li>Percepatan sertifikasi tanah BMN</li>
                <li>Penghapusan aset yang sudah tidak produktif</li>
                <li>Peningkatan kualitas SDM pengelola BMN</li>
            </ul>
            
            <h3>Langkah ke Depan</h3>
            <p>Ke depan, Kemnaker berkomitmen untuk terus mempertahankan dan meningkatkan kualitas pengelolaan keuangan dan aset negara. Berbagai program peningkatan kapasitas akan terus dilakukan untuk memastikan standar terbaik dalam tata kelola keuangan pemerintah.</p>
        `,
        date: '12 Januari 2026',
        category: 'Pencapaian',
        image: 'https://picsum.photos/seed/wtp/1200/600',
        author: 'Humas Kemnaker',
        readTime: '5 menit',
    },
    {
        id: 2,
        title: 'Sosialisasi Pengelolaan BMN Tahun 2026',
        excerpt: 'Biro Umum menyelenggarakan sosialisasi terkait kebijakan baru pengelolaan Barang Milik Negara untuk seluruh Satuan Kerja.',
        content: `
            <p>Biro Umum Kementerian Ketenagakerjaan menyelenggarakan kegiatan Sosialisasi Pengelolaan Barang Milik Negara (BMN) Tahun 2026 yang diikuti oleh seluruh perwakilan Satuan Kerja di lingkungan Kemnaker.</p>
            
            <h3>Kebijakan Baru Pengelolaan BMN</h3>
            <p>Dalam sosialisasi ini, disampaikan beberapa kebijakan baru terkait pengelolaan BMN yang akan berlaku efektif mulai tahun 2026, meliputi:</p>
            <ul>
                <li>Mekanisme baru pengajuan penghapusan BMN</li>
                <li>Prosedur transfer antar Satker</li>
                <li>Standar pelaporan inventarisasi tahunan</li>
                <li>Penggunaan aplikasi SIMAK BMN versi terbaru</li>
            </ul>
            
            <p>Kepala Biro Umum menekankan pentingnya pemahaman yang baik terhadap regulasi terbaru untuk memastikan pengelolaan BMN yang efektif dan efisien.</p>
        `,
        date: '10 Januari 2026',
        category: 'Pengumuman',
        image: 'https://picsum.photos/seed/sosialisasi/1200/600',
        author: 'Biro Umum',
        readTime: '3 menit',
    },
    {
        id: 3,
        title: 'Inventarisasi Aset Digital Dimulai',
        excerpt: 'Program digitalisasi inventarisasi aset BMN menggunakan aplikasi SIMAK BMN versi terbaru telah dimulai.',
        content: `
            <p>Kementerian Ketenagakerjaan resmi memulai program Inventarisasi Aset Digital yang memanfaatkan teknologi terkini untuk mendata seluruh Barang Milik Negara secara akurat dan real-time.</p>
            
            <h3>Fitur Baru SIMAK BMN</h3>
            <p>Aplikasi SIMAK BMN versi terbaru dilengkapi dengan berbagai fitur canggih:</p>
            <ul>
                <li>Pemindaian QR Code untuk identifikasi aset</li>
                <li>Foto dokumentasi terintegrasi</li>
                <li>GPS tracking untuk aset bergerak</li>
                <li>Dashboard monitoring real-time</li>
            </ul>
            
            <p>Program ini diharapkan dapat meningkatkan akurasi data BMN hingga 99% dan mempercepat proses inventarisasi tahunan.</p>
        `,
        date: '8 Januari 2026',
        category: 'Berita',
        image: 'https://picsum.photos/seed/digital/1200/600',
        author: 'Tim IT Kemnaker',
        readTime: '4 menit',
    },
    {
        id: 4,
        title: 'Workshop Sertifikasi Tanah BMN',
        excerpt: 'Pelaksanaan workshop percepatan sertifikasi tanah BMN bekerja sama dengan BPN di seluruh wilayah Indonesia.',
        content: `
            <p>Kementerian Ketenagakerjaan bekerja sama dengan Badan Pertanahan Nasional (BPN) menyelenggarakan Workshop Percepatan Sertifikasi Tanah BMN yang diikuti oleh pengelola aset dari seluruh Indonesia.</p>
            
            <h3>Target Sertifikasi 2026</h3>
            <p>Workshop ini bertujuan untuk mempercepat penyelesaian sertifikasi tanah BMN dengan target:</p>
            <ul>
                <li>100% tanah BMN tersertifikasi pada akhir 2026</li>
                <li>Penyelesaian sengketa tanah tercatat</li>
                <li>Pemutakhiran data bidang tanah</li>
            </ul>
            
            <p>Narasumber dari BPN memberikan pemaparan terkait prosedur dan persyaratan sertifikasi tanah pemerintah serta kendala-kendala yang sering dihadapi.</p>
        `,
        date: '5 Januari 2026',
        category: 'Kegiatan',
        image: 'https://picsum.photos/seed/workshop/1200/600',
        author: 'Bagian Perlengkapan',
        readTime: '3 menit',
    },
];

export default function NewsDetailPage() {
    const params = useParams();
    const id = Number(params.id);
    const news = newsData.find(n => n.id === id);
    const otherNews = newsData.filter(n => n.id !== id).slice(0, 3);

    if (!news) {
        return (
            <main className="min-h-screen bg-white">
                <Header />
                <div className="pt-32 pb-20 text-center">
                    <h1 className="text-2xl font-bold text-slate-800">Berita tidak ditemukan</h1>
                    <Link href="/#berita" className="text-blue-600 hover:underline mt-4 inline-block">
                        Kembali ke Beranda
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Image */}
            <div className="relative h-[50vh] min-h-[400px] bg-slate-900">
                <img
                    src={news.image}
                    alt={news.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Link
                                href="/#berita"
                                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Kembali ke Beranda
                            </Link>
                            <span className="block px-3 py-1 bg-[#c9a227] text-white text-xs font-bold rounded-full w-fit mb-4">
                                {news.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-tight">
                                {news.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="py-12">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <motion.div
                            className="lg:col-span-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-slate-200 mb-8">
                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                    <Calendar className="w-4 h-4" />
                                    {news.date}
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                    <User className="w-4 h-4" />
                                    {news.author}
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                    <Clock className="w-4 h-4" />
                                    {news.readTime} baca
                                </div>
                            </div>

                            {/* Article Content */}
                            <article
                                className="prose prose-lg max-w-none prose-headings:text-[#153e70] prose-headings:font-bold prose-p:text-slate-600 prose-li:text-slate-600 prose-a:text-blue-600"
                                dangerouslySetInnerHTML={{ __html: news.content }}
                            />

                            {/* Share & Actions */}
                            <div className="flex items-center gap-4 mt-10 pt-6 border-t border-slate-200">
                                <span className="text-sm text-slate-500">Bagikan:</span>
                                <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                                    <Share2 className="w-4 h-4 text-slate-600" />
                                </button>
                                <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                                    <Bookmark className="w-4 h-4 text-slate-600" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.aside
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="sticky top-24">
                                <h3 className="text-lg font-bold text-[#153e70] mb-6">Berita Lainnya</h3>
                                <div className="space-y-4">
                                    {otherNews.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/berita/${item.id}`}
                                            className="block p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group"
                                        >
                                            <div className="flex gap-3">
                                                <img
                                                    src={item.image.replace('1200/600', '100/100')}
                                                    alt={item.title}
                                                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                                />
                                                <div>
                                                    <span className="text-[10px] text-[#c9a227] font-bold uppercase">{item.category}</span>
                                                    <h4 className="text-sm font-semibold text-slate-800 group-hover:text-[#153e70] line-clamp-2 transition-colors">
                                                        {item.title}
                                                    </h4>
                                                    <span className="text-[10px] text-slate-400 mt-1 block">{item.date}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                <Link
                                    href="/#berita"
                                    className="flex items-center justify-center gap-2 mt-6 text-sm font-semibold text-blue-600 hover:text-blue-700"
                                >
                                    Lihat Semua Berita
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.aside>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
