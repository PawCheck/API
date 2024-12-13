// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const diseaseRoutes = require("./src/routes/diseaseRoutes");

const app = express();
const PORT = 3000;

app.use(cors("*"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Gunakan prefix '/disease' untuk semua rute
app.use("/disease", diseaseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}/`);
});
