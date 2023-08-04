"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notesService_1 = __importDefault(require("../services/notesService"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json(notesService_1.default.getAll());
});
router.get("/stats", (req, res) => {
    res.json(notesService_1.default.getStats());
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const note = notesService_1.default.getById(id);
    res.json(note);
});
router.post("/", (req, res) => {
    notesService_1.default.create(req.body);
    res.sendStatus(204);
});
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    notesService_1.default.delete(id);
    res.sendStatus(204);
});
router.patch("/:id", (req, res) => {
    const id = req.params.id;
    notesService_1.default.update(id, req.body);
    res.sendStatus(204);
});
exports.default = router;
