const { networks } = require("../networks");

const { BigNumber, ethers } = require("ethers");
const {
  abi,
} = require("../artifacts/contracts/UniswapV3PoolFactory.sol/UniswapV3PoolFactory.json");

task("create-pools", "Create a pool").setAction(async (taskArgs) => {
  const { ethers } = hre;
  const [signer] = await ethers.getSigners();

  // CHANGE THIS
  const poolFactory = networks[network.name].poolFactory;
  const usdt = networks[network.name].usdt;
  const usdc = networks[network.name].usdc;
  const link = networks[network.name].link;
  const weth = networks[network.name].weth;

  const fee = 3000;

  // Calculate sqrtPriceX96
  const wethUsdcx96 = "3955064793980448595247104";
  const wethUsdtX96 = "3955064793980448361016767545344";
  const wethLinkx96 = "1193692629588026131006955192320";
  const usdcUsdtx96 = "79228162514264337593543950336000000";
  const usdcLinkx96 = "23900130918473815292930760929968128";
  const usdtLinkx96 = "23900130918473815190755344384";

  const core = new ethers.Contract(poolFactory, abi, signer);
  const response = await core.createPool(tokenA, tokenB, fee, sqrtPriceX96);
  const receipt = await response.wait();
  console.log(receipt.transactionHash);
});
