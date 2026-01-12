'use client';

import { FileText, Shield, UserCheck, BookOpen, Scale } from 'lucide-react';
import Image from 'next/image';
import { RevealOnScroll } from './ui/RevealOnScroll';

export default function InfoSection() {
    return (
        <section id="info" className="section-padding bg-white">
            <div className="container-custom">
                <RevealOnScroll>
                    <h2 className="text-2xl font-bold text-[#153e70] mb-6 border-l-4 border-[#c9a227] pl-4">
                        Sekilas Info BMN
                    </h2>

                    <div className="grid lg:grid-cols-12 gap-6">
                        {/* KOLOM KIRI: IPA (Indeks Pengelolaan Aset) - Lebar 4 */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <div className="card-premium p-6 h-full border-t-4 border-t-[#153e70]">
                                <h3 className="font-bold text-2xl text-[#153e70] mb-4 flex items-center gap-2">
                                    IPA <span className="text-sm font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded">Indeks Pengelolaan Aset</span>
                                </h3>

                                {/* Score Big Display */}
                                <div className="bg-slate-50 rounded-xl p-6 text-center mb-6">
                                    <p className="text-sm text-slate-500 mb-1">Capaian IPA 2023</p>
                                    <div className="flex items-end justify-center gap-2 leading-none">
                                        <span className="text-6xl font-bold text-green-600">3,15</span>
                                        <span className="text-xl text-slate-400 font-medium mb-1">/ 4</span>
                                    </div>
                                    <div className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                        SANGAT BAIK
                                    </div>
                                </div>

                                {/* Rincian Table */}
                                <div className="mb-4">
                                    <h4 className="font-bold text-sm text-[#153e70] mb-2">Rincian Capaian Sasaran Strategis</h4>
                                    <table className="w-full text-xs text-left">
                                        <thead className="bg-[#153e70] text-white">
                                            <tr>
                                                <th className="p-2 rounded-tl">Sasaran</th>
                                                <th className="p-2 text-center">Indeks</th>
                                                <th className="p-2 rounded-tr text-center">Bobot</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-slate-100">
                                                <td className="p-2">Pengelolaan BMN Akuntabel</td>
                                                <td className="p-2 text-center font-bold">2,80</td>
                                                <td className="p-2 text-center">25%</td>
                                            </tr>
                                            <tr className="border-b border-slate-100">
                                                <td className="p-2">Kepatuhan Pengelolaan</td>
                                                <td className="p-2 text-center font-bold">3,05</td>
                                                <td className="p-2 text-center">20%</td>
                                            </tr>
                                            <tr className="border-b border-slate-100">
                                                <td className="p-2">Pengawasan & Pengendalian</td>
                                                <td className="p-2 text-center font-bold">3,60</td>
                                                <td className="p-2 text-center">25%</td>
                                            </tr>
                                            <tr>
                                                <td className="p-2">Administrasi Handal</td>
                                                <td className="p-2 text-center font-bold">2,73</td>
                                                <td className="p-2 text-center">30%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <p className="text-xs text-slate-600 leading-relaxed text-justify mt-auto">
                                    IPA sebagai alat pengukuran kualitas pengelolaan Barang Milik Negara pada seluruh K/L.
                                    Capaian IPA Kemnaker terus meningkat: 2021 (2,4), 2022 (2,75), dan 2023 (3,15).
                                </p>
                            </div>
                        </div>

                        {/* KOLOM KANAN: Grid info lainnya - Lebar 8 */}
                        <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">

                            {/* PENGGUNAAN ASET */}
                            <div className="card-premium overflow-hidden h-full flex flex-col">
                                <div className="h-40 bg-slate-100 relative border-b border-slate-100">
                                    <Image
                                        src="/images/jalur-penyelamatan.jpeg"
                                        alt="Puncak No. 59 Ciloto"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-5 flex-1 bg-white">
                                    <h3 className="font-bold text-[#153e70] text-lg mb-3">PENGGUNAAN ASET</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed text-justify">
                                        Selain digunakan untuk tupoksi, aset juga dikerjasamakan. Contoh: Kerjasama dengan Kemenhub
                                        untuk Jalur Penyelamatan Darurat di Jl. Raya Puncak No. 59, Ciloto (Wisma Karya Jasa).
                                    </p>
                                </div>
                            </div>

                            {/* ASURANSI */}
                            <div className="card-premium overflow-hidden h-full flex flex-col">
                                <div className="h-40 bg-slate-100 relative border-b border-slate-100">
                                    <Image
                                        src="/images/asuransi.jpg"
                                        alt="Asuransi Gedung"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-5 flex-1 bg-white">
                                    <h3 className="font-bold text-[#153e70] text-lg mb-3">ASURANSI</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed text-justify">
                                        Solusi alternatif menanggulangi risiko bencana/kerusakan aset. Kemnaker telah mengasuransikan
                                        sebagian aset berupa Gedung Bangunan (permanen) di Jl. Gatot Subroto Kav. 51 Jakarta Selatan.
                                    </p>
                                </div>
                            </div>

                            {/* PERATURAN */}
                            <div className="card-premium overflow-hidden h-full flex flex-col">
                                <div className="h-40 bg-slate-100 relative border-b border-slate-100">
                                    <Image
                                        src="/images/peraturan-new.jpg"
                                        alt="Peraturan BMN"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-5 flex-1 bg-white h-full flex flex-col">
                                    <h3 className="font-bold text-[#153e70] text-lg mb-3">PERATURAN</h3>
                                    <p className="text-xs text-slate-600 leading-relaxed text-justify mb-4 flex-grow">
                                        Upaya perbaikan tata kelola kendaraan dinas dan pendelegasian wewenang pengelolaan BMN
                                        melalui penerbitan regulasi internal agar lebih tertib, efisien, dan akuntabel.
                                    </p>
                                    <div className="space-y-2 mt-auto">
                                        <div className="bg-slate-50 p-2 rounded text-xs font-semibold text-[#153e70] border border-slate-200">
                                            📜 Permenaker No. 6 Tahun 2023
                                        </div>
                                        <div className="bg-slate-50 p-2 rounded text-xs font-semibold text-[#153e70] border border-slate-200">
                                            📜 Kepmen No. 61 Tahun 2024
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PENGEMBANGAN KOMPETENSI */}
                            <div className="card-premium overflow-hidden h-full flex flex-col">
                                <div className="h-40 bg-slate-100 relative border-b border-slate-100">
                                    <Image
                                        src="/images/pengembangan-kompetensi.jpg"
                                        alt="Pengembangan Kompetensi"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-5 flex-1 bg-white">
                                    <h3 className="font-bold text-[#153e70] text-lg mb-3">PENGEMBANGAN KOMPETENSI</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed text-justify">
                                        Inovasi peningkatan kompetensi pengelola BMN level UAKPB melalui Bimtek, Pelatihan,
                                        dan Coaching Clinic Biro Keuangan & BMN.
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
