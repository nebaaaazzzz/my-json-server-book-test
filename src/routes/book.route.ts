import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "@src/controller/book.controller";
import { Router } from "express";

const bookRouter = Router();

bookRouter.get("/", getBooks);
bookRouter.post("/", createBook);
bookRouter.get("/:id", getBook);
bookRouter.delete("/:id", deleteBook);
bookRouter.patch("/:id", updateBook);

export default bookRouter;
