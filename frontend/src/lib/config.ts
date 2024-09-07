import { defineChain } from "viem";
export const kinto = defineChain({
  id: 7887,
  name: "Kinto",
  network: "kinto",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.kinto-rpc.com/"],
      webSocket: ["wss://rpc.kinto.xyz/ws"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://kintoscan.io" },
  },
});

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

export const metadata = {
  name: "Kaido Protocol",
  description: "Defi, for the new Degens",
  url: "https://kaido-protocol.vercel.app", // origin must match your domain & subdomain
  icons: ["https://kaido-protocol.vercel.app/logo.png"],
};

// Create wagmiConfig
const chains = [arbitrumSepolia] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  auth: {
    email: false, // default to true
    socials: ["farcaster"],
    showWallets: true, // default to true
    walletFeatures: true, // default to true
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
});
