import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import musicRoutes from "./routes/music";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

// route: auth
app.use("/api/auth", authRoutes);

// route: user
app.use("/api/users", userRoutes);

// route: music
app.use("/api/music", musicRoutes);

// global error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("aaaaa catastrophic error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
