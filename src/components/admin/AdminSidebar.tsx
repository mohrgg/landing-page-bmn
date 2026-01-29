"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    ChevronLeft,
    ChevronRight,
    User,
    Grid,
    Users,
    ClipboardList,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { useAuth } from "@/hooks/useAuth";

interface AdminSidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

const menuItems = [
    {
        title: "Manajemen User",
        href: "/admin",
        icon: Users,
        description: "Kelola User & Role"
    },
    {
        title: "Log Aktivitas",
        href: "/admin/logs",
        icon: ClipboardList,
        description: "Riwayat Audit"
    }
];

export default function AdminSidebar({ isCollapsed, onToggle }: AdminSidebarProps) {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [showConfirm, setShowConfirm] = React.useState(false);

    // Helper for Portal URL - same logic as Tabulasi but adapted
    const getPortalUrl = () => {
        if (typeof window !== 'undefined') {
            return `${window.location.origin}/aplikasi`;
        }
        return '/aplikasi';
    };

    const handleLogout = () => {
        logout();
        // window.location.href = '/'; // REMOVED: logout() already handles navigation to /api/auth/logout
    };

    return (
        <>
            <aside
                className={cn(
                    "fixed left-0 top-0 z-40 h-screen bg-white shadow-lg border-r border-slate-200 transition-all duration-300",
                    isCollapsed ? "w-16" : "w-[220px]"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-3 py-3">
                    {!isCollapsed && (
                        <Link
                            href="/"
                            className="flex items-center gap-2 group cursor-pointer"
                            title="Kembali ke Beranda Portal"
                        >
                            <div className="relative h-9 w-9 overflow-hidden rounded-lg shadow-md group-hover:scale-105 transition-transform">
                                <Image
                                    src="/images/logo-kemnaker.png"
                                    alt="Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <h1 className="text-xs font-bold text-[#153e70] group-hover:text-blue-700 transition-colors">
                                    Portal Admin
                                </h1>
                                <p className="text-[9px] text-slate-500">Manajemen Akun</p>
                            </div>
                        </Link>
                    )}

                    {isCollapsed && (
                        <Link
                            href="/"
                            className="mx-auto relative h-9 w-9 overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer block"
                            title="Kembali ke Beranda Portal"
                        >
                            <Image
                                src="/images/logo-kemnaker.png"
                                alt="Logo"
                                fill
                                className="object-contain"
                            />
                        </Link>
                    )}
                </div>

                {/* Toggle Button */}
                <button
                    onClick={onToggle}
                    className="absolute -right-3 top-16 z-50 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md transition-all hover:scale-110 border border-white"
                >
                    {isCollapsed ? (
                        <ChevronRight className="h-3 w-3" />
                    ) : (
                        <ChevronLeft className="h-3 w-3" />
                    )}
                </button>

                {/* Navigation */}
                <nav className="mt-4 px-2">
                    <ul className="space-y-0.5">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <li key={item.href}>
                                    <Link href={item.href}>
                                        <div
                                            className={cn(
                                                "group relative flex items-center gap-2 rounded-lg px-2 py-2 transition-all duration-200",
                                                isActive
                                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                                                    : "hover:bg-blue-50",
                                                isCollapsed && "justify-center"
                                            )}
                                        >
                                            {isActive && !isCollapsed && (
                                                <div className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r-full bg-white" />
                                            )}

                                            <Icon className={cn(
                                                "h-4 w-4 flex-shrink-0 transition-colors",
                                                isActive ? "text-white" : "text-slate-500 group-hover:text-blue-600"
                                            )} />

                                            {!isCollapsed && (
                                                <div className="overflow-hidden">
                                                    <p className={cn(
                                                        "text-xs font-medium whitespace-nowrap transition-colors",
                                                        isActive ? "text-white" : "text-slate-700 group-hover:text-blue-600"
                                                    )}>
                                                        {item.title}
                                                    </p>
                                                    <p className={cn(
                                                        "text-[10px] whitespace-nowrap",
                                                        isActive ? "text-blue-100" : "text-slate-400"
                                                    )}>
                                                        {item.description}
                                                    </p>
                                                </div>
                                            )}

                                            {isCollapsed && (
                                                <div className="absolute left-full ml-2 hidden rounded-md bg-slate-800 px-2 py-1.5 text-xs text-white shadow-lg group-hover:block z-50 whitespace-nowrap">
                                                    {item.title}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User Info Footer - MATCHING TABULASI STYLE EXACTLY */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                    {user ? (
                        <div className={cn(
                            "transition-all duration-300",
                            isCollapsed ? "px-2 py-3" : "px-3 py-3"
                        )}>
                            {/* Collapsed view */}
                            {isCollapsed ? (
                                <div className="relative group flex flex-col items-center gap-2">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                                        <span className="text-white text-sm font-bold">
                                            {user.name?.charAt(0).toUpperCase() || 'U'}
                                        </span>
                                    </div>
                                    {/* Tooltip on hover */}
                                    <div className="absolute left-full ml-2 bottom-0 hidden group-hover:block z-50 min-w-[150px]">
                                        <div className="bg-slate-800 text-white text-xs rounded-lg shadow-lg px-3 py-2">
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-slate-300 text-[10px] mt-0.5">
                                                {user.role}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="w-full h-px bg-slate-200 my-1" />

                                    {/* Back to Apps (Collapsed) */}
                                    <Link
                                        href={getPortalUrl()}
                                        className="p-1.5 rounded-lg hover:bg-blue-100 text-slate-400 hover:text-blue-600 transition-colors"
                                        title="Pilih Aplikasi Lain"
                                    >
                                        <Grid className="w-4 h-4" />
                                    </Link>

                                    {/* Logout button when collapsed */}
                                    <button
                                        onClick={() => setShowConfirm(true)}
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Keluar"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                /* Expanded view - full info */
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        {/* Avatar */}
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md flex-shrink-0">
                                            <span className="text-white text-sm font-bold">
                                                {user.name?.charAt(0).toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                        {/* User Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-slate-700 truncate">
                                                {user.name}
                                            </p>
                                            <p className="text-[10px] text-slate-400 truncate mb-1">
                                                {user.role}
                                            </p>
                                            {/* Role Badge */}
                                            <span className={cn(
                                                "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-medium",
                                                user.role === 'INTERNAL'
                                                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                                                    : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                                            )}>
                                                <User className="w-2.5 h-2.5" />
                                                {user.role === 'INTERNAL' ? 'Admin' : 'Satker'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions Row */}
                                    <div className="flex gap-2">
                                        <Link
                                            href={getPortalUrl()}
                                            className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors text-xs font-medium border border-blue-100"
                                            title="Kembali ke Daftar Aplikasi"
                                        >
                                            <Grid className="w-3.5 h-3.5" />
                                            Aplikasi
                                        </Link>
                                        <button
                                            onClick={() => setShowConfirm(true)}
                                            className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all text-xs font-bold shadow-sm"
                                        >
                                            <LogOut className="w-3.5 h-3.5" />
                                            Keluar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>
            </aside>

            {/* Logout Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setShowConfirm(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
                        <div className="text-center mb-6">
                            <div className="w-14 h-14 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                                <LogOut className="w-7 h-7 text-red-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">Konfirmasi Keluar</h3>
                            <p className="text-sm text-slate-500 mt-2">
                                Apakah Anda yakin ingin keluar dari sistem?
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                Ya, Keluar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
