const { expect } = require("chai");
describe("mysenshiNFT", function () {

  let senshiNFT;
  let mysenshiNFT;
  let owner;
  let account1;
  let account2;
  let account3;
  let whiteListedAccount;

  

  beforeEach(async function () {
 
    const senshiNFT = await ethers.getContractFactory("senshiNFT");
    [owner, account1, account2,account3, whiteListedAccount] = await ethers.getSigners();
    mysenshiNFT = await senshiNFT.deploy();
    await mysenshiNFT.setStartTime(1648452702);
    await mysenshiNFT.setEndTime(1648521102);
    await mysenshiNFT.toggleWhiteListingStatus();
    await mysenshiNFT.changeMaxSupply(1000);
  });
  describe("Deployment", function () {
    
  it("check the name and symbol of senshi nft", async function () {
    const [owner] = await ethers.getSigners();
    const senshiNFT = await ethers.getContractFactory("senshiNFT");
    const mysenshiNFT = await senshiNFT.deploy();
    expect(await mysenshiNFT.name()).to.equal("SENSHI NFT");
    expect(await mysenshiNFT.symbol()).to.equal("SENSHI");
  });
});
  describe("Minting", function () {

    it("Should mint  2 nft to the account and check its balance", async function () {
      await mysenshiNFT.mint(2);
      expect(await mysenshiNFT.balanceOf(owner.address)).to.equal(2);    
});
    it("Should mint  1 nft to the account1 and transfer it to account2", async function () {
     await mysenshiNFT.connect(account1).mint(1);
     expect(await mysenshiNFT.balanceOf(account1.address)).to.equal(1);
     await mysenshiNFT.connect(account1).transferFrom(account1.address, account2.address, 1);
     expect(await mysenshiNFT.balanceOf(account2.address)).to.equal(1);
    
});
    it("Should check account 2 balance", async function () {
      await mysenshiNFT.connect(account2).mint(1);
       expect(await mysenshiNFT.balanceOf(account2.address)).to.equal(1);
}); 

    it("Should change the minting price and then confirm the change", async function () {
      expect(await mysenshiNFT.pricePerMint()).to.equal(0);
      await mysenshiNFT.updateTokenPrice(1000);
      expect(await mysenshiNFT.pricePerMint()).to.equal(1000);
}); 
    it("Should change whiteListingStatus and check if it is changed and add a whitelisted user", async function () {
      await mysenshiNFT.toggleWhiteListingStatus();
      expect( await mysenshiNFT.isWhitelisted(whiteListedAccount.address)).to.be.false;
      await mysenshiNFT.addWhitelistUser([whiteListedAccount.address]);
 }); 

    it("let a whitelisted user mint a nft and check its account balance", async function () {
     await mysenshiNFT.toggleWhiteListingStatus();
     expect( await mysenshiNFT.isWhitelisted(whiteListedAccount.address)).to.be.false;
     await mysenshiNFT.addWhitelistUser([whiteListedAccount.address]);
     expect( await mysenshiNFT.isWhitelisted(whiteListedAccount.address)).to.be.true;
     await mysenshiNFT.connect(whiteListedAccount).mint(1);
     expect(await mysenshiNFT.balanceOf(whiteListedAccount.address)).to.equal(1);
}); 

    it("set price to 1000", async function () {
    await mysenshiNFT.updateTokenPrice(1000);
    expect(await mysenshiNFT.pricePerMint()).to.not.equal(0);

});

 it("check the contract dont mint above the max supply", async function () {
   await mysenshiNFT.changeMaxSupply(3);
   expect (await mysenshiNFT.connect(account1).mint(4).fail);
   expect (await mysenshiNFT.connect(account1).mint(3));
}); 
});
});