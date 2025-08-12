import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
        <header className="relative md:sticky md:top-0 md:z-40 h-16 bg-white border-b border-gray-100">
          <div className="mx-auto max-w-[1280px] h-full px-6 lg:px-8 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="h-7 inline-block font-semibold text-gray-900">Detailor</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors duration-500">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors duration-500">Pricing</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors duration-500">FAQ</a>
            </nav>
            <div className="hidden md:flex items-center gap-3">
              <a href="/signin" className="h-12 px-4 rounded-lg border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02]">Sign in</a>
              <a href="#pricing" className="h-12 px-4 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-md">Start Free Trial</a>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
