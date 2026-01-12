'use client';

import { motion, Variants } from 'framer-motion';

export default function HeroSection() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Stagger effect
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 20
            }
        },
    };

    return (
        <section id="hero" className="bg-white pt-24 pb-16 relative overflow-hidden">
            {/* Background Pattern Minimalis */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-50 to-transparent -z-10 opacity-80"></div>

            <div className="container-custom relative z-10">
                <motion.div
                    className="grid lg:grid-cols-2 gap-12 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    viewport={{ once: true }} // Ensure it runs once
                >

                    {/* LEFT COLUMN: Title & Identity */}
                    <div className="text-left space-y-6">
                        <motion.span
                            variants={itemVariants}
                            className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase border border-blue-100"
                        >
                            Portal BMN Kemnaker
                        </motion.span>

                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#153e70] tracking-tight leading-tight"
                        >
                            PORTAL RESMI <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#153e70] to-blue-600">
                                BMN KEMNAKER
                            </span>
                        </motion.h1>

                        <motion.div
                            variants={itemVariants}
                            className="w-20 h-1.5 bg-[#c9a227] rounded-full"
                        ></motion.div>

                        <motion.p
                            variants={itemVariants}
                            className="text-slate-500 text-lg font-light leading-relaxed max-w-lg"
                        >
                            Kementerian Ketenagakerjaan RI berkomitmen mewujudkan tata kelola barang milik negara yang
                            <span className="font-semibold text-slate-700"> transparan, akuntabel,</span> dan memberikan manfaat sebesar-besarnya.
                        </motion.p>
                    </div>

                    {/* RIGHT COLUMN: Detailed Overview Text */}
                    <motion.div
                        variants={itemVariants}
                        className="relative pl-6 md:pl-8 text-sm text-slate-600 leading-relaxed text-justify space-y-4"
                    >
                        {/* Gradient Fade Line */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>

                        <p>
                            Penggunaan Barang Milik Negara (BMN) untuk menunjang tugas dan fungsi Kementerian Ketenagakerjaan berupa Tanah, gedung dan bangunan yang digunakan sebagai Kantor Pusat Kementerian, Pusat Pengembangan SDM Kemnaker dan Satuan Kerja berupa Balai Besar Pelatihan Vokasi dan Produktivitas (BBPVP/BPVP), Balai Keselamatan dan Kesehatan Kerja (Balai K3), dan Balai Perluasan Kesempatan Kerja (BPKK).
                        </p>
                        <p>
                            Kemudian peralatan dan mesin digunakan sebagai alat pelatihan, pengujian. Terdapat aset dalam bentuk Konstruksi dalam pengerjaan (KDP) terdapat pada beberapa satker yang diperuntukan untuk pengembangan maupun pembangunan gedung dan bangunan untuk mendukung operasional tugas dan fungsi Satuan Kerja, yang tersebar di seluruh wilayah Indonesia.
                        </p>
                        <p>
                            Sehingga dengan jumlah aset yang di kuasai Kementerian Ketenagakerjaan dapat digunakan untuk meningkatkan pelayanan kepada masyarakat di bidang Ketenagakerjaan sehingga akan mendukung terwujudnya perluasan kesempatan kerja dan peningkatan pelayanan penempatan tenaga kerja serta penguatan informasi pasar kerja dan bursa kerja.
                        </p>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
