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
const _bookroute = /*#__PURE__*/ _interop_require_default(require("./book.route"));
const _express = require("express");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const mainRouter = (0, _express.Router)();
mainRouter.use("/books", _bookroute.default);
const _default = mainRouter;
