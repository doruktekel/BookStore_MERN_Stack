import express from "express";
import mongoose from "mongoose";
import { PORT, dBURL } from "./config.js";
import booksRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();

/// MIDDLEWARE for parsing request body

app.use(express.json());

/// MIDDLEWARE for cors
/// 1.WAY Allow all origins
app.use(cors());
/// 2.WAY Allow all origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["POST", "GET", "DELETE", "PUT"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  res.status(234).send("welcomme bookstore api");
});

/// Routes

app.use("/books", booksRoute);

/// dB Connection & Port Listening

mongoose
  .connect(dBURL)
  .then(() => {
    console.log("dB Connection was succesfull");
    app.listen(PORT, () => {
      console.log(`${PORT} Port is listening`);
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
