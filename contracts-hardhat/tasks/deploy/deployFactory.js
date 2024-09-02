const { networks } = require("../../networks");

task("deploy-factory", "Deploys the UniswapV3PoolFactory contract")
  .addOptionalParam(
    "verify",
    "Set to true to verify contract",
    false,
    types.boolean
  )
  .setAction(async (taskArgs) => {
    console.log(`Deploying UniswapV3PoolFactory contract to ${network.name}`);

    console.log("\n__Compiling Contracts__");
    await run("compile");

    const poolFactoryContractFactory = await ethers.getContractFactory(
      "UniswapV3PoolFactory"
    );

    const poolFactoryContract = await poolFactoryContractFactory.deploy();

    console.log(
      `\nWaiting ${
        networks[network.name].confirmations
      } blocks for transaction ${
        poolFactoryContract.deployTransaction.hash
      } to be confirmed...`
    );

    await poolFactoryContract.deployTransaction.wait(
      networks[network.name].confirmations
    );

    console.log(
      "\nDeployed UniswapV3PoolFactory contract to:",
      poolFactoryContract.address
    );

    if (network.name === "localFunctionsTestnet") {
      return;
    }

    const verifyContract = taskArgs.verify;
    if (
      network.name !== "localFunctionsTestnet" &&
      verifyContract &&
      !!networks[network.name].verifyApiKey &&
      networks[network.name].verifyApiKey !== "UNSET"
    ) {
      try {
        console.log("\nVerifying contract...");
        await run("verify:verify", {
          address: poolFactoryContract.address,
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
    } else if (verifyContract && network.name !== "localFunctionsTestnet") {
      console.log(
        "\nPOLYGONSCAN_API_KEY, ETHERSCAN_API_KEY or FUJI_SNOWTRACE_API_KEY is missing. Skipping contract verification..."
      );
    }

    console.log(
      `\n UniswapV3PoolFactory contract deployed to ${poolFactoryContract.address} on ${network.name}`
    );
  });
