/* eslint-disable no-console */
require('dotenv').config();
const { ethers } = require('hardhat');

async function main() {
  const BookNFT = await ethers.getContractFactory('BookNFT');
  const book = await BookNFT.deploy();
  await book.deployed();
  console.log('BookNFT deployed to:', book.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


