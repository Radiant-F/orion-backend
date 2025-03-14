import { Router } from "express";
import { getAllUsers } from "../controller/user.controller";

const router = Router();

// GET /api/users
router.get("/", getAllUsers);

export default router;
