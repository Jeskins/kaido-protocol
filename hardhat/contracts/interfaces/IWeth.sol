// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.8.19;

interface IWeth{

    function mint(address to, uint256 amount) external;
    function burn(uint256 amount) external;
    function transferFrom(address sender, address recipient, uint256 amount) external;
}