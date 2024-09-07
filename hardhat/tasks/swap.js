const { networks } = require("../networks");
const {
  abi,
} = require("../artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json");
task("swap", "Create a pool").setAction(async (taskArgs) => {
  const { ethers } = hre;
  const [signer] = await ethers.getSigners();

  const poolAddress = networks[network.name].pools.wethusdc;
  const recipient = signer.address;
  const zeroForOne = false;

  const core = new ethers.Contract(poolAddress, abi, signer);

  const response = await core.swap(
    recipient,
    zeroForOne,
    "100000",
    "1461446703485210103287273052203988822378723970342"
  );
  const receipt = await response.wait();
  console.log(receipt);
});
