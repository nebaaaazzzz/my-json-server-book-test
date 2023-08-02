import bookRouter from "./book.route";
import { Router } from "express";

const mainRouter = Router();

mainRouter.use("/books", bookRouter);

export default mainRouter;
