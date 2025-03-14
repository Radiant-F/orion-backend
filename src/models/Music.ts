import { Schema, model, Document, Types } from "mongoose";

export interface IMusic extends Document {
  user: Types.ObjectId;
  title: string;
  album?: string;
  description?: string;
  genre: string[];
  releaseYear?: number;
  album_art?: string;
  audio: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const MusicSchema = new Schema<IMusic>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    album: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    genre: {
      type: [String],
      validate: {
        validator: (value: string[]) =>
          value.every((genreItem) => /^[A-Za-z\s]+$/.test(genreItem)),
        message: "genres must be alphabets only.",
      },
      default: [],
    },
    releaseYear: {
      type: Number,
      min: [1900, "release year cannot be before 1900"],
      max: [3000, "release year cannot be after 3000"],
    },
    album_art: {
      type: String,
    },
    audio: {
      type: String,
      required: [true, "audio file is required"],
    },
  },
  { timestamps: true }
);

export default model<IMusic>("Music", MusicSchema);
