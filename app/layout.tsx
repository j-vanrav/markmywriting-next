import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import { Inter, Nunito } from "next/font/google";

import { cn } from "@/lib/utils";
import TailwindIndicator from "@/components/tailwind-indicator";
import { TooltipProvider } from "@/components/ui/tooltip";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontNunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "BJJ Online",
  description: "The online BJJ technique repository",
  authors: [{ url: "https://blog.jvr.app", name: "James Van Ravestein" }],
  openGraph: {
    type: "website",
    title: "BJJ Online",
    description: "The online BJJ technique repository",
    siteName: "BJJ Online",
    images: [{ url: "https://elo-bjj.jvr.app/opengraph-image.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar">
      <body
        className={cn(
          "min-h-svh bg-background font-nunito antialiased",
          fontNunito.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            {children}
            <TailwindIndicator />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
