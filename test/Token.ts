import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Token contract", function () {
  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const contract = await ethers.deployContract("Token");

    return { contract, owner, addr1, addr2 };
  }

  it("Deployment should assign the total supply of tokens to the owner", async () => {
    const { contract, owner } = await loadFixture(deployTokenFixture);
    const ownerBalance = await contract.balanceOf(owner.address);

    expect(await contract.totalSupply()).to.equal(ownerBalance);
  });

  it("Should allow token transfer between accounts", async () => {
    const { contract, addr1, addr2 } = await loadFixture(deployTokenFixture);

    await contract.transfer(addr1, 50);
    expect(await contract.balanceOf(addr1)).to.equal(50);

    await contract.connect(addr1).transfer(addr2, 50);
    expect(await contract.balanceOf(addr1)).to.equal(0);
    expect(await contract.balanceOf(addr2)).to.equal(50);
  });

  it("Returns error when sender account doesn't have balance", async () => {
    const { contract, addr1, addr2 } = await loadFixture(deployTokenFixture);

    const transfer = contract.connect(addr1).transfer(addr2, 50);

    await expect(transfer).to.be.revertedWith("Not enough tokens");
  });
});
