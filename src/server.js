import express from "express";
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectdb from "./database/db.js";
import path from "path";
import { fileURLToPath } from "url";

const port = process.env.PORT || 5000;

// ✅ Fix __dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve frontend (public folder OUTSIDE src)
app.use(express.static(path.join(__dirname, "../public")));

connectdb()
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });