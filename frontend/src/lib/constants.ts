import { kinto } from "./config";

export const COINMARKETCAP_IDS: Record<string, number> = {
  link: 1975,
  usdc: 3408,
  usdt: 825,
  eth: 1027,
  weth: 2396,
};

export const supportedcoins: Record<string, any> = {
  eth: {
    name: "Kinto Ethereum",
    symbol: "ETH",
    image: "/coins/kinto.png",
  },
  weth: {
    name: "Wrapped Ethereum",
    symbol: "WETH",
    image: "/coins/weth.png",
  },
  link: {
    name: "Chain Link",
    symbol: "LINK",
    image: "/coins/link.png",
  },
  usdc: {
    name: "USD Stablecoin",
    symbol: "USDC",
    image: "/coins/usdc.png",
  },
  usdt: {
    name: "Tether USD",
    symbol: "USDT",
    image: "/coins/usdt.png",
  },
};

export const kintoInfo = {
  name: "Kinto Mainnet",
  chainId: kinto.id,
  symbol: "ETH",
  image: "/coins/kinto.png",
  explorer: "https://sepolia.arbiscan.io/",
  tokens: {
    usdc: "0x06e2dde9E1fb7F37b5E5a765DB7f7F8ee084599d",
    usdt: "0xA1F63668D823E65e641DDD91cAB184dc3038eBE3",
    link: "0x56a119a31387b1F2d97a363060b73F9A4Ce73E38",
    weth: "0x301788D0CCA42C46c2742CDa8daDD079a2752C68",
  },
  poolFactory: "0xb42b19E1942a4AA52c91c91a9f351059395Ee301",
  pools: {
    wethusdc: "0x53057b7f19504232e6ebcb63584c1d46cfe5b034",
    wethlink: "0x2eaf163cadafa6abe3ff7ef8d7a478d4fd725336",
    wethusdt: "0x7eb0df5e403a8bd9cfde8f71ee6d2840c7dcc9be",
    usdclink: "0x878741db4b69f20b5078de788bd4d48db4eaa9cf",
    usdcusdt: "0x7ef66e825753f2db43b95b83a59456fb61178155",
    usdtlink: "0x8307b35db1454f3d84308870c3fec739594dac9d",
  },
};
