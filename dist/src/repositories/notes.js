"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../helpers/lib");
const notes = [
    {
        title: "Shopping list",
        created: "April 20, 2021",
        category: "Task",
        dates: "",
        content: "Tomatoes, bread",
        id: "1",
        active: true,
    },
    {
        title: "The theory of evolut..",
        created: "	April 27, 2021",
        category: "Random Thought",
        dates: "",
        content: "The evolution",
        id: "2",
        active: true,
    },
    {
        title: "New Feature",
        created: "May 05, 2021",
        category: "Idea",
        content: "Implement new 03/05/2021,to 05/05/2021",
        dates: "03/05/2021, 05/05/2021",
        id: "3",
        active: true,
    },
    {
        title: "William Gaddis",
        created: "May 07, 2021",
        category: "Quote",
        content: "Power doesn't co..",
        dates: "",
        id: "4",
        active: true,
    },
    {
        title: "Books",
        created: "May 15, 2021",
        category: "Task",
        content: "The Lean Startup",
        dates: "",
        id: "5",
        active: true,
    },
    {
        title: "React",
        created: "June 15, 2020",
        category: "Task",
        content: "Learn Components",
        dates: "",
        id: "6",
        active: false,
    },
    {
        title: "Flowers",
        created: "July 07, 2021",
        category: "Idea",
        content: "Plant new ones",
        dates: "",
        id: "7",
        active: false,
    },
];
class NotesRepository {
    getAll() {
        return notes;
    }
    getById(id) {
        return notes.find((item) => item.id === id);
    }
    create(note) {
        notes.push(note);
    }
    update(id, data) {
        const index = (0, lib_1.findIndexById)(id, notes);
        if (index !== -1) {
            notes[index] = Object.assign(Object.assign({}, notes[index]), data);
            return true;
        }
        return false;
    }
    delete(id) {
        const index = (0, lib_1.findIndexById)(id, notes);
        if (index !== -1) {
            notes.splice(index, 1);
            return true;
        }
        return false;
    }
}
const notesRepository = new NotesRepository();
exports.default = notesRepository;
