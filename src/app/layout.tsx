import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Aimade — Dynamic Events & Catering Pipeline",
  description: "Configure equipment rentals & authentic culinary catering orders with real-time quotes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
