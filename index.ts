import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./database/connection";
import { crearRutasProfesores } from "./routes/profesores";
import { Profesor } from "./database/entities/Profesor";
import { ProfesorService } from "./services/profesores";
const app = express();
const port = 3001;

app.use(express.json());

async function startServer(): Promise<void> {
  await AppDataSource.initialize();
  console.log("MySQL connection established.");

  const profesorService = new ProfesorService(
    AppDataSource.getRepository(Profesor)
  );
  app.use("/profesores", crearRutasProfesores(profesorService));

  app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
  });
}

startServer().catch((error: unknown) => {
  console.error("Failed to start server:", error);
  process.exitCode = 1;
});
