import { RequestHandler } from "express";
import Music from "../models/Music";

export const createMusic: RequestHandler = async (req, res, next) => {
  try {
    const { title, album, description, genre, releaseYear, userId } = req.body;

    if (!title) {
      res.status(400).json({ error: "Title is required." });
      return;
    }

    let genreArray: string[] = [];
    if (genre) {
      if (!Array.isArray(genre)) {
        res.status(400).json({ error: "Genre must be an array of strings." });
        return;
      }
      genreArray = genre;
    }

    // validate files
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const albumArtFile = files["album_art"]?.[0];
    const audioFile = files["audio"]?.[0];

    if (!audioFile) {
      res.status(400).json({ error: "Audio file is required." });
      return;
    }

    const musicData = {
      user: userId,
      title,
      album,
      description,
      genre: genreArray,
      releaseYear: releaseYear ? parseInt(releaseYear, 10) : undefined,
      album_art: albumArtFile ? albumArtFile.path : undefined,
      audio: audioFile.path,
    };

    const newMusic = await Music.create(musicData);
    res.status(201).json({
      message: "Music uploaded successfully.",
      music: newMusic,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getMyMusics: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.body.userId; // from auth middleware
    const musics = await Music.find({ user: userId }).sort({ createdAt: -1 });
    res.json(musics);
    return;
  } catch (error) {
    next(error);
  }
};
