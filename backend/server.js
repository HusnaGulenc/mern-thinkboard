import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from 'cors'

dotenv.config();

const app = express();

// JSON body parse için
app.use(express.json());

app.use(cors())

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(5001, () => {
    console.log("Server listenin on PORT : 5001");
  });
});
