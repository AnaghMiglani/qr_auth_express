require("dotenv").config();
const { ethers } = require("ethers");

// Initialize Provider & Wallet
const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Load Contract
const contractABI = require("../abi.json");
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractABI,
  wallet
);

// Mint NFT Function
async function mintNft(serialNumber, tokenURI) {
  try {
    const tx = await contract.mintNft(serialNumber, tokenURI);
    await tx.wait();
    console.log(`Minted NFT with TX: ${tx.hash}`);
    return tx.hash;
  } catch (error) {
    console.error("Minting Error:", error);
    throw new Error("Failed to mint NFT");
  }
}

// Transfer NFT Function
async function transferNft(to, serialNumber) {
  try {
    const tx = await contract.transferNft(to, serialNumber);
    await tx.wait();
    console.log(`Transferred NFT with TX: ${tx.hash}`);
    return tx.hash;
  } catch (error) {
    console.error("Transfer Error:", error);
    throw new Error("Failed to transfer NFT");
  }
}

module.exports = { mintNft, transferNft };
