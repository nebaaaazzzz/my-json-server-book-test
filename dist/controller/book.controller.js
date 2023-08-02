"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getBooks: function() {
        return getBooks;
    },
    getBook: function() {
        return getBook;
    },
    createBook: function() {
        return createBook;
    },
    updateBook: function() {
        return updateBook;
    },
    deleteBook: function() {
        return deleteBook;
    }
});
const _db = /*#__PURE__*/ _interop_require_default(require("../config/db"));
const _asynErrorHandler = require("../helpers/asynErrorHandler");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getBooks = (0, _asynErrorHandler.asyncErrorHandler)(async (req, res, next)=>{
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const offset = (page - 1) * limit;
    const query = `SELECT * FROM books LIMIT ${limit} OFFSET ${offset}`;
    const [books] = await _db.default.promise().query(query);
    res.send({
        data: books
    });
});
const getBook = (0, _asynErrorHandler.asyncErrorHandler)(async (req, res, next)=>{
    const { id } = req.params;
    const query = `SELECT * FROM books WHERE id=${id}`;
    const [books] = await _db.default.promise().query(query);
    res.send({
        data: Array.isArray(books) && books.length ? books[0] : books
    });
});
const createBook = (0, _asynErrorHandler.asyncErrorHandler)(async (req, res, next)=>{
    const { title, description, price, discountRate, coverImage } = req.body;
    const query = `INSERT INTO books (title, description, discountRate, price) VALUES ('${title}', '${description}',${discountRate},${price})`;
    const [books] = await _db.default.promise().query(query);
    if ("insertId" in books) {
        const sQuery = `SELECT * FROM books WHERE id=${books["insertId"]}`;
        const [sbooks] = await _db.default.promise().query(sQuery);
        res.send({
            data: Array.isArray(sbooks) && sbooks.length ? sbooks[0] : books
        });
    }
    res.send({
        data: books
    });
});
const updateBook = (0, _asynErrorHandler.asyncErrorHandler)(async (req, res, next)=>{
    const { id } = req.params;
    const { title, description, price, discountRate, coverImage } = req.body;
    const query = `UPDATE books SET title='${title}', description='${description}', discountRate=${discountRate}, price=${price} WHERE id=${id}`;
    const [books] = await _db.default.promise().query(query);
    const sQuery = `SELECT * FROM books WHERE id=${id}`;
    const [sbooks] = await _db.default.promise().query(sQuery);
    console.log(sbooks);
    res.send({
        data: Array.isArray(sbooks) && sbooks.length ? sbooks[0] : books
    });
});
const deleteBook = (0, _asynErrorHandler.asyncErrorHandler)(async (req, res, next)=>{
    const { id } = req.params;
    const query = `DELETE FROM books WHERE id=${id}`;
    const [books] = await _db.default.promise().query(query);
    res.send({
        success: true
    });
}); // Path: src/controller/book.controller.ts
