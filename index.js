require("dotenv").config();
const express = require("express");

console.log("Alchemy URL:", process.env.ALCHEMY_RPC_URL);

const app = express();
app.use(express.json());

const nftRoutes = require("./routes/nftRoutes");
app.use("/api", nftRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
