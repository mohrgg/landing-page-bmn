import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cintai Aset Negara | Kementerian Ketenagakerjaan RI",
  description: "Portal informasi Barang Milik Negara (BMN) Kementerian Ketenagakerjaan Republik Indonesia. Menyediakan data dan informasi mengenai pengelolaan aset negara secara transparan dan akuntabel.",
  keywords: ["BMN", "Barang Milik Negara", "Kementerian Ketenagakerjaan", "Kemnaker", "Aset Negara", "PSP"],
  authors: [{ name: "Kementerian Ketenagakerjaan RI" }],
  openGraph: {
    title: "Cintai Aset Negara | Kementerian Ketenagakerjaan RI",
    description: "Portal informasi Barang Milik Negara (BMN) Kementerian Ketenagakerjaan Republik Indonesia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
