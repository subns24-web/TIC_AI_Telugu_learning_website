import type { Metadata } from "next";
import { Inter, Noto_Sans_Telugu } from "next/font/google";
import { LangProvider } from "@/lib/lang";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const telugu = Noto_Sans_Telugu({
  subsets: ["telugu", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-telugu",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TIC AI — Telugu International Council of AI for Business",
    template: "%s · TIC AI",
  },
  description:
    "Learn AI for business in Telugu. Courses, live webinar recordings and workflows from the Telugu International Council of AI for Business.",
  keywords: [
    "AI in Telugu",
    "Telugu AI course",
    "AI for business Telugu",
    "TIC AI",
    "AI training Hyderabad",
    "AI training Vijayawada",
  ],
  openGraph: {
    title: "TIC AI — AI for Business, in Telugu",
    description:
      "The Telugu-first learning platform for AI in business. Courses, recordings and templates you can use the same day.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="te" className={`${inter.variable} ${telugu.variable}`}>
      <body className="min-h-dvh flex flex-col">
        <LangProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
