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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--df-bg)] text-[var(--df-fg)]`}>
        {children}
      </body>
    </html>
  );
}
