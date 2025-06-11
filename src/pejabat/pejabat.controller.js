const express = require("express");
const {
  getAllPejabat,
  getPejabatById,
  addPejabat,
  updatePejabatById,
  partialUpdatePejabatById,
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

// PUT: update data pejabat berdasarkan id
router.put("/:id", async (req, res) => {
  try {
    const pejabatId = req.params.id;
    const dataPejabat = req.body;

    const pejabat = await updatePejabatById(pejabatId, dataPejabat);

    res.send({
      data: pejabat,
      message: "berhasil edit data pejabat",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// PATCH : update beberapa bagian data pejabat
router.patch("/:id", async (req, res) => {
  try {
    const pejabatId = req.params.id;
    const dataPejabat = req.body;

    if (!dataPejabat || Object.keys(dataPejabat).length === 0) {
      return res
        .status(400)
        .send("Tidak ada data yang dikirim untuk diupdate!");
    }

    const pejabat = await partialUpdatePejabatById(pejabatId, dataPejabat);
    res.send({
      data: pejabat,
      message: "Berhasil update sebagian data pejabat.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
