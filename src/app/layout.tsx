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
  title: "Surya's Cookware — Traditional Iron Cookware",
  description: "Handcrafted iron cookware forged with tradition. Dosa pans, tawas, kadhais, woks and more.",
  icons: {
    icon: "/suryas-cookware-logo.png",
    shortcut: "/suryas-cookware-logo.png",
    apple: "/suryas-cookware-logo.png",
  },
  openGraph: {
    title: "Surya's Cookware — Traditional Iron Cookware",
    description: "Handcrafted iron cookware forged with tradition.",
    url: "https://suryascookware.com",
    siteName: "Surya's Cookware",
    images: [
      { url: "/images/hero-bg.jpg", width: 1200, height: 630, alt: "Surya's Cookware" },
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
