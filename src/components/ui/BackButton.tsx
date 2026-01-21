'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
    href?: string;
    label?: string;
}

export default function BackButton({
    href = '/',
    label = 'Kembali ke Beranda'
}: BackButtonProps) {
    return (
        <div className="pt-8 pb-4">
            <Link
                href={href}
                className="inline-flex items-center text-white/70 hover:text-white transition-colors text-sm"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {label}
            </Link>
        </div>
    );
}
