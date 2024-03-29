import { ethers } from "hardhat";

async function main() {

  const saveEther = await ethers.deployContract("SaveEther");

  await saveEther.waitForDeployment();

  console.log(
    `SaveEther has been deployed to ${saveEther.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
