const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all articles
const getAllArticles = async (req, res) => {
  try {
    const articles = await prisma.article.findMany();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
};

// Get article by ID
const getArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
    });
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch article" });
  }
};

// Create a new article
const createArticle = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newArticle = await prisma.article.create({
      data: { title, content, author },
    });
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: "Failed to create article" });
  }
};

// Update an article by ID
const updateArticleById = async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  try {
    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: { title, content, author },
    });

    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: "Failed to update article" });
  }
};

// Delete an article by ID
const deleteArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.article.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete article" });
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticleById,
  deleteArticleById,
};
