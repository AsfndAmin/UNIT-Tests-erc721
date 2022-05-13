// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Token is ERC20, Ownable, ERC20Burnable {
    uint256 maxSupply = 1000;
    constructor() ERC20("token", "bmd") {
      _mint(msg.sender, 100);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply()<=maxSupply);
        _mint(to, amount);
    }
}