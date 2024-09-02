// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/UniswapV3PoolFactory.sol";
import "../src/tokens/DAIMock.sol";
import "../src/tokens/LINKMock.sol";
import "../src/tokens/USDCMock.sol";
import "../src/tokens/USDTMock.sol";
import "../src/tokens/WETHMock.sol";

contract DeployPools is Script {

    struct ChainStruct {
        address dai;
        address link;
        address usdc;
        address usdt;
        address weth;
    }

    struct Tokens{
        ChainStruct local;
        ChainStruct arb;
        ChainStruct kinto;
    }
    uint24 private constant FEE = 500;

    // 1 WETH = 2492 USDC
    uint160 private constant wethUsdcx96 = 3955064793980448595247104;
    // 1 WETH = 2492 USDT
    uint160 private constant wethUsdtx96 = 3955064793980448361016767545344;
    // 1 WETH = 2492 DAI
    uint160 private constant wethDaix96 = 3955064793980448361016767545344;
    // 1 WETH = 227 LINK
    uint160 private constant wethLinkx96 = 1193692629588026131006955192320;
    // 1 USDC = 1 USDT
    uint160 private constant usdcUsdtx96 = 79228162514264337593543950336000000;
    // 1 USDC = 1 DAI
    uint160 private constant usdcDaix96 = 79228162514264337593543950336000000;
    // 1 USDC = 0.091 LINK
    uint160 private constant usdcLinkx96 = 23900130918473815292930760929968128;
    // 1 USDT = 1 DAI
    uint160 private constant usdtDaix96 = 79228162514264337593543950336;
    // 1 USDT = 0.091 LINK
    uint160 private constant usdtLinkx96 = 23900130918473815190755344384;
    // 1 DAI = 0.091 LINK
    uint160 private constant daiLinkx96 = 23900130918473815190755344384;
    

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("KINTO_DEV_KEY");
        vm.startBroadcast(deployerPrivateKey);
        string memory chain=vm.toString(block.chainid);


        // string memory factoryLabel="factory";
        // string memory factoryPath="./deployments/factory.json";
        // vm.serializeJson(factoryLabel, vm.readFile(factoryPath));
        // UniswapV3PoolFactory factory = new UniswapV3PoolFactory();
        // string memory factoryJson=vm.serializeAddress(factoryLabel, chain, address(factory));
        // vm.writeJson(factoryJson, factoryPath);

        UniswapV3PoolFactory factory = UniswapV3PoolFactory(0xb42b19E1942a4AA52c91c91a9f351059395Ee301);

        string memory tokensJson=vm.serializeJson("tokens", vm.readFile("./deployments/tokens.json"));
        bytes memory tokensData=vm.parseJson(tokensJson);
        Tokens memory tokens=abi.decode(tokensData, (Tokens));
        
        address dai;
        address usdt;
        address weth;
        address link;
        address usdc;

        if(block.chainid==31337){
            dai=tokens.local.dai;
            usdt=tokens.local.usdt;
            weth=tokens.local.weth;
            link=tokens.local.link;
            usdc=tokens.local.usdc;
        } else if(block.chainid==7887)
        {
            dai=tokens.kinto.dai;
            usdt=tokens.kinto.usdt;
            weth=tokens.kinto.weth;
            link=tokens.kinto.link;
            usdc=tokens.kinto.usdc;
        } else if(block.chainid==421614)
        {
            dai=tokens.arb.dai;
            usdt=tokens.arb.usdt;
            weth=tokens.arb.weth;
            link=tokens.arb.link;
            usdc=tokens.arb.usdc;
        }else{

        }

      factory.createPool(weth, usdc, FEE, wethUsdcx96);
        factory.createPool(weth, usdt, FEE, wethUsdtx96);
        factory.createPool(weth, dai, FEE, wethDaix96);
        factory.createPool(weth, link, FEE, wethLinkx96);
       factory.createPool(usdc, usdt, FEE, usdcUsdtx96);
       factory.createPool(usdc, dai, FEE, usdcDaix96);
       factory.createPool(usdc, link, FEE, usdcLinkx96);
       factory.createPool(usdt, dai, FEE, usdtDaix96);
      factory.createPool(usdt, link, FEE, usdtLinkx96);
       factory.createPool(dai, link, FEE, daiLinkx96);

      
        vm.stopBroadcast();
    }
}

