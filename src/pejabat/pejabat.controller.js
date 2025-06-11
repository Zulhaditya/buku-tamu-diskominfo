const express = require("express");
const {
  getAllPejabat,
  getPejabatById,
  addPejabat,
} = require("./pejabat.service");

const router = express.Router();

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

module.exports = router;
