const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultisigFactory", function () {
  describe("createMultisigWallet", function () {
    it("should create a new Multisig wallet", async function () {
      const [owner, addr1, addr2] = await ethers.getSigners();
      const MultisigFactory = await ethers.getContractFactory("MultisigFactory");
      const factory = await MultisigFactory.deploy();
    //   await factory.deployed();

      const quorum = 2;
      const validSigners = [owner.address, addr1.address, addr2.address];

      await factory.createMultisigWallet(quorum, validSigners);
      
      expect((await factory.getMultiSigClones()).length).to.equal(1);
    });
  });

  describe("getMultiSigClones", function () {
    it("should return all created Multisig wallets", async function () {
      const [owner, addr1, addr2] = await ethers.getSigners();
      const MultisigFactory = await ethers.getContractFactory("MultisigFactory");
      const factory = await MultisigFactory.deploy();
    //   await factory.deployed();

      const quorum = 2;
      const validSigners = [owner.address, addr1.address, addr2.address];

      await factory.createMultisigWallet(quorum, validSigners);
      await factory.createMultisigWallet(quorum, validSigners);

      const clones = await factory.getMultiSigClones();
      
      expect(clones.length).to.be.equal(2);
      expect(clones[0]).to.not.be.equal(ethers.ZeroAddress);
      expect(clones[1]).to.not.be.equal(ethers.ZeroAddress);
    });
  });
});