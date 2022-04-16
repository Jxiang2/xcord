require('dotenv').config();

import http from "http";
import mongoose from "mongoose";
import app from "./app";

const PORT: string | number = process.env.PORT || 8000;
const server: http.Server = http.createServer(app);

// start db and server
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Xcord server is listening on ${PORT}`);
    });
  })
  .catch(err => console.log(err));
