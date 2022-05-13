const { expect } = require("chai");


describe("Token contract", function () {
 

  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
  
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });

 
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
     expect(await hardhatToken.owner()).to.equal(owner.address);
    });
    it("Should deploy 100 tokens to the owner", async function () {
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(100);
    });
  });

  describe("Destroying", function () {
    it("Should burn tokens from the owner and check balance", async function () {
      await hardhatToken.burn(100);
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(0);
    }); 
  });
  describe("mint more tokens", function () {
    it("Should deploy 500  tokens to addr1", async function () {
      await hardhatToken.mint(addr1.address, 500);
      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(500);
    }); 
  });

  describe("Transfer of tokens", function () {

     it("Should check addr2 balance after transfering tokens to addr2", async function () {
      await hardhatToken.mint(addr1.address, 500);
       expect(await hardhatToken.balanceOf(addr1.address)).to.equal(500);
    
      await hardhatToken.connect(addr1).transfer(addr2.address, 500);
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(500);
    }); 
  });

  });
