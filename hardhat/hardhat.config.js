const { networks } = require("./networks");

require("@nomicfoundation/hardhat-toolbox");
require("hardhat-dependency-compiler");
require("hardhat-contract-sizer");
require("./tasks");

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
      metadata: {
        bytecodeHash: "none",
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    ...networks,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    assistant: {
      default: 1,
    },
  },
  etherscan: {
    apiKey: {
      arbitrumSepolia: networks.arbitrumSepolia.verifyApiKey,
      kintoMainnet: networks.kintoMainnet.verifyApiKey,
    },
    customChains: [
      {
        network: "kintoMainnet",
        chainId: 7887,
        urls: {
          apiURL: "https://explorer.kinto.xyz/api",
          browserURL: "https://explorer.kinto.xyz",
        },
      },
      {
        network: "arbitrumSepolia",
        chainId: networks.arbitrumSepolia.chainId,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api/",
          browserURL: "https://sepolia.arbiscan.io/",
        },
      },
    ],
  },
};
