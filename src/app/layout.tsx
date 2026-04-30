import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andhika Guntur | Fullstack Developer Portfolio",
  description: "Personal developer portfolio of Andhika Guntur, focusing on modern web technologies.",
};

import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import { LoadingProvider } from "@/context/LoadingContext";
import FloatingChat from "@/components/layout/FloatingChat";
import LoadingBar from "@/components/layout/LoadingBar";
import Preloader from "@/components/shared/Preloader";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased font-sans bg-muted/30 text-foreground transition-colors duration-300`}
      >
        <LoadingProvider>
          <ThemeProvider>
            <Suspense fallback={null}>
              <LoadingBar />
            </Suspense>
            <Preloader />
            <FloatingChat />
            <div className="flex flex-col min-h-screen">
              {/* Navigation */}
              <Navbar />

              {/* Main Content Area */}
              <main className="flex-1 w-full min-h-screen p-4 md:p-8 lg:px-12 flex flex-col items-center pt-24 lg:pt-32 pb-12">
                {/* Document/Paper Container */}
                <div className="w-full max-w-[1400px] min-h-[calc(100vh-10rem)] bg-background border border-border/50 shadow-2xl shadow-foreground/5 rounded-3xl overflow-hidden relative">
                  {/* Subtle Paper Texture Overlay (optional via CSS) */}
                  <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-[0.03] dark:opacity-[0.05]" />

                  {/* Content */}
                  <div className="relative z-10 p-6 md:p-10 lg:p-16">
                    {children}
                  </div>

                  {/* Document Footer/Branding (optional) */}
                  <div className="border-t border-border/50 p-6 flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-widest bg-muted/5">
                    <span>Antigravity Portfolio 2026</span>
                    <span>Property of developer</span>
                  </div>
                </div>
              </main>
            </div>
          </ThemeProvider>
        </LoadingProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
