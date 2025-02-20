import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const psql = neon(process.env.NEON_POSTGRES_DATABASE_URL!);
export const db = drizzle({ client: psql });
