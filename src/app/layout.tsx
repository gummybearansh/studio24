import type { Metadata, Viewport } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";

const display = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF6EF",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ship24.tech"),
  title: {
    default: "Studio24 - Landing Pages That Convert",
    template: "%s - Studio24",
  },
  description:
    "Studio24 designs and ships landing pages that convert in 24 hours. $1000 flat. Custom Next.js build, zero templates. Book your build today.",
  keywords: ["landing pages", "web design", "next.js", "conversion", "studio24"],
  authors: [{ name: "Studio24" }],
  creator: "Studio24",
  publisher: "Studio24",
  robots: "index, follow",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ship24.tech",
    title: "Studio24 - Landing Pages That Convert",
    description:
      "Custom landing pages that convert, delivered in 24 hours. $1000 flat. Zero templates.",
    siteName: "Studio24",
    images: [{ url: "/pricing-main.png", width: 1408, height: 768, alt: "Studio24 - landing pages that convert" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio24 - Landing Pages That Convert",
    description:
      "Custom landing pages that convert, delivered in 24 hours. $1000 flat. Zero templates.",
    images: ["/pricing-main.png"],
  },
  alternates: { canonical: "https://ship24.tech" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#FAF6EF] text-[#1C1A17] font-[family-name:var(--font-display)] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
