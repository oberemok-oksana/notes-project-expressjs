import { randomUUID } from "crypto";
import { checkForDates, findIndexById, setDate } from "../helpers/lib";
import notesRepository from "../repositories/notes";
import { NoteType, PartialNoteType } from "../types";
import { newNoteSchema, updateNoteSchema } from "./notesSchema";

class NotesService {
  getAll() {
    return notesRepository.getAll();
  }

  getById(id: string) {
    return notesRepository.getById(id);
  }

  create(data: PartialNoteType) {
    newNoteSchema.validateSync(data, { abortEarly: false });
    const { title, category, content } = data;
    const note = {
      title,
      category,
      content,
      created: setDate(),
      active: true,
      dates: checkForDates(content),
      id: randomUUID(),
    };
    return notesRepository.create(note);
  }

  delete(id: string) {
    return notesRepository.delete(id);
  }

  update(id: string, data: Partial<NoteType>) {
    updateNoteSchema.validateSync(data, { abortEarly: false });
    return notesRepository.update(id, data);
  }

  getStats() {
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
    return result;
  }
}

export default new NotesService();
