const axios = require("axios");
const fs = require("fs");

exports.getPrediction = async (filePath) => {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));

    const response = await axios.post("http://localhost:5000/predict", formData, {
        headers: formData.getHeaders(),
    });

    return response.data;
};
