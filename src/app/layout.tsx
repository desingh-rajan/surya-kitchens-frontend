import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Surya Kitchens — Traditional Iron Cookware",
  description: "Handcrafted iron cookware forged with tradition. Dosa pans, tawas, kadhais, woks and more.",
  icons: {
    icon: "/surya-logo.jpeg",
    shortcut: "/surya-logo.jpeg",
    apple: "/surya-logo.jpeg",
  },
  openGraph: {
    title: "Surya Kitchens — Traditional Iron Cookware",
    description: "Handcrafted iron cookware forged with tradition.",
    url: "https://example.com",
    siteName: "Surya Kitchens",
    images: [
      { url: "/images/hero-bg.jpg", width: 1200, height: 630, alt: "Surya Kitchens" },
    ],
    locale: "en_IN",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
