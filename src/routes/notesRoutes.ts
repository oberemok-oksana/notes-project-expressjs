import express, { Request, Response } from "express";
import notesService from "../services/notesService";
import { findIndexById } from "../helpers/lib";
import notesRepository from "../repositories/notesRepository";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json(notesService.getAll());
});

router.get("/stats", (req: Request, res: Response) => {
  res.json(notesService.getStats());
});

router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const note = notesService.getById(id);

  res.json(note);
});

router.post("/", (req: Request, res: Response) => {
  notesService.create(req.body);
  res.sendStatus(204);
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  notesService.delete(id);
  res.sendStatus(204);
});

router.patch("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  notesService.update(id, req.body);
  res.sendStatus(204);
});

export default router;
