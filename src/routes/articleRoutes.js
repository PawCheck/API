const express = require("express");
const {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticleById,
  deleteArticleById,
} = require("../controllers/articleController");
const router = express.Router();

// GET all articles
router.get("/", getAllArticles);

// GET article by ID
router.get("/:id", getArticleById);

// POST create a new article
router.post("/", createArticle);

// PUT update an article by ID
router.put("/:id", updateArticleById);

// DELETE remove an article by ID
router.delete("/:id", deleteArticleById);

module.exports = router;
