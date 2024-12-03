const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); // To securely load your API key from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for the frontend (adjust as needed)
app.use(cors());

// Endpoint for Distance Matrix API
app.get("/api/distance", async (req, res) => {
  const { origins, destinations } = req.query;

  try {
    // Construct the URL for the Google Maps Distance Matrix API
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json`;
    const params = {
      origins,
      destinations,
      units: "metric",
      key: "AIzaSyA-URAEuuH3T3CXisPpNT9csF1e-ZgOUKY",
    };

    // Make the API request to Google Maps
    const response = await axios.get(url, { params });

    // Return the response from the API to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error calling Distance Matrix API:", error);
    res.status(500).send("Error calling Distance Matrix API");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`port: ${PORT}`);
});
