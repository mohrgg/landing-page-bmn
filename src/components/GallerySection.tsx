'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import Image from 'next/image';
import { RevealOnScroll } from './ui/RevealOnScroll';

interface GalleryItem {
    id: number;
    title: string;
    category: string;
    image: string;
}

const galleryData: GalleryItem[] = [
    { id: 1, title: 'Gedung Utama Kemnaker', category: 'Gedung', image: 'https://picsum.photos/seed/gedung1/400/400' },
    { id: 2, title: 'Ruang Rapat Sekjen', category: 'Fasilitas', image: 'https://picsum.photos/seed/rapat/400/400' },
    { id: 3, title: 'Kegiatan Inventarisasi', category: 'Kegiatan', image: 'https://picsum.photos/seed/inventaris/400/400' },
    { id: 4, title: 'Aset Kendaraan Dinas', category: 'Kendaraan', image: 'https://picsum.photos/seed/kendaraan/400/400' },
    { id: 5, title: 'Laboratorium BLK', category: 'Fasilitas', image: 'https://picsum.photos/seed/lab/400/400' },
    { id: 6, title: 'Upacara Peringatan Hari Naker', category: 'Kegiatan', image: 'https://picsum.photos/seed/upacara/400/400' },
    { id: 7, title: 'Penyerahan Sertifikat Tanah', category: 'Kegiatan', image: 'https://picsum.photos/seed/sertifikat/400/400' },
    { id: 8, title: 'Gedung Balai K3', category: 'Gedung', image: 'https://picsum.photos/seed/balai/400/400' },
];

export default function GallerySection() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [filter, setFilter] = useState<string>('Semua');

    const categories = ['Semua', ...new Set(galleryData.map(g => g.category))];
    const filteredGallery = filter === 'Semua' ? galleryData : galleryData.filter(g => g.category === filter);

    const handlePrev = () => {
        if (selectedImage !== null) {
            const currentIndex = filteredGallery.findIndex(g => g.id === selectedImage);
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredGallery.length - 1;
            setSelectedImage(filteredGallery[prevIndex].id);
        }
    };

    const handleNext = () => {
        if (selectedImage !== null) {
            const currentIndex = filteredGallery.findIndex(g => g.id === selectedImage);
            const nextIndex = currentIndex < filteredGallery.length - 1 ? currentIndex + 1 : 0;
            setSelectedImage(filteredGallery[nextIndex].id);
        }
    };

    return (
        <section id="galeri" className="py-20 bg-slate-50">
            <div className="container-custom">
                <RevealOnScroll>
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Camera className="w-5 h-5 text-[#c9a227]" />
                            <span className="text-xs font-bold text-[#c9a227] uppercase tracking-widest">Galeri Foto</span>
                        </div>
                        <h2 className="text-3xl font-bold text-[#153e70] mb-4">Dokumentasi Aset & Kegiatan</h2>
                        <p className="text-slate-500 max-w-xl mx-auto">
                            Kumpulan foto dokumentasi aset BMN dan kegiatan pengelolaan di lingkungan Kementerian Ketenagakerjaan.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${filter === cat
                                    ? 'bg-[#153e70] text-white shadow-md'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Gallery Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredGallery.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => setSelectedImage(item.id)}
                                    className="aspect-square bg-slate-100 rounded-2xl overflow-hidden relative group cursor-pointer"
                                >
                                    {/* Image */}
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                        <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider">{item.category}</span>
                                        <h4 className="text-white font-bold text-sm line-clamp-2">{item.title}</h4>
                                    </div>

                                    {/* Zoom Icon */}
                                    <div className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="w-4 h-4 text-slate-600" />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </RevealOnScroll>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Navigation */}
                        <button
                            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                            className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleNext(); }}
                            className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Image Container */}
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-4xl w-full aspect-video bg-slate-800 rounded-2xl overflow-hidden relative"
                        >
                            <img
                                src={galleryData.find(g => g.id === selectedImage)?.image}
                                alt={galleryData.find(g => g.id === selectedImage)?.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">
                                    {galleryData.find(g => g.id === selectedImage)?.category}
                                </span>
                                <h3 className="text-white text-xl font-bold">
                                    {galleryData.find(g => g.id === selectedImage)?.title}
                                </h3>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
