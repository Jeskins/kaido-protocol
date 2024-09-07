"use client";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Layout from "@/components/sections/layout";
import { BalanceProvider } from "@/components/sections/context";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          disableTransitionOnChange
          defaultTheme="dark"
        >
          <BalanceProvider>
            <Layout>
              <Toaster />
              <ThemeSwitcher />
              {children}
            </Layout>
          </BalanceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
