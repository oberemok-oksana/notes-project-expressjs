import { object, string } from "yup";

export const newNoteSchema = object({
  title: string().required().min(2),
  category: string().required(),
  content: string().required().min(3),
}).noUnknown();

export const updateNoteSchema = object({
  title: string().min(2),
  category: string(),
  content: string().min(3),
}).noUnknown();
