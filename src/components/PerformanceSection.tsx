'use client';

import { RevealOnScroll } from './ui/RevealOnScroll';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FileCheck, ShieldCheck, Building2, Car } from 'lucide-react';

const homeData = [
    { name: 'Golongan 1', value: 30, color: '#fbbf24' },  // amber-400
    { name: 'Golongan 2', value: 305, color: '#153e70' }, // navy
    { name: 'Golongan 3', value: 0, color: '#94a3b8' },  // slate-400
];

const vehicleData = [
    { name: 'EV Roda 4', value: 25, color: '#153e70' }, // navy
    { name: 'EV Roda 2', value: 115, color: '#fbbf24' }, // amber-400
    { name: 'Roda 4', value: 449, color: '#64748b' },   // slate-500
    { name: 'Roda 2', value: 328, color: '#94a3b8' },   // slate-400
];

const RadialProgress = ({ value, label, sublabel, icon: Icon, colorClass = "text-blue-600", strokeColor = "#2563eb" }: { value: number | string, label: string, sublabel: string, icon: any, colorClass?: string, strokeColor?: string }) => {
    // Increased radius to give more space for text
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const numericValue = typeof value === 'number' ? value : 100; // Default full for text checks
    const offset = circumference - (numericValue / 100) * circumference;

    return (
        <div className="flex flex-col items-center text-center group h-full">
            <div className="relative w-28 h-28 mb-4 flex items-center justify-center flex-shrink-0">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="#e2e8f0"
                        strokeWidth="6"
                        fill="transparent"
                    />
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke={strokeColor}
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {typeof value === 'number' ? (
                        <span className={`text-xl font-bold ${colorClass}`}>{value}%</span>
                    ) : (
                        <Icon className={`w-8 h-8 ${colorClass}`} />
                    )}
                </div>
            </div>
            <h4 className="font-bold text-[#153e70] mb-2">{label}</h4>
            {/* Added min-height to ensure alignment across row even with different text lengths */}
            <p className="text-xs text-slate-500 max-w-[160px] leading-relaxed min-h-[40px] flex items-start justify-center">
                {sublabel}
            </p>
        </div>
    );
};

export default function PerformanceSection() {
    return (
        <section id="performance" className="section-padding bg-slate-50 border-t border-slate-100">
            <div className="container-custom">
                <RevealOnScroll>
                    {/* Top Row: Indicators */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16 px-4 items-start">
                        <RadialProgress
                            value={100}
                            label="Sertipikasi"
                            sublabel="Tuntas dalam kegiatan sertipikasi BMN tanah pemerintah"
                            icon={FileCheck}
                            colorClass="text-[#153e70]"
                            strokeColor="#153e70"
                        />
                        <RadialProgress
                            value={95}
                            label="PSP"
                            sublabel="Sebagian besar BMN sudah ditetapkan statusnya"
                            icon={FileCheck}
                            colorClass="text-[#153e70]"
                            strokeColor="#153e70"
                        />
                        <RadialProgress
                            value="Terbit"
                            label="Asuransi"
                            sublabel="Telah melakukan asuransi BMN dengan baik"
                            icon={ShieldCheck}
                            colorClass="text-[#153e70]"
                            strokeColor="#153e70"
                        />
                        <RadialProgress
                            value={84}
                            label="SBSK"
                            sublabel="Tingkat Kesesuaian Penggunaan BMN sudah cukup optimal"
                            icon={Building2}
                            colorClass="text-[#153e70]"
                            strokeColor="#153e70"
                        />
                    </div>

                    {/* Bottom Row: Charts */}
                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        {/* Rumah Dinas Chart */}
                        <div className="card-premium p-6 flex flex-col">
                            <h3 className="font-bold text-[#153e70] text-lg mb-6 flex items-center justify-center gap-2 border-b border-slate-100 pb-3">
                                <Building2 className="text-[#fbbf24]" size={20} />
                                Data Rumah Dinas
                            </h3>
                            <div className="flex-1 flex flex-col sm:flex-row items-center gap-8 justify-center">
                                <div className="h-40 w-40 relative flex-shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={homeData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={0}
                                                outerRadius={65}
                                                paddingAngle={2}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {homeData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="w-full max-w-[200px]">
                                    <div className="flex flex-col gap-3">
                                        {homeData.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center text-sm p-2 rounded hover:bg-slate-50 transition-colors border-l-4 bg-white shadow-sm border-slate-100" style={{ borderLeftColor: item.color }}>
                                                <span className="text-slate-600 font-medium text-xs">{item.name}</span>
                                                <span className="font-bold text-[#153e70]">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Kendaraan Dinas Chart */}
                        <div className="card-premium p-6 flex flex-col">
                            <h3 className="font-bold text-[#153e70] text-lg mb-6 flex items-center justify-center gap-2 border-b border-slate-100 pb-3">
                                <Car className="text-[#fbbf24]" size={20} />
                                Data Kendaraan Dinas
                            </h3>
                            <div className="flex-1 flex flex-col sm:flex-row items-center gap-8 justify-center">
                                <div className="h-40 w-40 relative flex-shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={vehicleData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={0}
                                                outerRadius={65}
                                                paddingAngle={2}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {vehicleData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="w-full max-w-[200px]">
                                    <div className="flex flex-col gap-3">
                                        {vehicleData.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center text-sm p-2 rounded hover:bg-slate-50 transition-colors border-l-4 bg-white shadow-sm border-slate-100" style={{ borderLeftColor: item.color }}>
                                                <span className="text-slate-600 font-medium text-xs">{item.name}</span>
                                                <span className="font-bold text-[#153e70]">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
