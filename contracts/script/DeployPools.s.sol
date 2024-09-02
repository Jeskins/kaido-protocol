// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/UniswapV3PoolFactory.sol";
import "../src/tokens/LINKMock.sol";
import "../src/tokens/USDCMock.sol";
import "../src/tokens/USDTMock.sol";
import "../src/tokens/WETHMock.sol";

contract DeployPools is Script {

    struct ChainStruct {
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
    // 1 WETH = 227 LINK
    uint160 private constant wethLinkx96 = 1193692629588026131006955192320;
    // 1 USDC = 1 USDT
    uint160 private constant usdcUsdtx96 = 79228162514264337593543950336000000;
    // 1 USDC = 0.091 LINK
    uint160 private constant usdcLinkx96 = 23900130918473815292930760929968128;
    // 1 USDT = 0.091 LINK
    uint160 private constant usdtLinkx96 = 23900130918473815190755344384;
    

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("KINTO_DEV_KEY");
        vm.startBroadcast(deployerPrivateKey);
        string memory chain=vm.toString(block.chainid);


        UniswapV3PoolFactory factory =  UniswapV3PoolFactory(0xD378b8Dc9c56206087b58A308934799a389DEa50);

        string memory tokensJson=vm.serializeJson("tokens", vm.readFile("./deployments/tokens.json"));
        bytes memory tokensData=vm.parseJson(tokensJson);
        Tokens memory tokens=abi.decode(tokensData, (Tokens));
        
        address usdt;
        address weth;
        address link;
        address usdc;

        if(block.chainid==31337){
            usdt=tokens.local.usdt;
            weth=tokens.local.weth;
            link=tokens.local.link;
            usdc=tokens.local.usdc;
        } else if(block.chainid==7887)
        {
            usdt=tokens.kinto.usdt;
            weth=tokens.kinto.weth;
            link=tokens.kinto.link;
            usdc=tokens.kinto.usdc;
        } else if(block.chainid==421614)
        {
            usdt=tokens.arb.usdt;
            weth=tokens.arb.weth;
            link=tokens.arb.link;
            usdc=tokens.arb.usdc;
        }

    //   address wethUsdc=factory.createPool(weth, usdc, FEE, wethUsdcx96);
    //     address wethUsdt=factory.createPool(weth, usdt, FEE, wethUsdtx96);
    //     address wethLink=factory.createPool(weth, link, FEE, wethLinkx96);
    //    address usdcUsdt=factory.createPool(usdc, usdt, FEE, usdcUsdtx96);
    //    address usdcLink=factory.createPool(usdc, link, FEE, usdcLinkx96);
    //   address usdtLink=factory.createPool(usdt, link, FEE, usdtLinkx96);

        string memory poolsLabel="pools";
        string memory poolsPath="./deployments/pools.json";
        vm.serializeJson(poolsLabel, vm.readFile(poolsPath));
        vm.serializeAddress(chain, "wethUsdc", factory.createPool(weth, usdc, FEE, wethUsdcx96));
        vm.serializeAddress(chain, "wethUsdt", factory.createPool(weth, usdt, FEE, wethUsdtx96));
        vm.serializeAddress(chain, "wethLink", factory.createPool(weth, link, FEE, wethLinkx96));
        vm.serializeAddress(chain, "usdcUsdt", factory.createPool(usdc, usdt, FEE, usdcUsdtx96));
        vm.serializeAddress(chain, "usdcLink", factory.createPool(usdc, link, FEE, usdcLinkx96));
        string memory outputPools=vm.serializeAddress(chain, "usdtLink", factory.createPool(usdt, link, FEE, usdtLinkx96));

        string memory outputJson=vm.serializeString(poolsLabel, chain, outputPools);
        vm.writeJson(outputJson, poolsPath);


      
        vm.stopBroadcast();
    }
}

