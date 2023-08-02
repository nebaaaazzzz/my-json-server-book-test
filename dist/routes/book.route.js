"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _bookcontroller = require("../controller/book.controller");
const _express = require("express");
const bookRouter = (0, _express.Router)();
bookRouter.get("/", _bookcontroller.getBooks);
bookRouter.post("/", _bookcontroller.createBook);
bookRouter.get("/:id", _bookcontroller.getBook);
bookRouter.delete("/:id", _bookcontroller.deleteBook);
bookRouter.patch("/:id", _bookcontroller.updateBook);
const _default = bookRouter;
