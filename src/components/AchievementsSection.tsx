'use client';

import { RevealOnScroll } from './ui/RevealOnScroll';
import { Trophy, TrendingUp, CheckCircle, Award } from 'lucide-react';

export default function AchievementsSection() {
    return (
        <section id="achievements" className="section-padding bg-slate-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-50">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-yellow-100 rounded-full blur-3xl opacity-60"></div>
            </div>

            <div className="container-custom relative z-10">
                <RevealOnScroll>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#153e70] mb-3">Pencapaian & Kinerja</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            Komitmen berkelanjutan Kementerian Ketenagakerjaan dalam mewujudkan tata kelola BMN yang akuntabel dan berprestasi.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 items-stretch">

                        {/* LEFT: Opini BPK (WTP Streak) */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden h-full">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Award size={120} className="text-[#153e70]" />
                            </div>

                            <h3 className="text-xl font-bold text-[#153e70] mb-8 flex items-center gap-3">
                                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-700 shadow-sm">
                                    <Trophy size={24} />
                                </div>
                                Opini BPK
                            </h3>

                            <div className="flex-1 flex flex-col justify-between">
                                {/* Timeline Horizontal */}
                                <div className="relative py-10 px-2 overflow-x-auto no-scrollbar">
                                    {/* Line */}
                                    <div className="absolute top-[50px] left-0 w-full min-w-[300px] h-1.5 bg-slate-100 -translate-y-1/2 rounded-full"></div>
                                    <div className="absolute top-[50px] left-0 w-full min-w-[300px] h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 -translate-y-1/2 rounded-full origin-left animate-expand-width"></div>

                                    {/* Points */}
                                    <div className="grid grid-cols-5 gap-0 relative z-10 w-full min-w-[300px]">
                                        {[2020, 2021, 2022, 2023, 2024].map((year, index) => (
                                            <div key={year} className="flex flex-col items-center group">
                                                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-blue-600 border-[3px] md:border-4 border-white shadow-md mb-2 md:mb-4 group-hover:scale-110 transition-transform"></div>
                                                <span className="text-[10px] md:text-xs font-bold text-slate-400 mb-1">{year}</span>
                                                <div className="bg-blue-600 text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full shadow-sm">
                                                    WTP
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 text-center bg-blue-50/50 rounded-xl p-4 border border-blue-50">
                                    <div className="inline-flex items-center gap-2 text-blue-700 font-bold text-sm mb-2">
                                        <CheckCircle size={18} />
                                        <span>5 Tahun Berturut-turut</span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed px-2">
                                        Kementerian Ketenagakerjaan konsisten dalam mengelola keuangan dan aset negara secara akuntabel.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: IPA (Indeks Pengelolaan Aset) */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden h-full">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <TrendingUp size={120} className="text-[#c9a227]" />
                            </div>

                            <h3 className="text-xl font-bold text-[#153e70] mb-8 flex items-center gap-3">
                                <div className="p-2.5 bg-yellow-50 rounded-xl text-yellow-700 shadow-sm">
                                    <TrendingUp size={24} />
                                </div>
                                IPA (Indeks Pengelolaan Aset)
                            </h3>

                            <div className="flex-1 flex flex-col justify-between">
                                {/* Timeline Horizontal */}
                                <div className="relative py-10 px-2 overflow-x-auto no-scrollbar">
                                    {/* Line */}
                                    <div className="absolute top-[50px] left-0 w-full min-w-[300px] h-1.5 bg-slate-100 -translate-y-1/2 rounded-full"></div>
                                    <div className="absolute top-[50px] left-0 w-full min-w-[300px] h-1.5 bg-gradient-to-r from-yellow-500 to-yellow-300 -translate-y-1/2 rounded-full origin-left animate-expand-width"></div>

                                    {/* Points */}
                                    <div className="grid grid-cols-4 gap-0 relative z-10 w-full min-w-[300px]">
                                        {[
                                            { year: 2022, val: '2.75' },
                                            { year: 2023, val: '3.15' },
                                            { year: 2024, val: '3.42' },
                                            { year: 2025, val: 'Target' }
                                        ].map((item, index) => (
                                            <div key={item.year} className="flex flex-col items-center group">
                                                <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-[3px] md:border-4 border-white shadow-md mb-2 md:mb-4 group-hover:scale-110 transition-transform ${index === 3 ? 'bg-slate-300' : 'bg-yellow-500'}`}></div>
                                                <span className="text-[10px] md:text-xs font-bold text-slate-400 mb-1">{item.year}</span>
                                                <div className={`text-[9px] md:text-[10px] font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full shadow-sm ${index === 3 ? 'bg-slate-100 text-slate-500' : 'bg-yellow-100 text-yellow-700'}`}>
                                                    {item.val}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 text-center bg-yellow-50/50 rounded-xl p-4 border border-yellow-50">
                                    <div className="inline-flex items-center gap-2 text-yellow-800 font-bold text-sm mb-2">
                                        <TrendingUp size={18} />
                                        <span>Tren Positif</span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed px-2">
                                        Peningkatan kualitas pengelolaan aset yang signifikan setiap tahunnya.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
