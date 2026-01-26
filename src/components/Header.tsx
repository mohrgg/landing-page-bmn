'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, LogIn, ChevronDown, LogOut, Grid } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import LoginModal from './LoginModal';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();
  const { user, refreshAuth, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    router.push('/');
    router.refresh();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil Satker', href: '/profil-satker' },
    { name: 'Struktur', href: '/struktur' },
    { name: 'Berita', href: '/berita' },
    { name: 'Filosofi Maskot', href: '/filosofi-maskot' },
  ];

  const homePageSections = [
    { label: 'Beranda', href: '/' },
    { label: 'Pencapaian', href: '/#achievements' },
    { label: 'Sebaran Aset', href: '/#sebaran' },
    { label: 'Kinerja', href: '/#performance' },
    { label: 'Analisis', href: '/#analisis' },
    { label: 'Berita', href: '/#berita' },
    { label: 'Galeri', href: '/#galeri' },
  ];

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100 py-2'
          : 'bg-white border-b border-transparent py-4'
          }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo Section - Clean & Spacious */}
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-48 h-12 transition-transform group-hover:scale-105">
                <Image
                  src="/images/logo-kemnaker-tulisan.png"
                  alt="Logo Kemnaker"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Subtle Divider */}
            <div className="hidden md:block h-6 w-px bg-slate-200"></div>

            {/* BMN Identity - Minimalist */}
            <div className="hidden md:flex flex-col justify-center">
              <span className="text-sm font-extrabold text-[#153e70] tracking-tight leading-none">BMN</span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide">PORTAL ASET</span>
            </div>
          </div>

          {/* Navigation Desktop - Kemenkeu Style */}
          <nav className="hidden lg:flex items-center bg-slate-50/50 rounded-full px-2 py-1 border border-slate-100">
            {/* Beranda Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-slate-600 hover:text-[#153e70] hover:bg-white hover:shadow-sm rounded-full transition-all">
                Beranda
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute top-full left-0 mt-3 w-48 bg-white border border-slate-100 rounded-xl shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-left">
                {homePageSections.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Direct Page Links */}
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-[#153e70] hover:bg-white hover:shadow-sm rounded-full transition-all"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Aplikasi Button - Always visible for discoverability */}
            <Link
              href="/aplikasi"
              className="hidden sm:flex items-center gap-2 bg-[#153e70] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md hover:shadow-lg hover:bg-blue-800 transition-all transform hover:-translate-y-0.5"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Aplikasi</span>
            </Link>

            {user ? (
              <>
                {/* User Info - Cleaner Pill Style */}
                <div className="hidden md:flex items-center gap-3 bg-slate-50 rounded-full pl-3 pr-1 py-1 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#153e70] to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#153e70] leading-tight">{user.name}</span>
                      <span className="text-[10px] text-slate-500 leading-tight">{user.role}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Keluar"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="hidden md:flex items-center gap-2 bg-[#153e70] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-sm hover:shadow-md hover:bg-blue-800 transition-all transform hover:-translate-y-0.5"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk Portal</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col p-4 space-y-2">
            {/* Homepage Sections */}
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 pt-2">Beranda</div>
            {homePageSections.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#153e70] rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {/* Direct Page Links */}
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 pt-4 border-t border-slate-100 mt-2">Halaman</div>
            <Link
              href="/profil-satker"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#153e70] rounded-lg transition-colors"
            >
              Profil Satker
            </Link>
            <Link
              href="/struktur"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#153e70] rounded-lg transition-colors"
            >
              Struktur Organisasi
            </Link>
            <Link
              href="/berita"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#153e70] rounded-lg transition-colors"
            >
              Semua Berita
            </Link>
            <Link
              href="/filosofi-maskot"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#153e70] rounded-lg transition-colors"
            >
              Filosofi Maskot
            </Link>

            <div className="grid grid-cols-2 gap-3 pt-3 mt-2 border-t border-slate-100">
              {user ? (
                <>
                  <button
                    onClick={() => {
                      setShowLogoutConfirm(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </button>
                  <Link
                    href="http://monitoring.bmn.local:3001"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 bg-[#153e70] text-white py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-blue-800 transition-colors"
                  >
                    <Grid className="w-4 h-4" />
                    <span>Aplikasi</span>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsLoginOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="col-span-2 text-center py-2.5 text-sm font-bold text-[#153e70] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Masuk
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
            onClick={() => setShowLogoutConfirm(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[70] p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm pointer-events-auto animate-in zoom-in-95 duration-200">
              <div className="text-center mb-5">
                <div className="w-14 h-14 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <LogOut className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Konfirmasi Keluar</h3>
                <p className="text-sm text-slate-500 mt-1">Apakah Anda yakin ingin keluar dari sistem?</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors"
                >
                  Ya, Keluar
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(userData) => {
          refreshAuth();
          setIsLoginOpen(false);
          router.refresh();
          router.push('/aplikasi');
        }}
      />
    </>
  );
}
