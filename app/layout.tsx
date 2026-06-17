import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://syed-nazmus-sakib.github.io/DiagnostIQ";

export const metadata: Metadata = {
  title: "DiagnostIQ — Autonomous Radiology Reporting for Bangladesh",
  description:
    "University of Dhaka research preview: a four-stage AI pipeline that classifies chest X-ray findings, segments the affected region, generates a structured report, and verifies it with a multi-agent council before radiologist sign-off.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "DiagnostIQ — Autonomous Radiology Reporting for Bangladesh",
    description:
      "Classification → Region Detection → Report Generation → Multi-Agent Verification. Built at Cortex AI Lab, University of Dhaka.",
    type: "website",
    locale: "en_BD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
