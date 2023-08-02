"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_1 = __importDefault(require("../repositories/notes"));
const lib_1 = require("../helpers/lib");
const crypto_1 = require("crypto");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json(notes_1.default.getAll());
});
router.get("/stats", (req, res) => {
    let result = {
        Idea: {
            active: 0,
            archived: 0,
        },
        "Random Thought": {
            active: 0,
            archived: 0,
        },
        Task: {
            active: 0,
            archived: 0,
        },
        Quote: {
            active: 0,
            archived: 0,
        },
    };
    notes_1.default.getAll().forEach((item) => {
        if (item.active) {
            result[item.category].active += 1;
        }
        if (!item.active) {
            result[item.category].archived += 1;
        }
    });
    res.json(result);
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const note = notes_1.default.getById(id);
    if (note) {
        res.json(note);
    }
    else {
        res.sendStatus(404);
    }
});
router.post("/", (req, res) => {
    const noteInputs = req.body;
    const note = Object.assign(Object.assign({}, noteInputs), { created: (0, lib_1.setDate)(), active: true, dates: (0, lib_1.checkForDates)(noteInputs.content), id: (0, crypto_1.randomUUID)() });
    notes_1.default.create(note);
    res.sendStatus(204);
});
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const isSuccess = notes_1.default.delete(id);
    if (isSuccess) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
router.patch("/:id", (req, res) => {
    const id = req.params.id;
    // if (note) {
    //   if (title) {
    //     note.title = title;
    //   }
    //   if (category) {
    //     note.category = category;
    //   }
    //   if (content) {
    //     note.content = content;
    //     note.dates = checkForDates(content);
    //   }
    //   if (active !== undefined) {
    //     note.active = active;
    //   }
    const isSuccess = notes_1.default.update(id, req.body);
    if (isSuccess) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
exports.default = router;
