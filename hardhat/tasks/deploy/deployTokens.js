const { networks } = require("../../networks");
task("deploy-tokens", "Deploys the Tokens")
  .addOptionalParam(
    "verify",
    "Set to true to verify contract",
    false,
    types.boolean
  )
  .setAction(async (taskArgs, hre) => {
    console.log("\n__Compiling Contracts__");
    await run("compile");
    const verifyContract = taskArgs.verify;
    const tokens = ["USDCMock", "WETHMock", "LINKMock", "USDTMock"];
    const tokenDeployments = {};
    for (let token of tokens) {
      console.log(`Deploying ${token} contract to ${network.name}`);
      const contractFactory = await ethers.getContractFactory(token);
      const contract = await contractFactory.deploy();
      console.log(
        `\nWaiting ${
          networks[network.name].confirmations
        } blocks for transaction ${
          contract.deployTransaction.hash
        } to be confirmed...`
      );

      await contract.deployTransaction.wait(
        networks[network.name].confirmations
      );
      console.log(
        `\n ${token} contract deployed to ${contract.address} on ${network.name}`
      );
      // TODO: Write deployment to JSON
      if (verifyContract) {
        try {
          console.log("\nVerifying contract...");
          await run("verify:verify", {
            address: usdcContract.address,
            contract: `contracts/tokens/${token}.sol:${token}`,
            constructorArguments: [],
          });
          console.log("Contract verified");
        } catch (error) {
          if (!error.message.includes("Already Verified")) {
            console.log(
              "Error verifying contract.  Ensure you are waiting for enough confirmation blocks, delete the build folder and try again."
            );
            console.log(error);
          } else {
            console.log("Contract already verified");
          }
        }
      }
    }
  });
