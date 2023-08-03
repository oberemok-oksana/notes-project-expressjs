"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_1 = __importDefault(require("../repositories/notes"));
const lib_1 = require("../helpers/lib");
const crypto_1 = require("crypto");
const schema_1 = require("../services/schema");
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
    res.json(note);
});
router.post("/", (req, res) => {
    schema_1.newNoteSchema.validateSync(req.body, { abortEarly: false });
    const { title, category, content } = req.body;
    const note = {
        title,
        category,
        content,
        created: (0, lib_1.setDate)(),
        active: true,
        dates: (0, lib_1.checkForDates)(content),
        id: (0, crypto_1.randomUUID)(),
    };
    notes_1.default.create(note);
    res.sendStatus(204);
});
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    notes_1.default.delete(id);
    res.sendStatus(204);
});
router.patch("/:id", (req, res) => {
    const id = req.params.id;
    schema_1.updateNoteSchema.validateSync(req.body, { abortEarly: false });
    notes_1.default.update(id, req.body);
    res.sendStatus(204);
});
exports.default = router;
