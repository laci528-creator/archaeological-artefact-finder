import fs from "fs";
import mysql from "mysql2/promise";

const ssl = process.env.DB_SSL_CA_PATH
  ? {
      ca: fs.readFileSync(process.env.DB_SSL_CA_PATH),
      rejectUnauthorized: true,
    }
  : undefined;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ...(ssl && { ssl }),
});

export default pool;