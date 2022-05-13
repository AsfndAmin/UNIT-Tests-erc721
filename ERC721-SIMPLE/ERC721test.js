const { expect } = require('chai');

describe("NFTContract", function() {

  let owner;

    it("should return correct name and symbol and check owner of first nft", async function () {

       const MyContract = await ethers.getContractFactory("NFTContract");

        const myContractDeployed = await MyContract.deploy("Asfand", 
        "ASF");

        await myContractDeployed.deployed(); 
        // expect(await myContractDeployed.owner()).to.equal(owner.address);
        expect(await myContractDeployed.name()).to.equal("Asfand");
        expect(await myContractDeployed.symbol()).to.equal("ASF");
       expect(await myContractDeployed.ownerOf(1)).to.equal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    });   

});