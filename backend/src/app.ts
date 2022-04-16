import express from 'express';
import cors from "cors";
import morgan from "morgan";

import type { Request, Response } from "express";

const app: express.Application = express();

// middlewares
app.use(morgan("combined"));
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ "message": "hello world!" });
});

export default app;