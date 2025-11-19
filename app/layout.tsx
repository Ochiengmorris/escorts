import type { Metadata } from "next";
import { Geist, Geist_Mono, Cookie } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { images } from "@/images/images";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cookie = Cookie({
  weight: "400",
  variable: "--font-cookie",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Escorts",
  description: "Escorts | Find the best escorts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cookie.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black font-sans w-full">
          <div className="sticky top-0 z-20 bg-zinc-50 dark:bg-black flex w-full border-b border-b-primary/50">
            <div className="max-w-7xl mx-auto w-full border-x border-x-primary/50">
              <Header />
            </div>
          </div>
          <div className="flex flex-col flex-1 w-full relative">
            {/* Sticky image container - removed absolute positioning */}
            <div className="absolute top-30 -left-25 opacity-5 z-0 pointer-events-none">
              <Image
                src={images.Silhoute5}
                alt="Silhoute1"
                height={500}
                width={500}
                className="object-cover"
              />
            </div>
            <div className="fixed top-30 -right-25 opacity-5 z-0 pointer-events-none">
              <Image
                src={images.Silhoute4}
                alt="Silhoute1"
                height={500}
                width={500}
                className="object-cover"
              />
            </div>
            <div className="max-w-7xl flex flex-col mx-auto border-x border-x-primary/50 w-full relative z-10">
              <main>{children}</main>
            </div>
          </div>
          <div className="flex w-full border-t border-t-primary/50">
            <div className="max-w-7xl flex flex-col mx-auto border-x border-x-primary/50 w-full">
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
