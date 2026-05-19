const express = require("express");
const connectDB = require("./Config/db");
const scrapeRoute = require("./routes/scrapeRoute");
const scrapeAllPage = require("./scrapper/pageScrapper");
const venueRoutes = require("./routes/venueRoutes");
require("dotenv").config();
connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/api", scrapeRoute);
app.use("/api/venues",venueRoutes)

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
});
