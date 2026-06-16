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

export const metadata: Metadata = {
  title: "DiagnostIQ — Autonomous Radiology Reporting",
  description:
    "DiagnostIQ is a three-stage AI pipeline that classifies abnormalities, segments the affected region, and generates a structured radiology report.",
  metadataBase: new URL("https://diagnostiq.ai"),
  openGraph: {
    title: "DiagnostIQ — Autonomous Radiology Reporting",
    description:
      "Classification → Region Detection → Report Generation. A research-grade radiology reporting pipeline.",
    type: "website",
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
