const express = require("express");
const router=express.Router();
const scrapePage =require('../scrapper/page1Scrapper');

router.get("/scrape", async (req, res) => {
    try {
        await scrapePage();
        res.status(200).json({
            msg:"Scraping completed successfully",
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
})

module.exports= router