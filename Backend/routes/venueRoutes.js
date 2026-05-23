const express = require("express");
const router = express.Router();

const Venue = require("../Models/venue");


router.get('/',async(req,res)=>{
   try {
    const query ={}
    const {search,location,minRating }=req.query
    // console.log(`min rating is ${minRating}`)
    // console.log(`type of min rating is ${typeof minRating}`)

    if(search){
      query.name={
        $regex:search,
        $options:'i' // i means case-insensitive
      }
    }

    if (location) {
      query.location = {
        $regex: location,
        $options: "i", // i means case-insensitive
      };
    }

    if(minRating){
      query.rating={
        $gte:Number(minRating)
      }
    }

    const venues = await Venue.find(query);

    res.json(venues);

  } 
  catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error fetching venues" });
  }
})



module.exports = router;
