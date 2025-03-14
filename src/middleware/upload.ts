import multer from "multer";
import path from "path";

// album art destination and filename
const albumArtStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/album_art");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `album-art-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// audio destination and filename
const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/audio");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `audio-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

function albumArtFileFilter(
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  // supported album art format: mime types (jpeg, png, etc.)
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed for album_art."));
  }
  cb(null, true);
}

function audioFileFilter(
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  // supported audio format: mp3, flac, wav
  if (!["audio/mpeg", "audio/flac", "audio/wav"].includes(file.mimetype)) {
    return cb(new Error("Only mp3, flac, or wav files are allowed for audio."));
  }
  cb(null, true);
}

// two different multer upload middlewares
export const uploadAlbumArt = multer({
  storage: albumArtStorage,
  fileFilter: albumArtFileFilter,
});
export const uploadAudio = multer({
  storage: audioStorage,
  fileFilter: audioFileFilter,
});
