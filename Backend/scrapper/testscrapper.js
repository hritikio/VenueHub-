const axios = require("axios");
const fs =  require("fs")
async function testScrapper() {
  try {
    const url = "https://www.venuelook.com/pune";

    const response = await axios.get(url);
    console.log(response.data);
    console.log("Page scraped successfully");

    // console.log(response.data.substring(0, 2000)); // Print the first 500 characters of the response
    // fs.writeFileSync("page.html", response.data);
    // console.log("Page saved to page.html");
  } catch (e) {
    console.error(e);
  }
}

testScrapper();
