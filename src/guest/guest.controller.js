const express = require("express");
const {
  getAllGuests,
  getGuestById,
  addGuest,
  getAllPejabat,
  getPejabatById,
  addPejabat,
  updateStatus,
} = require("./guest.service");

const router = express.Router();

// GET: seluruh data tamu
router.get("/", async (req, res) => {
  try {
    const guests = await getAllGuests();
    res.send(guests);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// GET: satu data tamu berdasarkan id
router.get("/:id", async (req, res) => {
  try {
    const guestId = req.params.id;
    const guest = await getGuestById(guestId);
    res.send(guest);
  } catch (error) {
    res.status(400).send(error.message);
  }
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
  }
});

// GET: seluruh data pejabat
router.get("/", async (req, res) => {
  try {
    const pejabat = await getAllPejabat();
    res.send(pejabat);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// GET: satu data pejabat berdasarkan id
router.get("/:id", async (req, res) => {
  try {
    const pejabatId = req.params.id;
    const pejabat = await getPejabatById(pejabatId);
    res.send(pejabat);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// POST: insert data tamu
router.post("/", async (req, res) => {
  try {
    const newPejabat = req.body;
    const pejabat = await addPejabat(newPejabat);

    res.send({
      data: pejabat,
      message: "berhasil mengisi data pejabat",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// PATCH: update status tamu
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminId } = req.body;

    const updatedGuest = await updateStatus(id, status, adminId);

    res.json({
      success: true,
      data: {
        updatedGuest,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
