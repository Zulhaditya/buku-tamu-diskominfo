const express = require("express");
const {
  getAllGuests
} = require("./guest.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const guests = await getAllGuests();

  res.send(guests);
})

module.exports = router;
