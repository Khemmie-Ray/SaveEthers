import { loadFixture, } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { parseEther } from "ethers";

describe("SaveEther", function () {
  async function deploySaveEtherFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const SaveEther = await ethers.getContractFactory("SaveEther");
    const { deposit, withdraw, checkSavings, sendOutSaving, checkContractBal } = await SaveEther.deploy();

    return { deposit, withdraw, checkSavings, sendOutSaving, checkContractBal, owner, otherAccount };
  }

  describe("Deposit", function () {
    it("Should be able to deposit tokens", async function () {
      const { deposit, checkContractBal, } = await loadFixture(deploySaveEtherFixture);
      await deposit({value: ethers.parseEther("2")})
     
      expect(await checkContractBal()).to.equal("2000000000000000000");
    });

    //   it("Should revert if msg.sender is address 0", async function () {
    //   const { deposit } = await loadFixture(deploySaveEtherFixture);
      
    //   await expect(deposit({owner: "0x0",})).to.be.revertedWith("No zero address call");
    // })

    it("Should revert if vslue is 0", async function () {
      const { deposit } = await loadFixture(deploySaveEtherFixture);
      
      await expect(deposit({value: 0,})).to.be.revertedWith("can't save zero value");
    })
    });

    describe("Withdraw", function () {
      it("Should be able to withdraw tokens", async function () {
        const { deposit, withdraw, checkContractBal, } = await loadFixture(deploySaveEtherFixture);
        await deposit({value: ethers.parseEther("1")})
       
        const balanceBeforeWithdrawal = await checkContractBal();
        expect(balanceBeforeWithdrawal).to.equal("1000000000000000000");

        const tx = await withdraw();
        await tx.wait();

        const balanceAfterWithdrawal = await checkContractBal();
        expect(balanceAfterWithdrawal).to.equal("0");
      });
  
      it("Amount should be greater than zero", async function () {
        const { withdraw } = await loadFixture(deploySaveEtherFixture);
        await expect(withdraw()).to.be.rejectedWith("you don't have any savings");
      });
    });

});
