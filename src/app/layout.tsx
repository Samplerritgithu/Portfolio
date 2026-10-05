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
  title: "Shiva Shankar Chanda | Full Stack Software Engineer · Python · Django",
  description:
    "Portfolio of Shiva Shankar Chanda — Full Stack Software Engineer specializing in Python, Django/DRF, React, Flutter, and cloud applications. Currently exploring AI, LLMs, and RAG.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "Python Developer",
    "Django",
    "Django REST Framework",
    "React",
    "React Native",
    "Flutter",
    "Next.js",
    "AWS",
    "Firebase",
  ],
  authors: [{ name: "Shiva Shankar Chanda" }],
  openGraph: {
    title: "Shiva Shankar Chanda | Full Stack Software Engineer · Python · Django",
    description:
      "Building Python-powered full-stack products across web, mobile & cloud. Currently exploring AI, LLMs and RAG.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-bg-deep font-sans text-text">{children}</body>
    </html>
  );
}
