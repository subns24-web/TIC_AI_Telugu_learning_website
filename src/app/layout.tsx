import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Telugu } from "next/font/google";
import { LangProvider } from "@/lib/lang";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ServiceWorker } from "@/components/site/ServiceWorker";
import { InstallPrompt } from "@/components/site/InstallPrompt";
import { Splash } from "@/components/site/Splash";
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
  manifest: "/manifest.webmanifest",
  applicationName: "TIC AI",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    title: "TIC AI",
    // Translucent lets the page's own ink header run under the status bar.
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Never block zoom — people enlarge Telugu text, and locking it out is an
  // accessibility failure, not a polish win.
  maximumScale: 5,
  userScalable: true,
  // Lets content reach under the notch; padding comes from safe-area insets.
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0e1527" },
    { media: "(prefers-color-scheme: dark)", color: "#080d1a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="te" className={`${inter.variable} ${telugu.variable}`}>
      <body className="min-h-dvh flex flex-col">
        <Splash />
        <LangProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <InstallPrompt />
          <ServiceWorker />
        </LangProvider>
      </body>
    </html>
  );
}
