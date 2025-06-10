const express = require("express");
const {
  getAllGuests,
  getGuestById,
  addGuest,
} = require("./guest.service");

const router = express.Router();

// GET: seluruh data tamu
router.get("/", async (req, res) => {
  try {
    const guests = await getAllGuests();
    res.send(guests);

  } catch (error) {
    res.status(400).send(error.message);
  };
});

// GET: satu data tamu berdasarkan id
router.get("/:id", async (req, res) => {
  try {
    const guestId = req.params.id;
    const guest = await getGuestById(guestId);
    res.send(guest);

  } catch (error) {
    res.status(400).send(error.message);
  };
});

// POST: insert data tamu
router.post("/", async (req, res) => {
  try {
    const newGuest = req.body;
    const guest = await addGuest(newGuest);

    res.send({
      data: guest,
      message: "berhasil mengisi buku tamu",
    });
  } catch (error) {
    res.status(400).send(error.message);
  };
});

module.exports = router;
