import express from 'express';
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";

const app: express.Application = express();

// middlewares
app.use(morgan("combined"));
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
export default app;