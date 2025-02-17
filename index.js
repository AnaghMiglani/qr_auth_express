require("dotenv").config();
const express = require("express");
// require("dotenv").config();
console.log("Alchemy URL:", process.env.ALCHEMY_RPC_URL);

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

const nftRoutes = require("./routes/nftRoutes");
app.use("/api", nftRoutes); // Mount NFT routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
