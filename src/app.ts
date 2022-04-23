import express from 'express';
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routers";
import type { Application } from "express";

const app: Application = express();

// middlewares
app.use(morgan("combined"));
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
export default app;