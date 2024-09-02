require("@chainlink/env-enc").config();

const DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS = 3;

const PRIVATE_KEY = process.env.TEST_PRIVATE_KEY || "";
const KINTO_PRIVATE_KEY = process.env.KINTO_PRIVATE_KEY || "";

const KINTO_RPC_URL =
  process.env.KINTO_RPC_URL || "	https://rpc.open-campus-codex.gelato.digital";

// Arbitrum
const ARBITRUM_SEPOLIA_RPC_URL = "https://sepolia-rollup.arbitrum.io/rpc";
const ARBISCAN_API_KEY = process.env.ARBISCAN_API_KEY || "";

const networks = {
  hardhat: {
    chainId: 31337,
    confirmations: 1,
  },
  localhost: {
    url: "http://127.0.0.1:8545/",
    chainId: 31337,
    confirmations: 1,
    usdt: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    link: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    usdc: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    dai: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    weth: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    poolFactory: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
  },
  arbitrumSepolia: {
    gasPrice: undefined,
    nonce: undefined,
    accounts: [PRIVATE_KEY],
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    chainId: 421614,
    url: ARBITRUM_SEPOLIA_RPC_URL,
    verifyApiKey: ARBISCAN_API_KEY,
    nativeCurrencySymbol: "ETH",
    tokens: {
      usdt: "0xc7f60886A8d39446F0689A546CC0eaAF40a32877",
      link: "0x4b8b404503B4ff02Ad56F1cA03385E09e5081Add",
      usdc: "0x2f80513FD5119CD9DC340cd0666Ee84d00A3e799",
      weth: "0xDC53A67F182f0495AfCfF3Dc592A7CC02f2Ffe92",
    },
    poolFactory: "0x7334481e7551dE063316f7d3AcE2629761575A51",
    pools: {
      usdcweth: "0xB7CF382335e0Ca1E227c5eBDAd068A9eE330CfD0",
      linkweth: "0x76DA23beCCB82181bba21548510bD3108Af8e645",
      usdtweth: "0x0E2d4d36b7Afb67773f0FB985d377B20b014e270",
      usdclink: "0x2f571696E59D6c390915CAfA7ed2A6c6350817E7",
      usdcusdt: "0xCb2bB1790D4C05E4Ee849c0C38edF123b638E8e3",
      linkusdt: "0xF0e02Bc76af25B765e45af2c00C23E185974D6AC",
    },
  },
  kintoMainnet: {
    gasPrice: undefined,
    nonce: undefined,
    accounts: [KINTO_PRIVATE_KEY],
    confirmations: 1,
    chainId: 656476,
    url: KINTO_RPC_URL,
    verifyApiKey: "ROUTESCAN",
    nativeCurrencySymbol: "ETH",
    tokens: {
      usdt: "",
      link: "",
      usdc: "",
      weth: "",
    },
    poolFactory: "",
    pools: {
      usdcweth: "",
      wethlink: "",
      usdtweth: "",
      usdclink: "",
      usdcusdt: "",
      usdtlink: "",
    },
  },
};

module.exports = {
  networks,
};
