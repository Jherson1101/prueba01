import type { Repository  } from "typeorm";
import { Profesor } from "../database/entities/Profesor";

export type ProfesorInput = Pick<Profesor, "nombre" | "apellido" | "correo">;

export class ProfesorService {
  constructor(
    
    private readonly profesorRepository: Repository<Profesor>) {}

  obtenerTodos(): Promise<Profesor[]> {
    return this.profesorRepository.find();
  }

  obtenerPorId(id: number): Promise<Profesor | null> {
    return this.profesorRepository.findOneBy({ id });
  }

  crear(datos: ProfesorInput): Promise<Profesor> {
    const profesor = this.profesorRepository.create(datos);
    return this.profesorRepository.save(profesor);
  }

  async actualizar(id: number, datos: ProfesorInput): Promise<Profesor | null> {
    const profesor = await this.obtenerPorId(id);
    if (!profesor) {
      return null;
    }

    Object.assign(profesor, datos);
    return this.profesorRepository.save(profesor);
  }

  async eliminar(id: number): Promise<boolean> {
    const resultado = await this.profesorRepository.delete(id);
    return (resultado.affected ?? 0) > 0;
  }
}
