const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { ethers } = require('hardhat');
const { describe, it } = require('mocha');
const { expect } = require('chai');

describe('Bitflags', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBitflagsTestFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const BitflagsTest = await ethers.getContractFactory('BitflagsTest');
    const bitflagsTest = await BitflagsTest.deploy();

    return { bitflagsTest, owner, otherAccount };
  }

  describe("Function 'getFlag'", function () {
    it('Should return the right result', async function () {
      const { bitflagsTest } = await loadFixture(deployBitflagsTestFixture);

      expect(await bitflagsTest.flags()).to.be.hexEqual(
        '0x8000000000000000000000000000000000000000000000000000000000000000'
      );
      expect(await bitflagsTest.getFlag(0)).to.be.false;
      expect(await bitflagsTest.getFlag(255)).to.be.true;
    });
  });

  describe("Function 'enableFlag'", function () {
    it('Should enable the right flag', async function () {
      const { bitflagsTest } = await loadFixture(deployBitflagsTestFixture);

      await bitflagsTest.enableFlag(0);

      expect(await bitflagsTest.flags()).to.be.hexEqual(
        '0x8000000000000000000000000000000000000000000000000000000000000001'
      );
      expect(await bitflagsTest.getFlag(0)).to.be.true;
    });
  });

  describe("Function 'disableFlag'", function () {
    it('Should disable the right flag', async function () {
      const { bitflagsTest } = await loadFixture(deployBitflagsTestFixture);

      await bitflagsTest.disableFlag(255);

      expect(await bitflagsTest.flags()).to.be.hexEqual(
        '0x0000000000000000000000000000000000000000000000000000000000000000'
      );
      expect(await bitflagsTest.getFlag(255)).to.be.false;
    });
  });

  describe("Function 'listEnabledFlags'", function () {
    it('Should revert if the given limit is invalid', async function () {
      const { bitflagsTest } = await loadFixture(deployBitflagsTestFixture);

      expect(await bitflagsTest.flags()).to.be.hexEqual(
        '0x8000000000000000000000000000000000000000000000000000000000000000'
      );
      await expect(bitflagsTest.listEnabledFlags(0)).to.be.revertedWith('Error: Invalid limit');
      await expect(bitflagsTest.listEnabledFlags(257)).to.be.revertedWith('Error: Invalid limit');
    });

    it('Should return the right result', async function () {
      const { bitflagsTest } = await loadFixture(deployBitflagsTestFixture);

      expect(await bitflagsTest.flags()).to.be.hexEqual(
        '0x8000000000000000000000000000000000000000000000000000000000000000'
      );
      expect(await bitflagsTest.listEnabledFlags(256)).to.be.hexEqual('0xFF');
    });
  });

  describe("Function 'listDisabledFlags'", function () {
    it('Should revert if the given limit is invalid', async function () {
      const { bitflagsTest } = await loadFixture(deployBitflagsTestFixture);

      expect(await bitflagsTest.flags()).to.be.hexEqual(
        '0x8000000000000000000000000000000000000000000000000000000000000000'
      );
      await expect(bitflagsTest.listDisabledFlags(0)).to.be.revertedWith('Error: Invalid limit');
      await expect(bitflagsTest.listDisabledFlags(257)).to.be.revertedWith('Error: Invalid limit');
    });

    it('Should return the right result', async function () {
      const { bitflagsTest } = await loadFixture(deployBitflagsTestFixture);

      expect(await bitflagsTest.listDisabledFlags(256)).to.be.equal(
        '0x' +
          '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f' +
          '202122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f' +
          '404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5d5e5f' +
          '606162636465666768696a6b6c6d6e6f707172737475767778797a7b7c7d7e7f' +
          '808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9f' +
          'a0a1a2a3a4a5a6a7a8a9aaabacadaeafb0b1b2b3b4b5b6b7b8b9babbbcbdbebf' +
          'c0c1c2c3c4c5c6c7c8c9cacbcccdcecfd0d1d2d3d4d5d6d7d8d9dadbdcdddedf' +
          'e0e1e2e3e4e5e6e7e8e9eaebecedeeeff0f1f2f3f4f5f6f7f8f9fafbfcfdfe'
      );
      expect(await bitflagsTest.flags()).to.be.hexEqual(
        '0x8000000000000000000000000000000000000000000000000000000000000000'
      );
    });
  });
});
