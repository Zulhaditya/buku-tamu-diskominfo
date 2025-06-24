const express = require("express");
const multer = require("multer");
const path = require("path");
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

// Konfigurasi penyimpanan menggunakan multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/guest-photos/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
}).single("foto");

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
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send(err.message);
      }

      const newGuest = {
        ...req.body,
        foto: req.file ? req.file.path : null,
        pejabatId: parseInt(req.body.pejabatId),
      };

      const guest = await addGuest(newGuest);
      res.send({
        data: guest,
        message: "berhasil mengisi buku tamu",
      });
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).send("Terjadi kesalahan server");
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
