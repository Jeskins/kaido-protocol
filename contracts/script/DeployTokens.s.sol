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
        vm.writeJson(vm.toString(address(dai)), './deployments.json', string(abi.encodePacked(".",vm.toString(block.chainid),".tokens.dai")));
        LINKMock link = new LINKMock();
        vm.writeJson(vm.toString(address(link)), './deployments.json', string(abi.encodePacked(".",vm.toString(block.chainid),".tokens.link")));
        USDCMock usdc = new USDCMock();
        vm.writeJson(vm.toString(address(usdc)), './deployments.json', string(abi.encodePacked(".",vm.toString(block.chainid),".tokens.usdc")));
        USDTMock usdt = new USDTMock();
        vm.writeJson(vm.toString(address(usdt)), './deployments.json', string(abi.encodePacked(".",vm.toString(block.chainid),".tokens.usdt")));
        WETHMock weth = new WETHMock();
        vm.writeJson(vm.toString(address(weth)), './deployments.json', string(abi.encodePacked(".",vm.toString(block.chainid),".tokens.weth")));

        vm.stopBroadcast();
    }
}

