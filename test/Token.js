const { expect } = require("chai");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();
    const contract = await ethers.deployContract("Token");
    const ownerBalance = await contract.balanceOf(owner.address);

    expect(await contract.totalSupply()).to.equal(ownerBalance);
  });
});
