// Load environment variables
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// Import necessary modules
const mongoose = require("mongoose");
const next = require("next");
const backendApp = require("./app"); // Import your backend routes (app.js)
const express = require("express");
// Set up development mode for Next.js
const dev = process.env.NODE_ENV !== "production";
const server = next({ dev });
const handle = server.getRequestHandler(); // Next.js request handler

// Connect to MongoDB
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB Connection Successfully");
  })
  .catch((err) => {
    console.error("DB Connection Error: ", err);
  });


const port = process.env.PORT || 3000;
// Prepare Next.js server
server.prepare().then(() => {
  // Create a new express app to handle both Next.js and API routes
  const app = express();

  // Mount the backend routes first (from app.js)
  app.use("/api", backendApp);

  // Fallback to Next.js for other routes
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  // Start the server
  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running on http://localhost:${port}`);
  });
});
