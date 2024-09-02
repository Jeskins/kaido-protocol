// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/UniswapV3PoolFactory.sol";

contract DeployFactory is Script {

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("KINTO_DEV_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        string memory chain=vm.toString(block.chainid);

        string memory factoryLabel="factory";
        string memory factoryPath="./deployments/factory.json";
        vm.serializeJson(factoryLabel, vm.readFile(factoryPath));
        UniswapV3PoolFactory factory = new UniswapV3PoolFactory();
        string memory factoryJson=vm.serializeAddress(factoryLabel, chain, address(factory));
        vm.writeJson(factoryJson, factoryPath);

        vm.stopBroadcast();
    }
}

