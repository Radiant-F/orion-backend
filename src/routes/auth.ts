import { Router } from "express";
import { signIn, signUp } from "../controller/auth.controller";

const router = Router();

// POST /api/auth/sign-up
router.post("/sign-up", signUp);
// POST /api/auth/sign-in
router.post("/sign-in", signIn);

export default router;
