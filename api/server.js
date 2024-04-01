const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { json } = require("body-parser");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(json());

dotenv.config(); // Load environment variables from .env file

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env; // Destructure environment variables

const BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources`; // Corrected BASE_URL

const auth = {
  username: API_KEY,
  password: API_SECRET,
};

app.get("/photos", async (req, res) => {
  try {
    const response = await axios.get(BASE_URL, {
      auth,
    });
    return res.send(response.data);
  } catch (error) {
    console.error("Error fetching photos:", error);
    return res.status(500).json({ error: "Failed to fetch photos" });
  }
});

const PORT = 7000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
