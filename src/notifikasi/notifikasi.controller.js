const express = require("express");
const { notifikasiPejabat } = require("./notifikasi.service");
const router = express.Router();

// GET: mengambil semua notifikasi milik pejabat tertentu
router.get("/pejabat/:id", async (req, res) => {
  try {
    const pejabatId = req.params.id;
    const pejabat = await notifikasiPejabat(pejabatId);
    res.send(pejabat);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
