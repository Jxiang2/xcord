import express from "express";
import authControllers from "../controllers/auth.controllers";
import type { Router } from "express";

const router: Router = express.Router();

router.post("/register", authControllers.postRegister);
router.post("/login", authControllers.postLogin);

export default router;
