const { expect } = require("chai");

describe("ERC721-NFT", function () {

  beforeEach(async function () {
    MyToken = await ethers.getContractFactory("MyToken");
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    ERC721 = await MyToken.deploy();

  });

describe("Deployment", function () {

  it("check the max supply check the max supply", async function () {
    expect(await ERC721.maxSupply()).to.equal(10000);
  });

    it("check the owner of the contract", async function () {
      expect(await ERC721.owner()).to.equal(owner.address);
    });
  }); 


describe("Minting of Nfts", function(){

  it("should mint 1 nfts to the owners account and check its balance", async function(){
    await ERC721.safeMint(owner.address);
    expect(await ERC721.balanceOf(owner.address)).to.equal(1);
  });

  it("should transfer 1 nfts to the addr1 account and check its balance", async function(){
    await ERC721.safeMint(owner.address);
    expect(await ERC721.balanceOf(owner.address)).to.equal(1);
    expect(await ERC721.transferFrom(owner.address, addr1.address, 0));
    expect(await ERC721.balanceOf(addr1.address)).to.equal(1);
  });
});

describe("Bulk Minting", function(){

  it("should mint 1 nfts to the owners account and check its balance", async function(){
    await ERC721.bulkMint(owner.address, 20);
    expect(await ERC721.balanceOf(owner.address)).to.equal(20);
  });
});



describe("check name and symbol of the nft", function(){

  it("should confirm the name of the contract", async function(){
    expect(await ERC721.name()).to.equal("BUILDMYDAPP");
  });

  it("should confirm the symbol of the nft", async function(){
    expect(await ERC721.symbol()).to.equal("BMD");
  });



  describe("balance of address ", function(){

    it("should mint 1 nfts to the addr1 account and then check its balance", async function(){
      await ERC721.safeMint(addr1.address);
      expect(await ERC721.balanceOf(addr1.address)).to.equal(1);
      

    });

    it("should transfer 1 nfts to the addr2 account and check its balance", async function(){
      await ERC721.safeMint(owner.address);
      expect(await ERC721.transferFrom(owner.address, addr1.address, 0));
      expect(await ERC721.balanceOf(addr1.address)).to.equal(1);
  
    });
});

  
  describe("set token uri and then check if its working ", function(){

    it("should set token uri to www.google.com/ and then should mint a nft and check", async function(){
      await ERC721.safeMint(addr1.address);
      expect(await ERC721.setBaseURI("www.google.com/"));
      expect(await ERC721.tokenURI(0)).to.equal("www.google.com/0");
    });
});



describe("currentSupply", function(){

  it("should check the currentSupply function after minting 2 nfts", async function(){
    await ERC721.safeMint(addr1.address);
    await ERC721.safeMint(addr1.address);
    expect(await ERC721.currentSupply()).to.equal(2);
    
  });
});

describe("Approval and Transfer from", function () {

  it("addr1 will get approval and transfer nft from owner to addr2 and check addr2 balance", async function () {
    await ERC721.safeMint(owner.address);
    expect(await ERC721.balanceOf(owner.address)).to.equal(1);
    expect(await ERC721.approve(addr1.address, 0));
    expect(await ERC721.connect(addr1).transferFrom(owner.address, addr2.address, 0));
    expect(await ERC721.balanceOf(addr2.address)).to.equal(1);
    expect(await ERC721.balanceOf(owner.address)).to.equal(0);
    });
  }); 

  describe("Burn", function () {

    it("mint nft and then burn and check account balance", async function () {
      await ERC721.safeMint(owner.address);
      expect(await ERC721.balanceOf(owner.address)).to.equal(1);
      expect(await ERC721.burn(0));
      expect(await ERC721.balanceOf(owner.address)).to.equal(0);

      });
    }); 

    
  describe("Pause nad unpause", function () {

    it("pause the contract and then mint nft the unpause it and mint nft and check the balanace", async function () {
      await ERC721.pause();
      ERC721.safeMint(owner.address);
      expect(await ERC721.balanceOf(owner.address)).to.equal(0);
      await ERC721.unpause();
      ERC721.safeMint(owner.address);
      expect(await ERC721.balanceOf(owner.address)).to.equal(1);

      });
    }); 

    describe("approval getApproval and setApprovalForAll", function () {

      it("mint a token id and give approval and then check it using get approval function", async function () {
        await ERC721.safeMint(owner.address);
        expect(await ERC721.balanceOf(owner.address)).to.equal(1);
        await ERC721.approve(addr1.address, 0);
        const nft = ERC721.getApproved(0).toString();
        console.log(nft);
  
        });
      }); 

      it("mint a token id and give approval for all and then check it using isApprovedForALL function", async function () {
        await ERC721.safeMint(owner.address);
        expect(await ERC721.balanceOf(owner.address)).to.equal(1);
        await ERC721.setApprovalForAll(addr1.address, true);
        expect(await ERC721.isApprovedForAll(owner.address, addr1.address)).to.be.true;
  
  
        });
      }); 

});
