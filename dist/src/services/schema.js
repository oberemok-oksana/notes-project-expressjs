"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNoteSchema = exports.newNoteSchema = void 0;
const yup_1 = require("yup");
exports.newNoteSchema = (0, yup_1.object)({
    title: (0, yup_1.string)().required().min(2),
    category: (0, yup_1.string)().required(),
    content: (0, yup_1.string)().required().min(3),
});
exports.updateNoteSchema = (0, yup_1.object)({
    title: (0, yup_1.string)().min(2),
    category: (0, yup_1.string)(),
    content: (0, yup_1.string)().min(3),
});
