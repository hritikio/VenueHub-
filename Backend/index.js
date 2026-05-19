const express = require('express');
const connectDB = require('./Config/db');
const venue = require('./Models/venue');
const venueRoutes = require('./routes/venueRoutes');
const scrapeRoute=require('./routes/scrapeRoute')
require('dotenv').config();
connectDB();

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use('/api/venues', venueRoutes);
app.use('/api', scrapeRoute);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 5000');
});