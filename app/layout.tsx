import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import { Inter, Nunito } from "next/font/google";

import { cn } from "@/lib/utils";
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
  title: "MarkMyWriting",
  description: "Mark your writing with AI.",
  authors: [{ url: "https://blog.jvr.app", name: "James Van Ravestein" }],
  openGraph: {
    type: "website",
    title: "MarkMyWriting",
    description: "Mark your writing with AI.",
    siteName: "MarkMyWriting",
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
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
