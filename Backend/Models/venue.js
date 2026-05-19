const mongoose = require("mongoose");

// by default if not mentioned the fileds are optional in mongoose schema, 
// so we need to explicitly mention required:true for mandatory fields.
const venueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
    },


    reviewCount:Number,

    capacity: {
      type: String,
     
      required: true,
    },

    vegPrice: Number,

    nonVegPrice: Number,

    hallPrice: Number,

    phoneNumber: String,

    image: {
      type: String,
      required: true,
    },

    venueUrl: {
      type: String,
      required: true,
      unique: true,
    },

    source: {
      type: String,
      default: "VenueLook",
    },

    lastScrapedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Venue", venueSchema);
