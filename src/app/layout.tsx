import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-syne",
  display: "swap",
});

const title = "TRUX Parking for Drivers | Secure Truck Parking";
const description =
  "Find safe, monitored truck parking with real-time availability, remote gate access, and support from TRUX.";

export const metadata: Metadata = {
  metadataBase: new URL("https://truxparking.com"),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syne.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
