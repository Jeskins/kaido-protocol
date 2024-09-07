"use client";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { XMTPProvider } from "@xmtp/react-sdk";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Layout from "@/components/sections/layout";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/config";
import { BalanceProvider } from "@/components/sections/context";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { arbitrumSepolia } from "viem/chains";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
const queryClient = new QueryClient();

createWeb3Modal({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  wagmiConfig: config,
  defaultChain: arbitrumSepolia,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <XMTPProvider>
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
        </XMTPProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
