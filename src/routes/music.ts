import { Router } from "express";
import { createMusic, getMyMusics } from "../controller/music.controller";
import { requireAuth } from "../middleware/auth";
import multer from "multer";

const router = Router();

const upload = multer({ dest: "uploads/" });

// POST /api/music
router.post(
  "/",
  requireAuth,
  upload.fields([
    { name: "album_art", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  createMusic
);

// GET /api/music
router.get("/", requireAuth, getMyMusics);

export default router;
