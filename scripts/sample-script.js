
const hre = require("hardhat");

async function main() {

  const MintExample = await hre.ethers.getContractFactory("MintExample");
  const mintExample = await MintExample.deploy("Minter", "MINT");

  await mintExample.deployed();

  console.log("MintExample deployed to:", mintExample.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
