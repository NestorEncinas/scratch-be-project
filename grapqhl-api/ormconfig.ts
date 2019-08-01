require("dotenv").config();
import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
  type: "mysql",
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.database,
  synchronize: false,
  logging: false,
  entities: ["server/src/entity/*.ts"],
  migrations: ["server/src/migrations/*.ts"],
  cli: {
    entitiesDir: "server/src/entity",
    migrationsDir: "server/src/migrations"
  }
};

export = config;
