import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/client";


const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

export { prisma };
