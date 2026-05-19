const axios = require("axios");
const cheerio = require("cheerio");
const Venue = require("../Models/venue");

const url = "https://www.venuelook.com/pune?page=1";
async function scrapePage() {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/136.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      timeout: 60000,
    });
    const data = response.data;
    // console.log(data);

    const $ = cheerio.load(data);
    const venues = [];

    $(".search_gridView__XItTg").each((index, card) => {
      const name = $(card).find(".cursor_pointer").text().trim();

      const capacity = $(card)
        .find(".search_capacitytxt__bvcAq")
        .first()
        .text()
        .trim();

      const ratingText = $(card)
        .find(".search_listviewlsttxt__Cvpn_")
        .text()
        .trim();

      const rating = parseFloat(ratingText.match(/\d+\.\d+/)?.[0]) || 0;
      const reviewCount = parseInt(ratingText.match(/\(\s*(\d+)/)?.[1]) || 0;

      const vegPrice = Number(
        $(card).find(".search_gridviewDish__HCzqh").text().replace(/\D/g, ""),
      );

      const nonVegPrice = Number(
        $(card)
          .find(".search_gridviewDishsecond__s64Mb")
          .text()
          .replace(/\D/g, ""),
      );

      const location = $(card)
        .find(".search_gridviewRight__o_nVY p")
        .text()
        .trim();

      const image = $(card).find(".search_maingridimg__6STac img").attr("src");

      const href = $(card).find("a").first().attr("href");

      const venueUrl = href ? "https://www.venuelook.com" + href : "";

      venues.push({
        name,
        capacity,
        rating,
        reviewCount,
        vegPrice,
        nonVegPrice,
        location,
        image,
        venueUrl,
      });
    });

    console.log(venues);
    console.log(venues.length);

    for (const venue of venues) {
      await Venue.findOneAndUpdate(
        {
          venueUrl: venue.venueUrl,
        },
        venue,
        {
          upsert: true,
          returnDocument: "after", // this means it will return the updated document after the update is applied
        },
      );
    }
    console.log("Page scraped and data stored successfully"); 

    
  } catch (e) {
    console.error(e);
    console.log("Error scraping the page");
  }
}

module.exports=scrapePage
