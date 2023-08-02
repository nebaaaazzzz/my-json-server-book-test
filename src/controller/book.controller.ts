import dbconnection from "@src/config/db";
import { asyncErrorHandler } from "@src/helpers/asynErrorHandler";
import { NextFunction } from "connect";
import { Request, Response } from "express";

export const getBooks = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const offset = (page - 1) * limit;
    const query = `SELECT * FROM books LIMIT ${limit} OFFSET ${offset}`;
    const [books] = await dbconnection.promise().query(query);
    res.send({
      data: books,
    });
  }
);
export const getBook = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const query = `SELECT * FROM books WHERE id=${id}`;
    const [books] = await dbconnection.promise().query(query);
    res.send({
      data: Array.isArray(books) && books.length ? books[0] : books,
    });
  }
);
export const createBook = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, price, discountRate, coverImage } = req.body;
    const query = `INSERT INTO books (title, description, discountRate, price) VALUES ('${title}', '${description}',${discountRate},${price})`;
    const [books] = await dbconnection.promise().query(query);
    if ("insertId" in books) {
      const sQuery = `SELECT * FROM books WHERE id=${books["insertId"]}`;
      const [sbooks] = await dbconnection.promise().query(sQuery);
      res.send({
        data: Array.isArray(sbooks) && sbooks.length ? sbooks[0] : books,
      });
    }
    res.send({
      data: books,
    });
  }
);
export const updateBook = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, description, price, discountRate, coverImage } = req.body;
    const query = `UPDATE books SET title='${title}', description='${description}', discountRate=${discountRate}, price=${price} WHERE id=${id}`;
    const [books] = await dbconnection.promise().query(query);
    const sQuery = `SELECT * FROM books WHERE id=${id}`;
    const [sbooks] = await dbconnection.promise().query(sQuery);
    console.log(sbooks);
    res.send({
      data: Array.isArray(sbooks) && sbooks.length ? sbooks[0] : books,
    });
  }
);
export const deleteBook = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const query = `DELETE FROM books WHERE id=${id}`;
    const [books] = await dbconnection.promise().query(query);
    res.send({
      success: true,
    });
  }
);
// Path: src/controller/book.controller.ts
