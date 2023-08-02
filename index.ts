import express, { Express } from "express";
import dotenv from "dotenv";
import notesRoutes from "./src/routes/notes";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use("/notes", notesRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
