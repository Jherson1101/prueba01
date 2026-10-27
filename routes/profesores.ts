import { Router } from "express";
import { ProfesorController } from "../controller/profesores";
import { ProfesorService } from "../services/profesores";

export function crearRutasProfesores(profesorService: ProfesorService): Router {
  const router = Router();
  const controller = new ProfesorController(profesorService);
  router.get("/", controller.obtenerTodos);
  router.get("/:id", controller.obtenerPorId);
  router.post("/", controller.crear);
  router.put("/:id", controller.actualizar);
  router.delete("/:id", controller.eliminar);

  return router;
}
