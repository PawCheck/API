const express = require("express");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/articles", articleRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
