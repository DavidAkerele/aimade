import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { QuoteDrawer } from "@/components/QuoteDrawer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aimade — Interactive Service, Quote & Paystack Pipeline",
  description: "Streamlined interactive questionnaire for Aimade Events equipment rentals, culinary catering, and Care Foundation sponsorship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
        <AppContextProvider>
          <main className="flex-1 w-full min-h-screen">{children}</main>
          <QuoteDrawer />
        </AppContextProvider>
      </body>
    </html>
  );
}
