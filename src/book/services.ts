import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Book from "../book/models";
import { ObjectSchema } from "joi";
import Logging from "../library/Logging";

export const createBook = (req: Request, res: Response, next: NextFunction) => {
  const { author, title } = req.body;

  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    author,
    title,
  });

  return book
    .save()
    .then((book) => res.status(201).json({ book }))
    .catch((error) => res.status(500).json({ error }));
};

export const readBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return Book.findById(bookId)
    .populate("author")
    .then((book) =>
      book
        ? res.status(200).json({ book })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Book.find()
    .then((books) => res.status(200).json({ books }))
    .catch((error) => res.status(500).json({ error }));
};

export const updateBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return Book.findById(bookId)
    .then((book) => {
      if (book) {
        book.set(req.body);

        return book
          .save()
          .then((book) => res.status(201).json({ book }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

export const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return Book.findByIdAndDelete(bookId)
    .then((book) =>
      book
        ? res.status(201).json({ book, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

 export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      Logging.error(error);

      return res.status(422).json({ error });
    }
  };
};


