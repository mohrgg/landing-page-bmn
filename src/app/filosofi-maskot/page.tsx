'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Glasses, Laptop, Backpack, GraduationCap, Eye, ShieldCheck, Footprints } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

// Data Filosofi Maskot
const philosophyPoints = [
    {
        id: 'burung-hantu',
        title: 'Burung Hantu',
        icon: Eye,
        description: 'Melambangkan kebijaksanaan, ketelitian, dan kewaspadaan. Mencerminkan pengelolaan aset negara yang dilakukan dengan penuh kehati-hatian, berbasis data, serta pengambilan keputusan yang cermat dan bertanggung jawab.',
        color: 'bg-amber-500'
    },
    {
        id: 'kacamata',
        title: 'Kacamata',
        icon: Glasses,
        description: 'Menggambarkan ketajaman analisis dan transparansi. Pengelolaan BMN harus jelas, akurat, dan dapat diaudit, sehingga setiap aset negara tercatat, terpantau, dan dimanfaatkan secara optimal.',
        color: 'bg-blue-500'
    },
    {
        id: 'laptop',
        title: 'Laptop',
        icon: Laptop,
        description: 'Melambangkan digitalisasi dan modernisasi pengelolaan BMN. Ini menunjukkan komitmen negara dalam memanfaatkan teknologi informasi untuk meningkatkan efisiensi, akuntabilitas, dan integrasi data aset negara.',
        color: 'bg-indigo-500'
    },
    {
        id: 'tas-punggung',
        title: 'Tas Punggung',
        icon: Backpack,
        description: 'Merepresentasikan amanah dan tanggung jawab. BMN bukan sekadar aset, tetapi titipan negara yang harus dijaga, dipelihara, dan dimanfaatkan sebesar-besarnya untuk kepentingan rakyat.',
        color: 'bg-emerald-500'
    },
    {
        id: 'seragam',
        title: 'Seragam dan Sepatu Lapangan',
        icon: Footprints,
        description: 'Busana formal yang dipadukan dengan sepatu lapangan mencerminkan keseimbangan antara kebijakan dan implementasi. Pengelola BMN tidak hanya bekerja di balik meja, tetapi juga siap turun ke lapangan untuk memastikan kondisi dan keberadaan aset secara nyata.',
        color: 'bg-slate-600'
    },
    {
        id: 'topi',
        title: 'Topi Bertuliskan "BMN"',
        icon: GraduationCap,
        description: 'Topi menegaskan identitas dan dedikasi terhadap pengelolaan Barang Milik Negara. Ini adalah simbol kebanggaan dan komitmen untuk menjaga kekayaan negara secara profesional dan berintegritas.',
        color: 'bg-red-500'
    }
];

export default function FilosofiMaskotPage() {
    const [activePoint, setActivePoint] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
            <Header />

            <main className="pt-20">
                {/* Hero / Intro Section */}
                <section className="relative bg-[#153e70] py-20 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')]"></div>

                    <div className="container-custom relative z-10 text-center">
                        <Link href="/" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali ke Beranda
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-3xl mx-auto"
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-[#c9a227] font-bold text-sm mb-4 border border-white/20">
                                MASKOT BMN KEMNAKER
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Filosofi Sang Penjaga Aset
                            </h1>
                            <p className="text-white/80 text-lg leading-relaxed">
                                Memperkenalkan maskot yang merepresentasikan semangat penjagaan, profesionalisme, dan transformasi digital dalam pengelolaan Barang Milik Negara.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Interactive Mascot Section */}
                <section className="py-16 md:py-24 relative">
                    <div className="container-custom">
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                            {/* Mascot Image Display */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="relative flex-1 w-full max-w-[500px] flex justify-center"
                            >
                                <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] drop-shadow-2xl filter hover:drop-shadow-[0_20px_50px_rgba(21,62,112,0.3)] transition-all duration-500">
                                    <Image
                                        src="/images/Burung BMN.png"
                                        alt="Maskot Burung BMN"
                                        fill
                                        className="object-contain animate-float"
                                        priority
                                    />
                                </div>

                                {/* Background Glow */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[100px] -z-10 rounded-full"></div>
                            </motion.div>

                            {/* Philosophy Cards Grid */}
                            <div className="flex-1 w-full">
                                <div className="grid grid-cols-1 gap-4">
                                    {philosophyPoints.map((point, index) => (
                                        <motion.div
                                            key={point.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
                                            onMouseEnter={() => setActivePoint(point.id)}
                                            onMouseLeave={() => setActivePoint(null)}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`p-3 rounded-lg ${point.color} text-white shrink-0 group-hover:scale-110 transition-transform`}>
                                                    <point.icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-800 mb-2 group-hover:text-[#153e70] transition-colors">
                                                        {point.title}
                                                    </h3>
                                                    <p className="text-sm text-slate-600 leading-relaxed">
                                                        {point.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Makna Keseluruhan Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-20 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                            <div className="relative z-10 max-w-4xl mx-auto">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#c9a227] text-slate-900 mb-6">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Makna Keseluruhan</h2>
                                <p className="text-lg text-slate-300 leading-relaxed italic">
                                    "Logo ini menggambarkan sosok penjaga BMN yang cerdas, amanah, adaptif terhadap teknologi, dan berorientasi pada kepentingan negara. Ia mencerminkan transformasi pengelolaan aset negara yang modern namun tetap berlandaskan nilai-nilai integritas dan tanggung jawab publik."
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
