// src/routes/diseaseRoutes.js
const express = require("express");
const multer = require("multer");
const diseaseController = require("../controllers/diseaseController");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/predict", upload.single("image"), diseaseController.predictAndSave);

module.exports = router;
