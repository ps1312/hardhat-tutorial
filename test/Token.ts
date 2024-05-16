import { ethers } from "hardhat";
import { expect } from "chai";

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();
    const contract = await ethers.deployContract("Token");
    const ownerBalance = await contract.balanceOf(owner.address);

    expect(await contract.totalSupply()).to.equal(ownerBalance);
  });

  it("Should allow token transfer between accounts", async () => {
    const [, addr1, addr2] = await ethers.getSigners();
    const contract = await ethers.deployContract("Token");

    await contract.transfer(addr1, 50);
    expect(await contract.balanceOf(addr1)).to.equal(50);

    await contract.connect(addr1).transfer(addr2, 50);
    expect(await contract.balanceOf(addr1)).to.equal(0);
    expect(await contract.balanceOf(addr2)).to.equal(50);
  });
});
