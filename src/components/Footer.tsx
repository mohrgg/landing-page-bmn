'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#153e70] text-white pt-12 pb-6">
            <div className="container-custom">
                <div className="grid md:grid-cols-4 gap-10 border-b border-blue-900/50 pb-12 mb-8">
                    {/* Column 1: Identity */}
                    <div className="space-y-4 md:col-span-1">
                        <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 bg-white rounded-lg p-1 shrink-0">
                                <Image
                                    src="/images/logo-kemnaker.png"
                                    alt="Logo Kemnaker"
                                    fill
                                    className="object-contain p-1"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-tight">Kementerian<br />Ketenagakerjaan</h3>
                                <p className="text-xs text-blue-200">Republik Indonesia</p>
                            </div>
                        </div>
                        <p className="text-sm text-blue-100 leading-relaxed">
                            Portal resmi Biro Keuangan dan BMN untuk transparansi pengelolaan aset negara yang akuntabel.
                        </p>
                        <div className="flex gap-4 pt-2">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center hover:bg-[#c9a227] transition-colors">
                                    <Icon className="w-4 h-4 text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Aplikasi Terkait (Requested) */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-[#c9a227] mb-4 uppercase text-xs tracking-wider">Aplikasi Terkait</h4>
                        <ul className="space-y-3 text-sm text-blue-100">
                            <li>
                                <a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                                    <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                                    <span>Monitoring Tiket BMN</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                                    <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                                    <span>Monitoring PSP BMN</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                                    <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                                    <span>SIMAN Kemenkeu</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                                    <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                                    <span>Srikandi</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Layanan Pubik */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-[#c9a227] mb-4 uppercase text-xs tracking-wider">Layanan Publik</h4>
                        <ul className="space-y-3 text-sm text-blue-100">
                            <li><a href="#" className="hover:text-white transition-colors">Regulasi BMN</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Standar Pelayanan</a></li>
                            <li><Link href="/filosofi-maskot" className="hover:text-white transition-colors">Filosofi Maskot</Link></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pengaduan Masyarakat</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Whistleblowing System</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-[#c9a227] mb-4 uppercase text-xs tracking-wider">Hubungi Kami</h4>
                        <ul className="space-y-4 text-sm text-blue-100">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" />
                                <span>
                                    Jl. Jenderal Gatot Subroto Kav. 51,<br />
                                    DKI Jakarta Selatan 12950
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-[#c9a227] shrink-0" />
                                <span>Call Center: 1500630</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-[#c9a227] shrink-0" />
                                <span>birokeuangan@kemnaker.go.id</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-blue-300 gap-4 border-t border-blue-900/30 pt-6">
                    <p>© {new Date().getFullYear()} Biro Keuangan dan BMN - Kementerian Ketenagakerjaan RI</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white">Peta Situs</a>
                        <a href="#" className="hover:text-white">Kebijakan Privasi</a>
                        <a href="#" className="hover:text-white">Syarat & Ketentuan</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
