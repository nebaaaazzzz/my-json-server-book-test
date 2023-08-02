"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "errorHandler", {
    enumerable: true,
    get: function() {
        return errorHandler;
    }
});
const errorHandler = (err, req, res, next)=>{
    if (process.env.NODE_ENV === "production") {
        return res.status(500).send("Something broke!");
    }
    return res.status(500).send(err.message);
};
