'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, DollarSign, Activity } from 'lucide-react';
import { RevealOnScroll } from './ui/RevealOnScroll';

const modalData = [
    { kategori: 'Belanja Modal', v2021: 150, v2022: 180, v2023: 165 },
    { kategori: 'Penambahan Aset', v2021: 120, v2022: 145, v2023: 138 },
    { kategori: 'Pengurangan Aset', v2021: 30, v2022: 35, v2023: 27 },
];

const pnbpYearData = [
    { tahun: '2021', value: 2.5 },
    { tahun: '2022', value: 3.8 },
    { tahun: '2023', value: 6.72 },
];

const pnbpAccountData = [
    { akun: '425122', deskripsi: 'Pendapatan Sewa Tanah', t2021: '-', t2022: '-', t2023: '-' },
    { akun: '425193', deskripsi: 'Pendapatan Jasa Lainnya', t2021: '-', t2022: '-', t2023: '-' },
    { akun: '425153', deskripsi: 'Pendapatan Sewa Gedung', t2021: '-', t2022: '-', t2023: '-' },
];

const realisasiTable = [
    { th: '2021', realisasi: '85%', naikTurun: 'XXXX' },
    { th: '2022', realisasi: '92%', naikTurun: 'XXXX' },
    { th: '2023', realisasi: '88%', naikTurun: 'XXXX' },
];

export default function EfficiencySection() {
    return (
        <section id="analisis" className="section-padding bg-slate-50">
            <div className="container-custom">
                <RevealOnScroll>
                    <h2 className="text-2xl font-bold text-[#153e70] mb-6 border-l-4 border-[#c9a227] pl-4">
                        Analisis Efisiensi BMN Kemnaker
                    </h2>

                    {/* ROW 1: Belanja Modal & Efisiensi */}
                    <div className="card-premium p-6 mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            <h3 className="font-bold text-[#153e70] text-lg">Belanja Modal dan Efisiensi</h3>
                        </div>

                        <div className="grid lg:grid-cols-12 gap-8">
                            {/* Tabel Kiri - Realisasi */}
                            <div className="lg:col-span-3">
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-[#153e70] text-white">
                                            <th className="p-2 text-center border border-blue-900">TH</th>
                                            <th className="p-2 text-center border border-blue-900">REALISASI</th>
                                            <th className="p-2 text-center border border-blue-900">NAIK/TURUN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {realisasiTable.map((row, i) => (
                                            <tr key={i} className={i % 2 === 0 ? 'bg-blue-50/50' : 'bg-white'}>
                                                <td className="p-3 text-center border border-slate-200 font-semibold">{row.th}</td>
                                                <td className="p-3 text-center border border-slate-200 text-blue-700 font-bold">{row.realisasi}</td>
                                                <td className="p-3 text-center border border-slate-200 text-slate-500">{row.naikTurun}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Box Deskripsi Singkat */}
                                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded text-xs text-yellow-800 leading-relaxed">
                                    Tabel menggambarkan 3 indikator: Belanja Modal, Penambahan Aset, dan Pengurangan Aset untuk analisis efisiensi pengadaan BMN 3 tahun terakhir.
                                </div>
                            </div>

                            {/* Chart Kanan - 3 Indikator */}
                            <div className="lg:col-span-9">
                                <p className="text-center text-sm font-semibold text-[#153e70] mb-4">
                                    3 Indikator (Belanja Modal, Penambahan Aset, dan Pengurangan Aset)
                                </p>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={modalData} barGap={0} barCategoryGap="20%">
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="kategori" tick={{ fontSize: 12 }} />
                                            <YAxis tick={{ fontSize: 12 }} />
                                            <Tooltip cursor={{ fill: '#f1f5f9' }} />
                                            <Legend />
                                            <Bar dataKey="v2021" name="2021" fill="#153e70" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="v2022" name="2022" fill="#2563eb" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="v2023" name="2023" fill="#c9a227" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ROW 2: PNBP */}
                    <div className="card-premium p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            <h3 className="font-bold text-[#153e70] text-lg">PNBP (Penerimaan Negara Bukan Pajak)</h3>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Kolom Kiri: Stats & Tabel Akun */}
                            <div>
                                <div className="flex gap-4 mb-6">
                                    <div className="flex-1 bg-[#153e70] text-white p-4 rounded-lg text-center">
                                        <p className="text-xs opacity-75 uppercase tracking-wider mb-1">Target Pagu</p>
                                        <p className="text-3xl font-bold">11.33 <span className="text-sm font-normal">T</span></p>
                                    </div>
                                    <div className="flex-1 bg-[#2e8540] text-white p-4 rounded-lg text-center">
                                        <p className="text-xs opacity-75 uppercase tracking-wider mb-1">Realisasi</p>
                                        <p className="text-3xl font-bold">6.72 <span className="text-sm font-normal">T</span></p>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="bg-slate-100 text-slate-600">
                                                <th className="p-2 text-left">AKUN</th>
                                                <th className="p-2 text-center">2021</th>
                                                <th className="p-2 text-center">2022</th>
                                                <th className="p-2 text-center">2023</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pnbpAccountData.map((row, i) => (
                                                <tr key={i} className="border-b border-slate-100">
                                                    <td className="p-2 font-medium">
                                                        {row.akun}
                                                        <div className="text-[10px] text-slate-500 font-normal">{row.deskripsi}</div>
                                                    </td>
                                                    <td className="p-2 text-center">{row.t2021}</td>
                                                    <td className="p-2 text-center">{row.t2022}</td>
                                                    <td className="p-2 text-center">{row.t2023}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Kolom Kanan: Chart PNBP per Tahun & Narasi */}
                            <div className="flex flex-col h-full">
                                <div className="mb-4 flex-grow">
                                    <p className="text-center text-sm font-semibold text-[#153e70] mb-2">
                                        Total PNBP Selama Tahun 2021, 2022, 2023
                                    </p>
                                    <div className="h-[200px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={pnbpYearData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                <XAxis dataKey="tahun" />
                                                <YAxis />
                                                <Tooltip />
                                                <Bar dataKey="value" fill="#2e8540" radius={[4, 4, 0, 0]} name="Triliun Rp" barSize={40} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-4 rounded border border-slate-200 text-xs text-slate-600 leading-relaxed text-justify">
                                    Tabel di sebelah kiri menggambarkan Penerimaan Negara Bukan Pajak (PNBP) selama 3 tahun terakhir.
                                    Secara garis besar terjadi peningkatan PNBP. Kementerian Ketenagakerjaan terus berusaha mengoptimalkan
                                    asetnya selain berfungsi sebagai gedung kantor juga dapat digunakan untuk hal lainnya agar mempunyai
                                    nilai manfaat ekonomi penghasil PNBP.
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
