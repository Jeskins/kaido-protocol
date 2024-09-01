// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/tokens/DAIMock.sol";
import "../src/tokens/LINKMock.sol";
import "../src/tokens/USDCMock.sol";
import "../src/tokens/USDTMock.sol";
import "../src/tokens/WETHMock.sol";

contract DeployTokens is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        DAIMock dai = new DAIMock();
        LINKMock link = new LINKMock();
        USDCMock usdc = new USDCMock();
        USDTMock usdt = new USDTMock();
        WETHMock weth = new WETHMock();
        
        vm.writeJson(string(abi.encodePacked('{ "usdc": "', vm.toString(address(usdc)), '", ',
        '"usdt": "', vm.toString(address(usdt)), '", ',
        '"link": "', vm.toString(address(link)), '", ',
        '"dai": "', vm.toString(address(dai)), '", ',
        '"weth": "', vm.toString(address(weth)), '" }')), './output/token-deployments.json',string(abi.encodePacked('.', vm.toString(block.chainid))));
        vm.stopBroadcast();
    }
}

