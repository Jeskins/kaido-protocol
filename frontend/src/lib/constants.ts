import { arbitrumSepolia } from "viem/chains";
import { educhainTestnet } from "./config";

export const COINMARKETCAP_IDS: Record<string, number> = {
  link: 1975,
  usdc: 3408,
  usdt: 825,
  eth: 1027,
  edu: 24613,
  dai: 825,
  weth: 2396,
};
//hello
export const supportedcoins: Record<string, any> = {
  eth: {
    name: "Test Arbitrum Etherem",
    symbol: "tETH",
    image: "/coins/arbitrum.png",
  },
  weth: {
    name: "Test Wrapped Ethereum",
    symbol: "tWETH",
    image: "/coins/weth.png",
  },
  link: {
    name: "Test Chain Link ",
    symbol: "tLINK",
    image: "/coins/link.png",
  },
  usdc: {
    name: "Test USD Stablecoin",
    symbol: "tUSDC",
    image: "/coins/usdc.png",
  },
  usdt: {
    name: "Test Tether USD",
    symbol: "tUSDT",
    image: "/coins/usdt.png",
  },
  dai: {
    name: "Test Dai",
    symbol: "tDAI",
    image: "/coins/dai.png",
  },
};

export const supportedchains: Record<string, any> = {
  [arbitrumSepolia.id]: {
    id: 1,
    name: "Arbitrum Sepolia",
    chainId: arbitrumSepolia.id,
    symbol: "ETH",
    image: "/coins/arbitrum.png",
    explorer: "https://sepolia.arbiscan.io/",
    poolFactory: "",
    tokens: {
      usdt: "",
      link: "",
      usdc: "",
      dai: "",
      weth: "",
    },
    pools: {
      usdcweth: "",
      linkweth: "",
      usdtweth: "",
      daiweth: "",
      usdclink: "",
      usdcusdt: "",
      daiusdc: "",
      linkusdt: "",
      dailink: "",
      daiusdt: "",
    },
  },
};
