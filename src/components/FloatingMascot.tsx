'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function FloatingMascot() {
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    // Show mascot after scrolling down a bit
    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Auto-show tooltip after mascot appears
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => setShowTooltip(true), 2000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 100, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2"
                >
                    {/* Tooltip Bubble */}
                    <AnimatePresence>
                        {showTooltip && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                className="relative bg-white border border-slate-200 rounded-xl shadow-lg p-3 max-w-[200px] mr-2"
                            >
                                <button
                                    onClick={() => setShowTooltip(false)}
                                    className="absolute -top-2 -right-2 bg-slate-100 hover:bg-slate-200 rounded-full p-1 transition-colors"
                                >
                                    <X className="w-3 h-3 text-slate-500" />
                                </button>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    <span className="font-bold text-[#153e70]">Hai!</span> Saya <span className="font-semibold">BARAN</span>, maskot BMN Kemnaker. Selamat datang pengguna aset negara! 🎉
                                </p>
                                <div className="mt-2 text-right">
                                    <Link href="/filosofi-maskot" className="text-[10px] font-bold text-[#153e70] hover:underline flex items-center justify-end gap-1">
                                        Kenalan Yuk! <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                                {/* Arrow pointing to mascot */}
                                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-b border-r border-slate-200 rotate-45"></div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Mascot Image */}
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowTooltip(!showTooltip)}
                        className="w-24 h-24 md:w-36 md:h-36 cursor-pointer drop-shadow-2xl"
                    >
                        <Image
                            src="/images/Burung BMN.png"
                            alt="Maskot BARAN"
                            width={144}
                            height={144}
                            className="w-full h-full object-contain"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
