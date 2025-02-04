const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Root Route - Instructions
app.get("/", (req, res) => {
  res.json({ message: "Use /api/:date? to get a timestamp." });
});

// API Route: Handles timestamp conversion
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;
  let parsedDate;

  // If no date is provided, use the current timestamp
  if (!date) {
    parsedDate = new Date();
  } else if (/^\d+$/.test(date)) {
    // If date is a number (Unix timestamp), parse it as an integer
    parsedDate = new Date(parseInt(date));
  } else {
    // Otherwise, try parsing it as a string
    parsedDate = new Date(date);
  }

  // Check if the date is valid
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Respond with JSON
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Server listens on port 3000 or the environment-defined port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
