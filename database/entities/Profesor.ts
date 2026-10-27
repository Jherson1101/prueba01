import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("profesores")
export class Profesor {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 100 })
  nombre!: string;

  @Column({ type: "varchar", length: 100 })
  apellido!: string;

  @Column({ type: "varchar", length: 255 })
  correo!: string;
}
