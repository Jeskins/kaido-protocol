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
  const usdt = networks[network.name].tokens.usdt;
  const usdc = networks[network.name].tokens.usdc;
  const link = networks[network.name].tokens.link;
  const weth = networks[network.name].tokens.weth;

  const fee = 3000;

  // Calculate sqrtPriceX96
  const wethUsdcx96 = "3955064793980448595247104";
  const wethUsdtX96 = "3955064793980448361016767545344";
  const wethLinkx96 = "1193692629588026131006955192320";
  const usdcUsdtx96 = "79228162514264337593543950336000000";
  const usdcLinkx96 = "23900130918473815292930760929968128";
  const usdtLinkx96 = "23900130918473815190755344384";

  const core = new ethers.Contract(poolFactory, abi, signer);
  const args = [usdt, link, fee, usdtLinkx96];
  let response;
  let receipt;

  response = await core.createPool(...args);
  receipt = await response.wait();
  console.log(receipt.transactionHash);
});
