const multer = require("multer");
const util = require("util");

// Konfigurasi Multer untuk Upload File
const multerConfig = multer({
  storage: multer.memoryStorage(), // File disimpan sementara di memori
  limits: {
    fileSize: 10 * 1024 * 1024, // Batas ukuran file: 10MB
  },
}).single("file"); // Hanya menerima satu file dengan nama "file"

// Mengonversi konfigurasi multer menjadi fungsi berbasis Promise
const processFileConfig = util.promisify(multerConfig);

// Ekspor Konfigurasi
module.exports = { multerConfig, processFileConfig };
