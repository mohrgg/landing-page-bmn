'use client';

import { Building2, User } from 'lucide-react';

export default function SatkerSection() {
    return (
        <section className="section-padding bg-slate-50">
            <div className="container-custom">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-[#153e70] mb-2">Satuan Kerja</h2>
                    <p className="text-slate-500">Informasi balai dan pimpinan unit kerja</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Card Satker */}
                    <div className="card-premium group">
                        <div className="aspect-video bg-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-100 group-hover:bg-slate-200 transition-colors">
                                <Building2 className="w-12 h-12 mb-2 opacity-50" />
                                <span className="text-sm font-medium">Foto Gedung Balai</span>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold border border-blue-100">
                                    Eselon I
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-[#153e70] mb-1">
                                BALAI BESAR PELATIHAN VOKASI
                            </h3>
                            <p className="text-slate-500 text-sm">
                                Pusat pengembangan kompetensi tenaga kerja yang unggul dan berdaya saing.
                            </p>
                        </div>
                    </div>

                    {/* Card Kepala Balai */}
                    <div className="card-premium group">
                        <div className="aspect-video bg-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-100 group-hover:bg-slate-200 transition-colors">
                                <User className="w-12 h-12 mb-2 opacity-50" />
                                <span className="text-sm font-medium">Foto Pejabat</span>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-2.5 py-0.5 rounded-full bg-yellow-50 text-yellow-700 text-xs font-semibold border border-yellow-100">
                                    Kepala Balai
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-[#153e70] mb-1">
                                DR. NAMA PEJABAT, M.SI
                            </h3>
                            <p className="text-slate-500 text-sm">
                                Memimpin transformasi digital dan pengelolaan aset negara yang akuntabel.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
