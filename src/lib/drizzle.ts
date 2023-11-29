import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString as string);
const db = drizzle(client);

export default db;
