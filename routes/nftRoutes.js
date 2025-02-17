const express = require("express");
const router = express.Router();
const nftService = require("../services/nftService");

// Mint NFT Route
router.post("/mint", async (req, res) => {
  console.log("Received Request Body:", req.body); // Check what's received

  const { serialNumber, tokenURI } = req.body;
  console.log("Extracted Values:", { serialNumber, tokenURI });

  if (!serialNumber || !tokenURI) {
    return res
      .status(400)
      .json({ success: false, message: "Missing parameters" });
  }

  try {
    const txHash = await nftService.mintNft(serialNumber, tokenURI);
    res.status(200).json({ success: true, transactionHash: txHash });
  } catch (error) {
    console.error("Minting Error:", error); // Log error
    res.status(500).json({ success: false, message: error.message });
  }
});

// Transfer NFT Route
router.post("/transfer", async (req, res) => {
  const { to, serialNumber } = req.body;

  if (!to || !serialNumber) {
    return res
      .status(400)
      .json({ success: false, message: "Missing parameters" });
  }

  try {
    const txHash = await nftService.transferNft(to, serialNumber);
    res.status(200).json({ success: true, transactionHash: txHash });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
