// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/tokens/DAIMock.sol";
import "../src/tokens/LINKMock.sol";
import "../src/tokens/USDCMock.sol";
import "../src/tokens/USDTMock.sol";
import "../src/tokens/WETHMock.sol";

contract DeployTokens is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("KINTO_DEV_KEY");
        vm.startBroadcast(deployerPrivateKey);

        DAIMock dai = new DAIMock();
        LINKMock link = new LINKMock();
        USDCMock usdc = new USDCMock();
        USDTMock usdt = new USDTMock();
        WETHMock weth = new WETHMock();
        
        vm.serializeJson("json", vm.readFile("./deployments/tokens.json"));

        string memory chain=vm.toString(block.chainid);
        vm.serializeAddress(chain, "dai", address(dai));
        vm.serializeAddress(chain, "link", address(link));
        vm.serializeAddress(chain, "usdc", address(usdc));
        vm.serializeAddress(chain, "usdt", address(usdt));
        string memory outputTokens =vm.serializeAddress(chain, "weth", address(weth));

        string memory outputJson=vm.serializeString("json", chain, outputTokens);

        vm.writeJson(outputJson, "./deployments/tokens.json");
        vm.stopBroadcast();
    }
}

