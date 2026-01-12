# Portal BMN Kemnaker - Landing Page

**Portal Resmi Informasi Barang Milik Negara (BMN) Kementerian Ketenagakerjaan RI**

Aplikasi ini adalah *landing page* modern yang dirancang untuk memberikan transparansi dan informasi publik terkait pengelolaan aset negara (BMN) di lingkungan Kemnaker. Dibangun dengan fokus pada desain premium ("The Visionary"), interaktivitas, dan performa tinggi.

![Hero Preview](/Users/rifqiardhani/.gemini/antigravity/brain/53429ccb-a419-43e4-beea-8eab823741ce/hero_animated_final_1766561053792.png)

## 📌 Ringkasan Proyek (Overview)

Tujuan utama aplikasi ini adalah mengubah data BMN yang kompleks menjadi visualisasi yang menarik dan mudah dipahami oleh publik maupun pegawai internal.

**Fitur Utama:**
*   **Hero Section "Visionary"**: Tampilan awal yang megah dengan tipografi *bold*, animasi *staggered reveal*, dan navigasi *glassmorphism*.
*   **Pencapaian (Achievements)**: Timeline interaktif yang menampilkan prestasi "Opini BPK (WTP)" 5 tahun berturut-turut dan tren kenaikan Indeks Pengelolaan Aset (IPA).
*   **Kinerja Aset (Performance)**: Visualisasi data kinerja pengelolaan BMN meliputi Sertipikasi, PSP, Asuransi, dan SBSK menggunakan grafik *radial* dan *pie chart* yang responsif.
*   **Peta Interaktif Indonesia**: Visualisasi SVG interaktif yang menampilkan sebaran aset di berbagai Satuan Kerja (Satker) daerah.
*   **Analisis Efisiensi (Dashboard)**: Grafik interaktif (Bar Chart & Tabel) untuk memantau indikator belanja modal, efisiensi aset, dan PNBP (Penerimaan Negara Bukan Pajak).
*   **Sekilas Info (Bento Grid)**: Penyajian informasi kartu (Cards) yang responsif berisi skor IPA, penggunaan aset, asuransi, peraturan, dan kompetensi SDM.
*   **Responsif Mobile & Tablet**: Optimalisasi tampilan untuk layar kecil, termasuk menu navigasi *mobile drawer* dan *scrollable timeline*.
*   **Animasi Global**: Pengalaman pengguna yang halus dengan efek *fade-in* dan *slide-up* saat digulir (Scroll-Triggered Animations).
*   **Login Modal**: Akses masuk untuk pegawai dengan antarmuka modern.

## 🛠 Spesifikasi Teknis (Tech Stack)

Aplikasi ini dibangun menggunakan teknologi *web development* terkini untuk menjamin kecepatan, skalabilitas, dan kemudahan perawatan (maintainability).

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15 (App Router)** | Framework React modern untuk *Server-Side Rendering* (SSR) dan performa optimal. |
| **Language** | **TypeScript** | Menjamin keamanan tipe data (*type safety*) dan mengurangi bug. |
| **Styling** | **Tailwind CSS v4** | *Utility-first CSS* versi terbaru dengan variabel CSS native untuk tema warna yang konsisten. |
| **Animation** | **Framer Motion** | Library animasi *production-ready* untuk transisi UI yang kompleks (Hero, Scroll Reveal, Modal). |
| **Charts** | **Recharts** | Visualisasi data grafik yang ringan dan kustomisable (React-based). |
| **Icons** | **Lucide React** | Set ikon yang bersih dan konsisten. |

## 🎨 Desain Sistem & Tema

*   **Tema Warna**: "Modern Clean" - Paduan Putih Bersih, *Navy Blue* (Kementerian), dan *Gold/Yellow Accents* (Elemen Puncak).
*   **Tipografi**: Menggunakan font sans-serif modern (`Geits` / System Font) dengan skala tipografi yang besar untuk keterbacaan (Readability).
*   **UX Pattern**: *Bento Grid Layout* untuk informasi padat, *Split Layout* untuk Hero Section, dan *Floating Glass Navigation*.

## 🚀 Cara Menjalankan (Development)

Pastikan Node.js sudah terinstal (disarankan v18+).

1.  **Clone Repository**
    ```bash
    git clone https://your-repo-url.git
    cd landing-page-bmn
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Jalankan Server Development**
    ```bash
    npm run dev
    ```

4.  Buka browser di `http://localhost:3000`.

## 📁 Struktur Folder Penting

*   `src/app`: Halaman utama (*routes*) dan layout global (`layout.tsx`, `page.tsx`).
*   `src/components`: Komponen UI modular.
    *   `HeroSection.tsx`: Bagian atas utama.
    *   `AchievementsSection.tsx`: Timeline Opini BPK & IPA.
    *   `IndonesiaMap.tsx`: Logika peta SVG.
    *   `PerformanceSection.tsx`: Grafik Kinerja Aset.
    *   `EfficiencySection.tsx`: Grafik Recharts.
    *   `InfoSection.tsx`: Grid informasi (Bento).
    *   `Header.tsx`: Navigasi responsif (Desktop & Mobile).
    *   `ui/RevealOnScroll.tsx`: *Utility* pembungkus animasi.
*   `public/images`: Aset gambar statis.

---
© 2025 Biro Keuangan dan BMN - Kementerian Ketenagakerjaan RI
