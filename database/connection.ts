import "dotenv/config";
import { DataSource } from "typeorm";
import { Profesor } from "./entities/Profesor";




export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "simulador_cole",
  synchronize: false,
  logging: false,
  entities: [Profesor],
  migrations: []
});
