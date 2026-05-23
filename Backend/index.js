const express = require("express");
const app = express();
const connectDB = require("./Config/db");
const scrapeRoute = require("./routes/scrapeRoute");
const scrapeAllPage = require("./scrapper/pageScrapper");
const venueRoutes = require("./routes/venueRoutes");
require("dotenv").config();
connectDB();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/api", scrapeRoute);
app.use("/api/venues", venueRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
});
