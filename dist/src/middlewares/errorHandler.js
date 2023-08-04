"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const lib_1 = require("../helpers/lib");
const NotFoundError_1 = __importDefault(require("../errors/NotFoundError"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof NotFoundError_1.default) {
        res.sendStatus(404);
    }
    if (err instanceof yup_1.ValidationError) {
        res.status(422).json({ errors: (0, lib_1.formatYupErrors)(err) });
    }
    next();
};
exports.default = errorHandler;
