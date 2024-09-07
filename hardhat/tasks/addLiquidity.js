const { BigNumber } = require("ethers");
const { networks } = require("../networks");
const poolAbi = require("../artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json");
const {
  abi: helperAbi,
} = require("../artifacts/contracts/Helper.sol/Helper.json");
task("add-liquidity", "Add liquidity to pool").setAction(async (taskArgs) => {
  const { ethers, deployments } = hre;
  const [signer] = await ethers.getSigners();
  console.log(signer.address);
  const erc20Abi = [
    {
      constant: false,
      inputs: [
        {
          name: "user",
          type: "address",
        },
        {
          name: "amount",
          type: "uint256",
        },
      ],
      name: "mint",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "spender",
          type: "address",
        },
        {
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const { abi } = poolAbi;
  const poolAddress = networks[network.name].pools.wethusdc;
  const helperAddress = networks[network.name].helper;
  const tokenA = networks[network.name].tokens.weth;
  const tokenB = networks[network.name].tokens.usdc;
  console.log(poolAddress, helperAddress);
  console.log(tokenA, tokenB);
  // Approve Tokens
  const tokenAContract = new ethers.Contract(tokenA, erc20Abi, signer);
  console.log("Minting Token A....");
  const tokenAMint = await tokenAContract.mint(
    signer.address,
    "1000000000000000000"
  );
  await tokenAMint.wait();
  console.log("tokenA minted");
  console.log("Approving Token A...");
  const tokenAApproval = await tokenAContract.approve(
    poolAddress,
    ethers.constants.MaxUint256
  );
  await tokenAApproval.wait();
  console.log("tokenA approved");

  const tokenBContract = new ethers.Contract(tokenB, erc20Abi, signer);
  console.log("Minting Token B....");
  const tokenBMint = await tokenBContract.mint(signer.address, "10000000");
  await tokenBMint.wait();
  console.log("tokenB minted");

  console.log("Approving Token B...");
  const tokenBApproval = await tokenBContract.approve(
    poolAddress,
    ethers.constants.MaxUint256
  );
  await tokenBApproval.wait();
  console.log("tokenB approved");

  const TICK_SPACING = 10;
  const poolContract = new ethers.Contract(poolAddress, abi, signer);
  const helperContract = new ethers.Contract(helperAddress, helperAbi, signer);
  const slot = await poolContract.getSlot0();
  console.log("slot", slot);
  // CHANGE THIS
  const amountA = "1000000000000000000";
  const amountB = "10000000";
  // END CHANGE THIS

  const recipient = signer.address;
  const tickLower = ((slot.tick - TICK_SPACING) / TICK_SPACING) * TICK_SPACING;
  const tickUpper = ((slot.tick + TICK_SPACING) / TICK_SPACING) * TICK_SPACING;
  const sqrtRatioLowerX96 = await helperContract.getSqrtRatioAtTick(tickLower);
  const sqrtRatioUpperX96 = await helperContract.getSqrtRatioAtTick(tickUpper);
  console.log("sqrtPriceX96", slot.sqrtPriceX96.toString());
  console.log("tickLower", tickLower);
  console.log("tickUpper", tickUpper);
  console.log("amountA", amountA.toString());
  console.log("amountB", amountB.toString());
  console.log("sqrtRatioLowerX96", sqrtRatioLowerX96.toString());
  console.log("sqrtRatioUpperX96", sqrtRatioUpperX96.toString());
  const liquidity = await helperContract.getLiquidityForAmounts(
    slot.sqrtPriceX96.toString(),
    sqrtRatioLowerX96,
    sqrtRatioUpperX96,
    amountA.toString(),
    amountB.toString()
  );

  console.log("liquidity", liquidity.toString());
  const response = await poolContract.mint(
    recipient,
    tickLower,
    tickUpper,
    liquidity
  );

  const receipt = await response.wait();
  console.log(receipt);
});
