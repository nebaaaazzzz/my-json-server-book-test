"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _indexroute = /*#__PURE__*/ _interop_require_default(require("./routes/index.route"));
const _errorHandler = require("./helpers/errorHandler");
const _db = /*#__PURE__*/ _interop_require_default(require("./config/db"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_db.default.connect((err)=>{
    if (err) {
        console.error("Error connecting to the database:", err.message);
        return;
    }
    const app = (0, _express.default)();
    app.use(_express.default.json());
    app.use("/", _indexroute.default);
    app.use(_errorHandler.errorHandler);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, ()=>{
        console.log("Connected to the database!");
        console.log(`Server is running. ${PORT}`);
    });
    process.on("unhandledRejection", (reason, promise)=>{
        console.log(`Unhandled Rejection at: ${reason} ${promise}`);
    });
    process.on("uncaughtException", (error)=>{
        console.log(`Uncaught Exception at: ${error}`);
        process.exit(1);
    });
    process.on("SIGTERM", ()=>{
        console.log(`SIGTERM`);
        process.exit(0);
    });
    process.on("SIGINT", ()=>{
        console.log(`SIGINT`);
        process.exit(0);
    });
});
