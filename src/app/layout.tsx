import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import SearchOverlay from "@/components/SearchOverlay";
import MenuOverlay from "@/components/MenuOverlay";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUMOS | High Fidelity Audio & Vision",
  description: "Experience the future of sensory technology. Shop the Drop 01 collection featuring Lumos Max and Beam Pro.",
  keywords: ["Lumos", "Audio", "Vision", "Tech", "Luxury", "Headphones", "VR"],
  openGraph: {
    title: "LUMOS | Drop 01 Live",
    description: "High Fidelity Audio & Vision. Future Tech. Est 2026.",
    url: "https://lumos-puce.vercel.app/", // (Optional: Put your real Vercel link here if you want)
    siteName: "LUMOS",
    locale: "en_UK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMOS | Drop 01",
    description: "High Fidelity Audio & Vision.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <SmoothScroll /> {/* Enable smooth scrolling */}
          <SearchOverlay /> {/* Search Overlay Component */}
          <MenuOverlay /> {/* Menu Overlay Component */}
        {children}
      </body>
    </html>
  );
}
