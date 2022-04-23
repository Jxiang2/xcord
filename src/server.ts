require('dotenv').config();

import mongoose from "mongoose";
import app from "./app";
import http from "http";
import type { Server } from "http";

const PORT: string = process.env.PORT || "8000";
const server: Server = http.createServer(app);

// connect to db and start server
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`X cord server is listening on ${PORT}`);
    });
  })
  .catch(err => console.log(err));
