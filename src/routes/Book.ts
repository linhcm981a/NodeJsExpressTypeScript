import express from "express";
import {
  createBook,
  readBook,
  readAll,
  updateBook,
  deleteBook,
  ValidateJoi
} from "../book/services";
import { Schemas } from "../book/validators";

const router = express.Router();

router.post("/create", ValidateJoi(Schemas.book.create), createBook);
router.get("/:bookId", readBook);
router.get("/", readAll);
router.patch("/:bookId", ValidateJoi(Schemas.book.update), updateBook);
router.delete("/:bookId", deleteBook);

export = router;
