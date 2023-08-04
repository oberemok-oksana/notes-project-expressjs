export type NoteType = {
  title: string;
  created: string;
  category: CategoryType;
  content: string;
  dates: string[];
  active: boolean;
  id: string;
};

export type NoteInputsType = {
  title: string;
  category: CategoryType | "";
  content: string;
};

export type PartialNoteType = {
  title: string;
  category: CategoryType;
  content: string;
};

export type CategoryType = "Task" | "Random Thought" | "Idea" | "Quote";

export type NoteSummaryType = Record<
  CategoryType,
  { active: number; archived: number }
>;
