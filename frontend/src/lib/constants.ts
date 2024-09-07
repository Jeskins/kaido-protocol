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
  ethDeposit: "0x4A9fcE4Bb6A7BE057454F0D1A3Eab64A337532BB",
  poolFactory: "0xeD7B819cde5C9aE1BC529268e9aebb370bc5B84a",
  helper: "0x8d4d773dF48cd3f827B5F1d3269bd5B057012631",
  pools: {
    wethusdc: "0x4fde82ebd15dbd934d3cf0039b94f4baedb80ab8",
    wethlink: "0x110a33b10957d6a4ff8b637f462ffe021c8ce87c",
    wethusdt: "0x01de1ec5cf2b2720da3eed24bd956f51976fd12b",
    usdclink: "0xdf0febfa325ee2ac26b394c4ab6abfb182e4b234",
    usdcusdt: "0x8979612bb262e2d6dfc0b4c713446ac20ff9d906",
    usdtlink: "0xbe5c98c72f2da50501b4cdab3d83f3b7a3eedb2b",
  },
};
