import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from 'cors'
import { swaggerUi, swaggerSpec } from "./swagger.js";

dotenv.config();

const app = express();

// JSON body parse için
app.use(express.json());
// if frontend and backend url different we have to use cors module
app.use(cors())
//swagger import
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(5001, () => {
    console.log("Server listenin on PORT : 5001");
    console.log("Swagger docs at http://localhost:5001/api-docs");
  });
});
