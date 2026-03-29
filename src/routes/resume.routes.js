// src/routes/resume.routes.js

import { Router } from "express";
import upload from "../middleware/multer.js";
import { uploadResume } from "../controllers/resume.controller.js";

const router = Router();

router.get("/test", (req, res) => {
  res.send("Resume route working");
});

router.post("/upload", upload.single("file"), uploadResume);

export default router;