// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "erc721a/contracts/extensions/ERC721AQueryable.sol";
import "erc721a/contracts/extensions/ERC721ABurnable.sol";

contract pakistanNft is ERC721A, Ownable, ERC721ABurnable, ERC721AQueryable{

    string public baseUriExtended;
    uint256 public immutable maxSupply = 10000;

    constructor () ERC721A("PAKISTANNFT", "PAKNFT") {}

    function mintNfts(address _address, uint256 _quantity) external{
        require(totalSupply() + _quantity <= maxSupply, "max supply reached");
        _safeMint(_address, _quantity);
    }

    function burn(uint256 tokenId) public override {
        _burn(tokenId, true);
    }

    function setBaseUri(string memory _baseUri) public onlyOwner{
        baseUriExtended = _baseUri;
    }

     function _baseURI() internal view override returns (string memory) {
        return baseUriExtended;
    }

}