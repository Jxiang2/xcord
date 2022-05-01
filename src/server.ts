import {registerSocketServer} from "./socketServer";
import mongoose from "mongoose";
import app from "./app";
import type {Server} from "http";
import http from "http";

require('dotenv').config();

const PORT: string = process.env.PORT || "8000";

const server: Server = http.createServer(app);
registerSocketServer(server);

// connect to db and start server
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`X cord server is listening on ${PORT}`);
    });
  })
  .catch(err => console.log(err));
