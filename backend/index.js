import express from "express";
import mongoose from "mongoose";
import { PORT, dBURL } from "./config.js";
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());

/// Routes

app.get("/", (req, res) => {
  console.log(req);
  res.status(234).send("welcomme bookstore api");
});

/// Create New Book Routes

app.post("/books", async (req, res) => {
  try {
    if (!req.body.author || !req.body.title || !req.body.publishYear) {
      return res.status(400).send({ message: "Fill all required fields !" });
    }
    const newBook = {
      author: req.body.author,
      title: req.body.title,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

/// Get All Book Routes

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

/// Get Book By id Routes

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

/// Update Book By id Routes

app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.publishYear || !req.body.author) {
      return res.status(400).send({ message: "Fill all required fields !" });
    }
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body);
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book was updated succesfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

/// Delete Book By id Routes

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);
    if (!deleteBook) {
      return res.status(404).json({ message: "This book is couldn't find !" });
    }
    res.status(200).json({ message: "Book was deleted succesfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.mess });
  }
});

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
