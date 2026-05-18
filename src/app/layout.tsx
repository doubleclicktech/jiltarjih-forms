import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "أكاديمية جيل ترجيح",
  description:
    "بوابة أكاديمية جيل ترجيح للتأهيل القيادي والمشاريع والفرق والتسجيل.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${cairo.variable} ${tajawal.variable} relative antialiased font-body-md text-body-md`}
      >
        <div className="relative min-h-screen flex flex-col bg-background text-on-surface">
          <Header />
          <main className="pt-16 flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
