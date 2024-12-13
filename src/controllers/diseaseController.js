const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const predictAndSave = async (req, res) => {
  try {
    // Log for debugging
    console.log("Request Body:", req.body); // Log form data
    console.log("Request File:", req.file); // Log file data

    if (!req.file) {
      return res.status(400).json({
        error: true,
        message: "No file uploaded. Please upload an image.",
      });
    }

    // Send the file to Flask API for prediction
    const flaskApiUrl = process.env.FLASK_API_URL || "http://127.0.0.1:5000/predict";
    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));

    const response = await axios.post(flaskApiUrl, formData, {
      headers: { ...formData.getHeaders() },
    });
    
    // Log the response from Flask API
    console.log("Flask API Response:", response.data); // Log Flask API response

    const { predicted_class, description, treatment, confidence } = response.data;    

    // Validate predicted_class
    if (!predicted_class || typeof predicted_class !== "string") {
      return res.status(400).json({
        error: true,
        message: "Predicted class is invalid or missing.",
      });
    }

    // Save disease category if not exists
    let diseaseCategory = await prisma.diseaseCategory.findFirst({
      where: { name: predicted_class },
    });

    if (!diseaseCategory) {
      diseaseCategory = await prisma.diseaseCategory.create({
        data: {
          name: predicted_class,
          description:
            description ||
            "The accuracy of the prediction is below 65%, so we are unable to display the detected disease. For now, we can only detect 6 diseases. If your dog shows unusual symptoms, please consult a veterinarian directly for a proper diagnosis.",
        },
      });
    }

    // Save the 'periksa' (examination) data
    const periksaData = await prisma.periksa.create({
      data: { image: req.file.path },
    });

    // Save the 'disease_history' data
    const diseaseHistory = await prisma.disease_history.create({
      data: {
        periksa_id: periksaData.id,
        category_id: diseaseCategory.id,
        image: req.file.path,
        date: new Date(),
        description,
        confidence,
      },
    });

    // Delete the file for storage optimization
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });

    // Send the result to the frontend
    res.status(201).json({
      success: true,
      message: "Prediction successful.",
      data: {
        prediction: { predicted_class, description, treatment, confidence },
        history: diseaseHistory,
      },
    });
  } catch (error) {
    console.error("Error during prediction:", error.message);
    res.status(500).json({
      error: true,
      message: "Failed to process prediction.",
      details: error.message,
    });
  }
};

module.exports = {
  predictAndSave,
};
