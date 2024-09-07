// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.8.19;

import "./interfaces/IWeth.sol";

contract EthDeposit{

    IWeth public weth;
    constructor(IWeth _weth){
        weth = _weth;
    }

    function deposit() external payable {
        weth.mint(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        weth.transferFrom(msg.sender, address(this), amount);
        weth.burn(amount);
        payable(msg.sender).transfer(amount);
    }
}