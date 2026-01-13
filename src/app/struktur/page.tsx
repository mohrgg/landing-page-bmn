'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface NodeProps {
    name: string;
    title: string;
    unit?: string;
    highlight?: boolean;
}

const OrgNode = ({ name, title, unit, highlight = false }: NodeProps) => (
    <div className={`org-node ${highlight ? 'org-node-highlight' : ''}`}>
        <div className="org-name">{name}</div>
        <div className="org-title">{title}</div>
        {unit && <div className="org-unit">{unit}</div>}
    </div>
);

export default function StrukturPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-[#153e70] via-[#1e4a82] to-[#2a5d9e] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                    <div className="container-custom relative z-10">
                        <div className="pt-8 pb-4">
                            <Link href="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors text-sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Kembali ke Beranda
                            </Link>
                        </div>

                        <div className="pb-12 pt-4 text-center">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <Users className="w-6 h-6 text-[#c9a227]" />
                                    <span className="text-xs font-bold text-[#c9a227] uppercase tracking-widest">Organisasi</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Struktur Organisasi</h1>
                                <p className="text-white/70 max-w-2xl mx-auto">
                                    Susunan pejabat struktural Sekretariat Jenderal Kementerian Ketenagakerjaan Republik Indonesia
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Org Chart Section */}
                <section className="py-12">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 overflow-x-auto"
                        >
                            <div className="org-chart">
                                {/* Level 1: Sekretaris Jenderal */}
                                <ul>
                                    <li>
                                        <OrgNode
                                            name="Dr. Cris Kuntadi, S.E., M.M."
                                            title="SEKRETARIS JENDERAL"
                                            highlight={true}
                                        />

                                        {/* Level 2: Children */}
                                        <ul>
                                            {/* Direktur - aligned right in original but we put in order */}
                                            <li>
                                                <OrgNode
                                                    name="Yoki Yulizar, M.Sc."
                                                    title="DIREKTUR"
                                                    unit="Politeknik Ketenagakerjaan"
                                                />
                                            </li>
                                            <li>
                                                <OrgNode
                                                    name="Dian Kreshnadjati, S.E, M.M."
                                                    title="KEPALA BIRO"
                                                    unit="Organisasi & SDM Aparatur"
                                                />
                                            </li>
                                            <li>
                                                <OrgNode
                                                    name="Dr. Narsih, S.Pd., M.M."
                                                    title="PLT KEPALA BIRO"
                                                    unit="Keuangan & BMN"
                                                />
                                            </li>
                                            <li>
                                                <OrgNode
                                                    name="Muhammad Arif Hidayat"
                                                    title="KEPALA BIRO"
                                                    unit="Kerjasama"
                                                />
                                            </li>
                                            <li>
                                                <OrgNode
                                                    name="Dr. Narsih, S.Pd., M.M."
                                                    title="KEPALA PUSAT"
                                                    unit="Pengembangan SDM Naker"
                                                />
                                            </li>
                                            <li>
                                                <OrgNode
                                                    name="Faried A. Nur Yuliono"
                                                    title="KEPALA BIRO"
                                                    unit="Humas"
                                                />
                                            </li>
                                            <li>
                                                <OrgNode
                                                    name="Surya Lukita Warman"
                                                    title="PLT KEPALA"
                                                    unit="Pusat Pasar Kerja"
                                                />
                                            </li>
                                            <li>
                                                <OrgNode
                                                    name="Reni Mursidayanti, S.H., M.H."
                                                    title="KEPALA BIRO"
                                                    unit="Hukum"
                                                />
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx>{`
                .org-chart {
                    display: flex;
                    justify-content: center;
                    min-width: 1000px;
                }
                
                .org-chart ul {
                    padding-top: 20px;
                    position: relative;
                    display: flex;
                    justify-content: center;
                }
                
                .org-chart li {
                    list-style: none;
                    text-align: center;
                    position: relative;
                    padding: 20px 5px 0;
                }
                
                /* Top connector */
                .org-chart li::before,
                .org-chart li::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    border-top: 2px solid #cbd5e1;
                    width: 50%;
                }
                
                .org-chart li::before {
                    right: 50%;
                }
                
                .org-chart li::after {
                    left: 50%;
                }
                
                /* Remove left connector from first child */
                .org-chart li:first-child::before {
                    border: none;
                }
                
                /* Remove right connector from last child */
                .org-chart li:last-child::after {
                    border: none;
                }
                
                /* Only child - no horizontal line */
                .org-chart li:only-child::before,
                .org-chart li:only-child::after {
                    border: none;
                }
                
                /* Vertical line down from parent */
                .org-chart ul ul::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 50%;
                    border-left: 2px solid #cbd5e1;
                    height: 20px;
                }
                
                /* Vertical line up from child */
                .org-chart li::before {
                    border-left: 2px solid #cbd5e1;
                    height: 20px;
                }
                
                .org-node {
                    display: inline-block;
                    padding: 10px 14px;
                    border: 2px solid #e2e8f0;
                    border-radius: 10px;
                    background: white;
                    text-align: center;
                    min-width: 120px;
                    max-width: 140px;
                    transition: all 0.2s;
                }
                
                .org-node:hover {
                    border-color: #153e70;
                    box-shadow: 0 4px 12px rgba(21, 62, 112, 0.15);
                    transform: translateY(-2px);
                }
                
                .org-node-highlight {
                    background: linear-gradient(135deg, #153e70 0%, #2a5d9e 100%);
                    border-color: #153e70;
                }
                
                .org-node-highlight .org-name {
                    color: white;
                }
                
                .org-node-highlight .org-title {
                    color: #c9a227;
                }
                
                .org-name {
                    font-weight: 700;
                    font-size: 10px;
                    color: #1e293b;
                    line-height: 1.3;
                    margin-bottom: 3px;
                }
                
                .org-title {
                    font-size: 8px;
                    font-weight: 600;
                    color: #c9a227;
                    text-transform: uppercase;
                    letter-spacing: 0.3px;
                }
                
                .org-unit {
                    font-size: 7px;
                    color: #64748b;
                    margin-top: 3px;
                    line-height: 1.2;
                }
            `}</style>
        </div>
    );
}
