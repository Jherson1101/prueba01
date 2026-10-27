import type { Request, Response, NextFunction } from "express";
import type { Profesor } from "../database/entities/Profesor";
import { ProfesorService, type ProfesorInput } from "../services/profesores";

const profesoresFicticios: Profesor[] = [
  { id: 1, nombre: "Ana", apellido: "Martínez", correo: "ana.martinez@example.com" },
  { id: 2, nombre: "Carlos", apellido: "López", correo: "carlos.lopez@example.com" },
  { id: 3, nombre: "Lucía", apellido: "García", correo: "lucia.garcia@example.com" },
  { id: 4, nombre: "Diego", apellido: "Hernández", correo: "diego.hernandez@example.com" },
  { id: 5, nombre: "Sofía", apellido: "Ramírez", correo: "sofia.ramirez@example.com" },
  { id: 6, nombre: "Mateo", apellido: "Torres", correo: "mateo.torres@example.com" },
  { id: 7, nombre: "Valentina", apellido: "Flores", correo: "valentina.flores@example.com" },
  { id: 8, nombre: "Andrés", apellido: "Rivera", correo: "andres.rivera@example.com" },
  { id: 9, nombre: "Camila", apellido: "Cruz", correo: "camila.cruz@example.com" },
  { id: 10, nombre: "Javier", apellido: "Morales", correo: "javier.morales@example.com" }
];

export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  obtenerTodos = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const profesores = await this.profesorService.obtenerTodos();
      response.json(profesores.length > 0 ? profesores : profesoresFicticios);
    } catch (error: unknown) {
      next(error);
    }
  };

  obtenerPorId = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = this.obtenerId(request);
    if (id === null) {
      response.status(400).json({ mensaje: "El id debe ser un entero positivo." });
      return;
    }

    try {
      const profesor = await this.profesorService.obtenerPorId(id);
      if (!profesor) {
        response.status(404).json({ mensaje: "Profesor no encontrado." });
        return;
      }
      response.json(profesor);
    } catch (error: unknown) {
      next(error);
    }
  };

  crear = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    if (!this.esProfesorInput(request.body)) {
      response.status(400).json({
        mensaje: "nombre, apellido y correo son obligatorios y deben ser texto."
      });
      return;
    }

    try {
      const profesor = await this.profesorService.crear(request.body);
      response.status(201).json(profesor);
    } catch (error: unknown) {
      next(error);
    }
  };

  actualizar = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = this.obtenerId(request);
    if (id === null) {
      response.status(400).json({ mensaje: "El id debe ser un entero positivo." });
      return;
    }
    if (!this.esProfesorInput(request.body)) {
      response.status(400).json({
        mensaje: "nombre, apellido y correo son obligatorios y deben ser texto."
      });
      return;
    }

    try {
      const profesor = await this.profesorService.actualizar(id, request.body);
      if (!profesor) {
        response.status(404).json({ mensaje: "Profesor no encontrado." });
        return;
      }
      response.json(profesor);
    } catch (error: unknown) {
      next(error);
    }
  };

  eliminar = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = this.obtenerId(request);
    if (id === null) {
      response.status(400).json({ mensaje: "El id debe ser un entero positivo." });
      return;
    }

    try {
      const eliminado = await this.profesorService.eliminar(id);
      if (!eliminado) {
        response.status(404).json({ mensaje: "Profesor no encontrado." });
        return;
      }
      response.status(204).send();
    } catch (error: unknown) {
      next(error);
    }
  };

  private obtenerId(request: Request): number | null {
    const id = Number(request.params.id);
    return Number.isInteger(id) && id > 0 ? id : null;
  }

  private esProfesorInput(body: unknown): body is ProfesorInput {
    if (body === null || typeof body !== "object") {
      return false;
    }
    const datos = body as Record<string, unknown>;
    return ["nombre", "apellido", "correo"].every(
      (campo) => typeof datos[campo] === "string" && datos[campo].trim().length > 0
    );
  }
}
