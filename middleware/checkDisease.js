const config = require("../config/db.config"); // Mengimpor konfigurasi database

/**
 * Middleware untuk memeriksa apakah penyakit yang diunggah valid.
 */
const checkDisease = (req, res, next) => {
  const { diseaseId } = req.body; // Mengambil ID penyakit dari body request

  console.log("Received diseaseId:", diseaseId); // Log untuk debugging

  if (!diseaseId) {
    return res.status(400).json({
      error: true,
      message: "Disease ID is required.",
    });
  }

  // Query untuk memeriksa apakah penyakit tersebut ada dalam tabel disease_category
  config.query(
    "SELECT id FROM disease_category WHERE id = ?",
    [diseaseId],
    (error, results) => {
      if (error) {
        // Menangani kesalahan saat query
        return res.status(500).json({
          error: true,
          message: "Database error",
          details: error.message,
        });
      }

      // Jika tidak ada penyakit yang ditemukan
      if (results.length === 0) {
        return res.status(400).json({
          error: true,
          message: "Penyakit yang diunggah tidak valid!",
        });
      }

      // Jika penyakit valid, lanjutkan ke middleware/rute berikutnya
      next();
    }
  );
};

module.exports = checkDisease; // Mengekspor fungsi middleware