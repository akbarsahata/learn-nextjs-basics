import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BackToHomeButton } from "./lib/ui/back-to-home-button";
import ProgressProvider from "./lib/ui/progress-provider";
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
  title: "Stronk web app",
  description: "Example for revou short course",
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
        <ProgressProvider>
          <>
            <BackToHomeButton />
            {children}
          </>
        </ProgressProvider>
      </body>
    </html>
  );
}
