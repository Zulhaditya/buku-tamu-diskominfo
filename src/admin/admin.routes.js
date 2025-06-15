const express = require("express");
const { updateAdminProfile, login, register } = require("./admin.controller");
const router = express.Router();

// login
router.post("/login", login);

// registrasi
router.post("/register", register);

// update
router.put("/:id", updateAdminProfile);

module.exports = router;
