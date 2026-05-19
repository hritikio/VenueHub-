const express = require("express");
const router = express.Router();
const scrapeAllPage = require("../scrapper/pageScrapper");

router.get("/scrape", async (req, res) => {
  try {
    await scrapeAllPage();
    res.status(200).json({
      msg: "Scraping for all pages completed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
