import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Author from "../author/models";
import { ObjectSchema } from "joi";
import Logging from "../library/Logging";

export const createAuthor = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  const author = new Author({
    _id: new mongoose.Types.ObjectId(),
    name,
  });

  return author
    .save()
    .then((author) => res.status(201).json({ author }))
    .catch((error) => res.status(500).json({ error }));
};

export const readAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;

  return Author.findById(authorId)
    .then((author) =>
      author
        ? res.status(200).json({ author })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Author.find()
    .then((authors) => res.status(200).json({ authors }))
    .catch((error) => res.status(500).json({ error }));
};

export const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;

  return Author.findById(authorId)
    .then((author) => {
      if (author) {
        author.set(req.body);

        return author
          .save()
          .then((author) => res.status(201).json({ author }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

export const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;

  return Author.findByIdAndDelete(authorId)
    .then((author) =>
      author
        ? res.status(201).json({ author, message: "Deleted" })
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
