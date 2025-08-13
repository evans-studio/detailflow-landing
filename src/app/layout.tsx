import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { MobileNav } from "../components/MobileNav";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://admin.detailor.co.uk';
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://detailor.co.uk'),
  title: "Detailor — White-Label Booking Platform for Mobile Service Businesses",
  description: "The complete booking, scheduling, and payment platform for mobile service businesses. White-label solution with automated workflows, real-time updates, and seamless customer experience.",
  keywords: "mobile service booking, white-label platform, service business software, scheduling app, payment processing, booking system",
  openGraph: {
    title: "Detailor — White-Label Booking Platform for Mobile Service Businesses",
    description: "The complete booking, scheduling, and payment platform for mobile service businesses. White-label solution with automated workflows, real-time updates, and seamless customer experience.",
    url: "https://detailor.co.uk/",
    siteName: "Detailor",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Detailor - White-Label Booking Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Detailor — White-Label Booking Platform for Mobile Service Businesses",
    description: "The complete booking, scheduling, and payment platform for mobile service businesses.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-[var(--df-bg)] text-[var(--df-fg)]`}>
        <header className="relative md:sticky md:top-0 md:z-40 h-16 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
          <div className="mx-auto max-w-[1280px] h-full px-6 lg:px-8 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--detailor-blue)] to-[var(--color-primary-600)] rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-105">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="detailor-logo-text text-xl">Detailor</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="nav-item text-gray-600 hover:text-[var(--detailor-blue)] transition-colors duration-300 font-medium">Features</a>
              <a href="#pricing" className="nav-item text-gray-600 hover:text-[var(--detailor-blue)] transition-colors duration-300 font-medium">Pricing</a>
              <a href="#faq" className="nav-item text-gray-600 hover:text-[var(--detailor-blue)] transition-colors duration-300 font-medium">FAQ</a>
            </nav>
            <div className="hidden md:flex items-center gap-3">
              <a 
                href={`${appUrl}/signin`} 
                className="h-12 px-4 rounded-lg border-2 detailor-accent-border detailor-logo-text flex items-center justify-center hover:bg-blue-50 transition-all duration-200 hover:scale-[1.02] enterprise-lift"
              >
                Sign in
              </a>
              <a 
                href="#pricing" 
                className="detailor-cta-button h-12 px-4 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-lg enterprise-lift"
              >
                Start Free Trial
              </a>
            </div>
            <MobileNav />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
