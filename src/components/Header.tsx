'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, ChevronDown, Grid } from 'lucide-react';
import { useEffect, useState } from 'react';

import LoginModal from './LoginModal';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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
                {[
                  { id: 'hero', label: 'Beranda' },
                  { id: 'achievements', label: 'Pencapaian' },
                  { id: 'sebaran', label: 'Sebaran Aset' },
                  { id: 'performance', label: 'Kinerja' },
                  { id: 'analisis', label: 'Analisis' },
                  { id: 'info', label: 'Informasi' },
                  { id: 'berita', label: 'Berita' },
                  { id: 'galeri', label: 'Galeri' },
                  { id: 'filosofi-maskot', label: 'Filosofi Maskot', href: '/filosofi-maskot' },
                ].map((item) => (
                  item.href ? (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="block px-3 py-2.5 text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={item.id}
                      onClick={(e) => scrollToSection(item.id, e)}
                      href={`#${item.id}`}
                      className="block px-3 py-2.5 text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                    >
                      {item.label}
                    </a>
                  )
                ))}
              </div>
            </div>

            {/* Direct Page Links */}
            <Link
              href="/profil-satker"
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-[#153e70] hover:bg-white hover:shadow-sm rounded-full transition-all"
            >
              Profil Satker
            </Link>
            <Link
              href="/struktur"
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-[#153e70] hover:bg-white hover:shadow-sm rounded-full transition-all"
            >
              Struktur
            </Link>

            <div className="w-px h-4 bg-slate-200 mx-1"></div>

            {/* Layanan Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-slate-600 hover:text-[#153e70] hover:bg-white hover:shadow-sm rounded-full transition-all">
                Layanan
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute top-full right-0 mt-3 w-56 bg-white border border-slate-100 rounded-xl shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-right">
                <Link href="#" className="block px-3 py-2.5 text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors mb-1">
                  Monitoring Tiket BMN
                </Link>
                <Link href="#" className="block px-3 py-2.5 text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                  Monitoring PSP BMN
                </Link>
              </div>
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="hidden md:block text-xs font-bold text-[#153e70] hover:text-blue-600 px-3 py-2 transition-colors"
            >
              Masuk
            </button>

            <button className="hidden sm:flex items-center gap-2 bg-[#153e70] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md hover:shadow-lg hover:bg-blue-800 transition-all transform hover:-translate-y-0.5">
              <Grid className="w-3.5 h-3.5" />
              <span>Aplikasi</span>
            </button>

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
            {[
              { id: 'hero', label: 'Beranda' },
              { id: 'achievements', label: 'Pencapaian' },
              { id: 'sebaran', label: 'Sebaran Aset' },
              { id: 'performance', label: 'Kinerja' },
              { id: 'analisis', label: 'Analisis' },
              { id: 'info', label: 'Informasi' },
              { id: 'berita', label: 'Berita' },
              { id: 'galeri', label: 'Galeri' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  scrollToSection(item.id, e);
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#153e70] rounded-lg transition-colors"
              >
                {item.label}
              </a>
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

            <div className="grid grid-cols-2 gap-3 pt-3 mt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsLoginOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-center py-2.5 text-sm font-bold text-[#153e70] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Masuk
              </button>
              <button className="flex items-center justify-center gap-2 bg-[#153e70] text-white py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-blue-800 transition-colors">
                <Grid className="w-4 h-4" />
                <span>Aplikasi</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
