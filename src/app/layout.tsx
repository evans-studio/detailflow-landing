import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MobileNav } from "@/components/MobileNav";
import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DetailFlow — Simple detailing business software",
  description: "Grow your detailing business with online bookings, payments and messaging.",
  openGraph: {
    title: "DetailFlow",
    description: "Grow your detailing business with online bookings, payments and messaging.",
    url: "https://detailflow-landing.vercel.app/",
    siteName: "DetailFlow",
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
        <header className="sticky top-0 z-40 h-16 bg-white border-b border-gray-100">
          <div className="mx-auto max-w-[1280px] h-full px-6 lg:px-8 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="h-7 inline-block font-semibold text-gray-900">DetailFlow</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors duration-500">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors duration-500">Pricing</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors duration-500">FAQ</a>
            </nav>
            <div className="hidden md:flex items-center gap-3">
              <a href="/signin" className="h-10 px-4 rounded-lg border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-50 transition">Sign in</a>
              <a href="#pricing" className="h-10 px-4 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition">Start Free Trial</a>
            </div>
            <MobileNav />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
