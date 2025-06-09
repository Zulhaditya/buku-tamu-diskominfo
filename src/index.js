const express = require("express");
const dotenv = require("dotenv");
const guestController = require("./guest/guest.controller");
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use("/guests", guestController);

app.listen(PORT, () => {
  console.log("Express API Buku Tamu sudah berjalan di port:" + PORT);
})
