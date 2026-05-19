const express = require("express");
const router = express.Router();

const Venue = require("../Models/venue");

router.post("/test", async (req, res) => {
  try {
    const venue = await Venue.create({
      name: "Royal Palace Lawn",
      location: "Wakad",
      rating: 4.5,
      capacity: 500,
      foodPrice: 700,
      hallPrice: 20000,
      phoneNumber: "9876543210",
      roomsAvailable: 10,
      image: "test.jpg",
      venueUrl: "https://example.com/royal-palace",
    });

    if (!venue) {
      res.send("Venue not created");
    }
    res.json(venue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
