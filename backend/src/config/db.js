import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: "./backend/.env" });
const { Pool } = pkg;

if (!process.env.DATABASE_URL) {
 throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({
 connectionString: process.env.DATABASE_URL,

 ssl: {
   rejectUnauthorized: false
 },

 max: 10,
 connectionTimeoutMillis: 25000,
 idleTimeoutMillis: 20000
});

pool.on("connect", () => {
 console.log("Connected to Neon PostgreSQL");
});

pool.on("error", (err) => {
 console.error("Database error:", err.message);
});

export const safeQuery = (text, params) =>
 pool.query(text, params);

export default pool;