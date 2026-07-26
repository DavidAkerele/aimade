import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PipelineContextProvider } from "@/context/PipelineContext";
import { AppContextProvider } from "@/context/AppContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0A2540",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aimade-pipeline.vercel.app"),
  title: {
    default: "Aimade — Events & Equipment Rentals | Culinary Food Catering",
    template: "%s | Aimade Ecosystem",
  },
  description:
    "Configure 20x20ft canopy rentals, Chiavari chairs, 100L/200L cooking drums & authentic Nigerian firewood Jollof, Afang soup, Ayamasi stew with instant WhatsApp quotes.",
  keywords: [
    "Aimade",
    "Aimade Events",
    "Aimade Flavors",
    "Event Canopy Rental Lagos",
    "Chiavari Chairs Rental",
    "100L Cooking Drum Rental",
    "Nigerian Catering Service",
    "Firewood Jollof Rice Bulk",
    "Afang Soup Catering",
    "Ayamasi Stew",
  ],
  authors: [{ name: "Aimade Team" }],
  creator: "Aimade Ecosystem",
  publisher: "Aimade Ecosystem",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Open Graph / WhatsApp / Facebook Unfurl Metadata
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://aimade-pipeline.vercel.app",
    siteName: "Aimade Ecosystem",
    title: "Aimade — Events & Equipment Rentals | Culinary Food Catering",
    description:
      "Rent 20x20ft canopies, Chiavari chairs, 100L cooking drums & order firewood Jollof rice, Afang soup, Ayamasi stew with instant WhatsApp receipts.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Aimade Events & Culinary Catering Ecosystem",
      },
    ],
  },

  // Twitter / X Card Metadata
  twitter: {
    card: "summary_large_image",
    title: "Aimade — Events & Equipment Rentals | Culinary Food Catering",
    description:
      "Rent 20x20ft canopies, Chiavari chairs, 100L cooking drums & order firewood Jollof rice, Afang soup, Ayamasi stew with instant WhatsApp receipts.",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&h=630&q=80",
    ],
  },

  // Icons & Favicon
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Fallback explicit meta tags for WhatsApp & iMessage link unfurling */}
        <meta property="og:site_name" content="Aimade Ecosystem" />
        <meta property="og:title" content="Aimade — Events & Equipment Rentals | Culinary Food Catering" />
        <meta
          property="og:description"
          content="Rent 20x20ft canopies, Chiavari chairs, 100L cooking drums & order firewood Jollof rice, Afang soup, Ayamasi stew with instant WhatsApp receipts."
        />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&h=630&q=80" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://aimade-pipeline.vercel.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} antialiased bg-[#FAFAFC] text-neutral-900 overflow-x-hidden`}
      >
        <AppContextProvider>
          <PipelineContextProvider>{children}</PipelineContextProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
