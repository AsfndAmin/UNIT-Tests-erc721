const { expect } = require("chai");

describe("ERC721A-NFT", function () {

  beforeEach(async function () {
    const pakistanNft = await ethers.getContractFactory("pakistanNft");
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    ERC721A = await pakistanNft.deploy();

  });



describe("Deployment", function () {

  it("check the max supply check the max supply", async function () {
    expect(await ERC721A.maxSupply()).to.equal(10000);
  });

    it("check the owner of the contract", async function () {
      const [owner] = await ethers.getSigners();
      expect(await ERC721A.owner()).to.equal(owner.address);
    });
  }); 


describe("Minting of Nfts", function(){

  it("should mint 10 nfts to the owners account and check its balance", async function(){
    const [owner] = await ethers.getSigners();
    await ERC721A.mintNfts(owner.address, 10);
    expect(await ERC721A.balanceOf(owner.address)).to.equal(10);
  });

  it("should transfer 1 nfts to the addr2 account and check its balance", async function(){
    const [owner, addr1] = await ethers.getSigners();
    await ERC721A.mintNfts(owner.address, 2);
    expect(await ERC721A.transferFrom(owner.address, addr1.address, 1));
    expect(await ERC721A.balanceOf(addr1.address)).to.equal(1);
  });
});



describe("check name and symbol of the nft", function(){

  it("should mconfirm the name of the contract", async function(){
    const [owner] = await ethers.getSigners();
    expect(await ERC721A.name()).to.equal("PAKISTANNFT");
  });

  it("should confirm the symbol of the nft", async function(){
    const [owner] = await ethers.getSigners();
    expect(await ERC721A.symbol()).to.equal("PAKNFT");
  });



  describe("all token in account query test ", function(){

    it("should mint 5 nfts to the addr1 account and then use queryfunction to check all the token ids of addr1", async function(){
      const [addr1] = await ethers.getSigners();
      await ERC721A.mintNfts(addr1.address, 5);
      const tokens = await ERC721A.tokensOfOwnerIn(addr1.address).toString();
      console.log(tokens);

    });

    it("should transfer 1 nfts to the addr2 account and check its balance", async function(){
      const [owner, addr1] = await ethers.getSigners();
      await ERC721A.mintNfts(owner.address, 2);
      expect(await ERC721A.transferFrom(owner.address, addr1.address, 1));
      expect(await ERC721A.balanceOf(addr1.address)).to.equal(1);
  
    });
});

  
  describe("set token uri and then check if its working ", function(){

    it("should set token uri to www.google.com/ and then should mint a nft and check", async function(){
      const [addr1] = await ethers.getSigners();
      await ERC721A.mintNfts(addr1.address, 1);
      expect(await ERC721A.setBaseUri("www.google.com/"));
      expect(await ERC721A.tokenURI(0)).to.equal("www.google.com/0");
    });
});



describe("Tokens of owner", function(){

  it("owner should give a starting and ending number of ids and this function should fetch all the ids owned by the owner between that frame", async function(){
    const [addr1] = await ethers.getSigners();
    await ERC721A.mintNfts(addr1.address, 15);
    const tokens = await ERC721A.tokensOfOwnerIn(addr1.address, 10 , 20).toString();
    console.log(tokens);
  });
});

describe("Approval and Transfer from", function () {

  it("addr1 will get approval and transfer nft from owner to addr2 and check addr2 balance", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    await ERC721A.mintNfts(owner.address, 2);
    expect(await ERC721A.balanceOf(owner.address)).to.equal(2);
    expect(await ERC721A.approve(addr1.address, 1));
    expect(await ERC721A.connect(addr1).transferFrom(owner.address, addr2.address, 1));
    expect(await ERC721A.balanceOf(addr2.address)).to.equal(1);
    expect(await ERC721A.balanceOf(owner.address)).to.equal(1);
    });
  }); 

  describe("Burn", function () {

    it("mint nft and then burn and check account balance", async function () {
      const [owner] = await ethers.getSigners();
      await ERC721A.mintNfts(owner.address, 2);
      expect(await ERC721A.balanceOf(owner.address)).to.equal(2);
      expect(await ERC721A.burn(1));
      expect(await ERC721A.balanceOf(owner.address)).to.equal(1);
      expect(await ERC721A.burn(0));
      expect(await ERC721A.balanceOf(owner.address)).to.equal(0);
      });
    }); 

});
});