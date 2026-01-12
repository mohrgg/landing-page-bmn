'use client';

import { useState } from 'react';
import { Building2, User, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { indonesiaPaths } from './IndonesiaPaths';
import { RevealOnScroll } from './ui/RevealOnScroll';

// Using paths generated from the high-quality SVG provided
const regions = indonesiaPaths;

export default function DashboardMapSection() {
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [showTable, setShowTable] = useState(false);

    return (
        <section id="sebaran" className="py-12 bg-white relative">
            <div className="container-custom">
                <RevealOnScroll>
                    {/* HEADER */}
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-[#153e70] mb-2">Sebaran BMN Kemnaker</h2>
                        <p className="text-slate-500 text-sm">Visualisasi data interaktif BMN di seluruh Satuan Kerja Pusat dan Daerah.</p>
                    </div>

                    {/* MAIN VISUAL: MAP (Pure SVG High Fidelity) */}
                    <div className="relative w-full max-w-6xl mx-auto mb-16 group">
                        {/* SVG ViewBox matched to source file dimensions (approx 793x317) */}
                        <div className="aspect-[21/9] flex items-center justify-center relative">
                            <svg
                                viewBox="0 0 795 320"
                                className="w-full h-full drop-shadow-xl"
                                onMouseMove={(e) => {
                                    const bounds = e.currentTarget.getBoundingClientRect();
                                    setTooltipPos({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
                                }}
                            >
                                {/* Background Pattern / Ocean hints could go here */}

                                {regions.map((region) => (
                                    <path
                                        key={region.id}
                                        d={region.path}
                                        fill={hoveredRegion === region.id ? '#153e70' : '#f1f5f9'}
                                        stroke={hoveredRegion === region.id ? '#fbbf24' : '#cbd5e1'}
                                        strokeWidth={hoveredRegion === region.id ? "1" : "0.5"}
                                        className="transition-all duration-300 ease-out cursor-pointer hover:filter hover:brightness-105 outline-none"
                                        onMouseEnter={() => setHoveredRegion(region.id)}
                                        onMouseLeave={() => setHoveredRegion(null)}
                                    />
                                ))}
                            </svg>

                            {/* FLOATING TOOLTIP */}
                            <AnimatePresence>
                                {hoveredRegion && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                        transition={{ duration: 0.15 }}
                                        style={{
                                            left: tooltipPos.x,
                                            top: tooltipPos.y - 70,
                                            position: 'absolute',
                                            pointerEvents: 'none',
                                            x: '-50%' // Center horizontally
                                        }}
                                        className="z-50 min-w-[200px]"
                                    >
                                        <div className="bg-white/95 backdrop-blur-sm border border-slate-200 p-4 rounded-xl shadow-2xl text-left relative">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">WILAYAH</span>
                                                <span className={`w-2 h-2 rounded-full ${hoveredRegion ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                                            </div>
                                            <h4 className="font-bold text-[#153e70] text-lg leading-tight mb-2">
                                                {regions.find(r => r.id === hoveredRegion)?.name}
                                            </h4>
                                            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                                                <div>
                                                    <p className="text-[10px] text-slate-500 uppercase">Total Aset</p>
                                                    <p className="font-bold text-sm text-slate-700">1,240 <span className="text-xs font-normal text-slate-400">Unit</span></p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-blue-500 uppercase">Nilai Aset</p>
                                                    <p className="font-bold text-sm text-blue-600">Rp 4.5T</p>
                                                </div>
                                            </div>
                                            {/* Arrow */}
                                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-slate-200 rotate-45"></div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* LEGEND overlay */}
                        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur px-3 py-2 rounded-lg border border-slate-200 text-[10px] text-slate-500 shadow-sm">
                            <span className="font-bold text-[#153e70]">Peta Interaktif:</span> Arahkan kursor untuk melihat detail.
                        </div>
                    </div>

                    {/* SATKER & PEJABAT */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                        <div className="flex items-center gap-6 p-6 rounded-2xl bg-slate-50/50 border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all group cursor-pointer">
                            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Building2 className="w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#153e70] text-lg group-hover:text-blue-700 transition-colors">Nama Satuan Kerja</h4>
                                <p className="text-sm text-slate-500 mb-2">Eselon I Kementerian Ketenagakerjaan</p>
                                <p className="text-xs text-blue-600 font-medium">Lihat Profil Satker →</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 p-6 rounded-2xl bg-slate-50/50 border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all group cursor-pointer">
                            <div className="w-16 h-16 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <User className="w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#153e70] text-lg group-hover:text-blue-700 transition-colors">Nama Pejabat</h4>
                                <p className="text-sm text-slate-500 mb-2">Kepala Balai / Pimpinan</p>
                                <p className="text-xs text-blue-600 font-medium">Lihat Struktur →</p>
                            </div>
                        </div>
                    </div>

                    {/* DATA TABLE (Collapsed) */}
                    <div className="max-w-5xl mx-auto">
                        <button
                            onClick={() => setShowTable(!showTable)}
                            className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-[#153e70]">Detail Data BMN Kemnaker</p>
                                    <p className="text-xs text-slate-500">Klik untuk melihat rincian tabel asset per tahun</p>
                                </div>
                            </div>
                            {showTable ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                        </button>

                        <AnimatePresence>
                            {showTable && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                        <table className="w-full text-xs text-center">
                                            <thead>
                                                <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                                                    <th className="py-4 px-3">TAHUN</th>
                                                    <th className="py-4 px-3">TANAH</th>
                                                    <th className="py-4 px-3">PM</th>
                                                    <th className="py-4 px-3">G&B</th>
                                                    <th className="py-4 px-3">Jalan/Irigasi</th>
                                                    <th className="py-4 px-3">KDP</th>
                                                    <th className="py-4 px-3">ATL</th>
                                                    <th className="py-4 px-3">Aset Lain</th>
                                                    <th className="py-4 px-3 bg-blue-50 text-blue-800">TOTAL</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-slate-600">
                                                {[2021, 2022, 2023].map((year) => (
                                                    <tr key={year} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                                                        <td className="py-3 font-bold text-slate-800">{year}</td>
                                                        <td className="py-3">125</td>
                                                        <td className="py-3">450</td>
                                                        <td className="py-3">89</td>
                                                        <td className="py-3">32</td>
                                                        <td className="py-3">15</td>
                                                        <td className="py-3">44</td>
                                                        <td className="py-3">8</td>
                                                        <td className="py-3 font-bold text-blue-700 bg-blue-50/30">763</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-2 text-center">
                                        <span className="text-[10px] text-slate-400 italic">Data diperbarui per Desember 2023</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
