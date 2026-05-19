const express = require("express");
const router = express.Router();

const Venue = require("../Models/venue");


router.get('/',async(req,res)=>{
   try {

    const venues = await Venue.find();

    res.json(venues);

  } 
  catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error fetching venues" });
  }
})



module.exports = router;
