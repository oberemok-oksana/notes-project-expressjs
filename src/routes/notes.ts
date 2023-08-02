import express, { Request, Response } from "express";
import notesRepository from "../repositories/notes";
import { checkForDates, setDate } from "../helpers/lib";
import { randomUUID } from "crypto";

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
  if (note) {
    res.json(note);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req: Request, res: Response) => {
  const noteInputs = req.body;
  const note = {
    ...noteInputs,
    created: setDate(),
    active: true,
    dates: checkForDates(noteInputs.content),
    id: randomUUID(),
  };
  notesRepository.create(note);
  res.sendStatus(204);
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const isSuccess = notesRepository.delete(id);

  if (isSuccess) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

router.patch("/:id", (req: Request, res: Response) => {
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
  const isSuccess = notesRepository.update(id, req.body);

  if (isSuccess) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

export default router;
