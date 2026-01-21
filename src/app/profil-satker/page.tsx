'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Building2, Users, FileBarChart, Trophy, ExternalLink, Camera } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import BackButton from '@/components/ui/BackButton';

const statsData = [
    { label: 'Total Aset BMN', value: 'Rp 1.2 T', icon: FileBarChart, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'Jumlah Pegawai', value: '1,240', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: 'Luas Tanah', value: '45.2 Ha', icon: MapPin, color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100' },
    { label: 'Nilai IPA', value: '98.5', icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
];

const galleryData = [
    { id: 1, title: 'Gedung Utama', image: 'https://picsum.photos/seed/gedung1/400/400' },
    { id: 2, title: 'Ruang Rapat', image: 'https://picsum.photos/seed/ruang1/400/400' },
    { id: 3, title: 'Area Parkir', image: 'https://picsum.photos/seed/parkir1/400/400' },
    { id: 4, title: 'Aula Serbaguna', image: 'https://picsum.photos/seed/aula1/400/400' },
    { id: 5, title: 'Gudang BMN', image: 'https://picsum.photos/seed/gudang1/400/400' },
    { id: 6, title: 'Taman Kantor', image: 'https://picsum.photos/seed/taman1/400/400' },
];

export default function ProfilSatkerPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header />

            <main className="pt-20">
                {/* Hero Header with Gradient */}
                <section className="bg-gradient-to-br from-[#153e70] via-[#1e4a82] to-[#2a5d9e] relative overflow-hidden">
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                    <div className="container-custom relative z-10">
                        {/* Breadcrumb */}
                        <BackButton />

                        {/* Profile Card */}
                        <div className="pb-12 pt-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col md:flex-row gap-6 items-start"
                            >
                                {/* Icon */}
                                <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white/10 backdrop-blur-sm p-4 flex items-center justify-center border border-white/20 shadow-lg">
                                    <Building2 className="w-12 h-12 md:w-14 md:h-14 text-white" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 space-y-3">
                                    <div className="inline-block px-3 py-1 rounded-full bg-[#c9a227]/20 text-[#c9a227] text-xs font-bold tracking-wide uppercase border border-[#c9a227]/30">
                                        Eselon I
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-white">Sekretariat Jenderal</h1>
                                    <p className="text-white/70 text-lg">Kementerian Ketenagakerjaan Republik Indonesia</p>

                                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80 pt-2">
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
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Stats Grid - Overlapping Cards */}
                <section className="-mt-6 relative z-20">
                    <div className="container-custom">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {statsData.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`bg-white p-5 md:p-6 rounded-2xl shadow-lg border ${stat.border} hover:shadow-xl transition-all group`}
                                >
                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                                        <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">{stat.value}</h3>
                                    <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-12">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Left Content */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* About Section */}
                                <RevealOnScroll>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200"
                                    >
                                        <h2 className="text-xl font-bold text-[#153e70] mb-6 flex items-center">
                                            <span className="w-1 h-6 bg-[#c9a227] mr-3 rounded-full"></span>
                                            Tentang Satuan Kerja
                                        </h2>
                                        <div className="space-y-4 text-slate-600 leading-relaxed">
                                            <p>
                                                Sekretariat Jenderal Kementerian Ketenagakerjaan mempunyai tugas menyelenggarakan koordinasi pelaksanaan tugas, pembinaan, dan pemberian dukungan administrasi kepada seluruh unsur organisasi di lingkungan Kementerian Ketenagakerjaan.
                                            </p>
                                            <p>
                                                Dalam melaksanakan tugas sebagaimana dimaksud, Sekretariat Jenderal menyelenggarakan fungsi konsultasi dan koordinasi pelaksanaan kebijakan di bidang ketenagakerjaan, serta pengelolaan barang milik negara yang tertib dan akuntabel.
                                            </p>
                                        </div>
                                    </motion.div>
                                </RevealOnScroll>

                                {/* Gallery Section */}
                                <RevealOnScroll>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200"
                                    >
                                        <h2 className="text-xl font-bold text-[#153e70] mb-6 flex items-center">
                                            <span className="w-1 h-6 bg-[#c9a227] mr-3 rounded-full"></span>
                                            Galeri Fasilitas BMN
                                        </h2>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {galleryData.map((item, index) => (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className="aspect-square rounded-xl overflow-hidden relative group cursor-pointer"
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                                        <span className="text-white font-medium text-sm">{item.title}</span>
                                                    </div>
                                                    <div className="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Camera className="w-4 h-4 text-slate-600" />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </RevealOnScroll>
                            </div>

                            {/* Right Sidebar */}
                            <div className="space-y-6">
                                {/* Map Section */}
                                <RevealOnScroll>
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200"
                                    >
                                        <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                                            <MapPin className="w-5 h-5 mr-2 text-[#c9a227]" />
                                            Lokasi Kantor
                                        </h3>
                                        <div className="aspect-video rounded-xl overflow-hidden mb-4">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1234567890!2d106.82194!3d-6.23456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTQnMDQuNCJTIDEwNsKwNDknMTkuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                className=""
                                            ></iframe>
                                        </div>
                                        <a
                                            href="https://maps.google.com/?q=Kementerian+Ketenagakerjaan+Jakarta"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3 rounded-xl bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Buka di Google Maps
                                        </a>
                                    </motion.div>
                                </RevealOnScroll>

                                {/* Quick Contact */}
                                <RevealOnScroll>
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="bg-gradient-to-br from-[#153e70] to-[#2a5d9e] p-6 rounded-3xl shadow-lg text-white"
                                    >
                                        <h3 className="font-bold mb-4">Hubungi Kami</h3>
                                        <div className="space-y-3 text-sm text-white/80">
                                            <div className="flex items-start gap-3">
                                                <Phone className="w-4 h-4 text-[#c9a227] mt-0.5" />
                                                <div>
                                                    <p className="text-white font-medium">(021) 525 5733</p>
                                                    <p className="text-xs">Senin - Jumat, 08:00 - 16:00</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Mail className="w-4 h-4 text-[#c9a227] mt-0.5" />
                                                <div>
                                                    <p className="text-white font-medium">setjen@kemnaker.go.id</p>
                                                    <p className="text-xs">Email resmi Sekretariat Jenderal</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </RevealOnScroll>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
