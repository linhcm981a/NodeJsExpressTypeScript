import { NextFunction, Request, Response } from "express";
import Author from "../author/models";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return Author.find()
    .then((authors) => res.status(200).json({ authors }))
    .catch((error) => res.status(500).json({ error }));
};
