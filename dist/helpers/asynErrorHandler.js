"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "asyncErrorHandler", {
    enumerable: true,
    get: function() {
        return asyncErrorHandler;
    }
});
const asyncErrorHandler = (fn)=>(req, res, next)=>{
        Promise.resolve(fn(req, res, next)).catch(next);
    };
