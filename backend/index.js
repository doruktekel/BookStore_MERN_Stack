import express from "express";
import mongoose from "mongoose";
import { PORT, dbURL } from "./config.js";

const app = express();

/// Routes

app.get("/", (req, res) => {
  console.log(req);
  res.status(234).send("welcomme ich lumme");
});

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("dB Connection was succesfull");
    app.listen(PORT, () => {
      console.log(`${PORT} Port is listening`);
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
