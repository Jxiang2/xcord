import type {Application} from "express";
import express from 'express';
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routers";
import friendInviteRoutes from "./routes/friendInvite.routers";

const app: Application = express();

// middlewares
app.use(morgan("combined"));
app.use(express.json());
app.use(cors());

// routes
app.use("/api/friend-invite", friendInviteRoutes);
app.use("/api/auth", authRoutes);
export default app;