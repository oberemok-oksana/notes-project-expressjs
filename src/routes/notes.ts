import express, { Request, Response } from "express";
import notesRepository from "../repositories/notes";
import { checkForDates, formatYupErrors, setDate } from "../helpers/lib";
import { randomUUID } from "crypto";
import { newNoteSchema, updateNoteSchema } from "../services/schema";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json(notesRepository.getAll());
});

router.get("/stats", (req: Request, res: Response) => {
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

  notesRepository.getAll().forEach((item) => {
    if (item.active) {
      result[item.category].active += 1;
    }
    if (!item.active) {
      result[item.category].archived += 1;
    }
  });

  res.json(result);
});

router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const note = notesRepository.getById(id);

  res.json(note);
});

router.post("/", (req: Request, res: Response) => {
  newNoteSchema.validateSync(req.body, { abortEarly: false });
  const { title, category, content } = req.body;
  const note = {
    title,
    category,
    content,
    created: setDate(),
    active: true,
    dates: checkForDates(content),
    id: randomUUID(),
  };
  notesRepository.create(note);
  res.sendStatus(204);
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  notesRepository.delete(id);
  res.sendStatus(204);
});

router.patch("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  updateNoteSchema.validateSync(req.body, { abortEarly: false });

  notesRepository.update(id, req.body);
  res.sendStatus(204);
});

export default router;
