import 'server-only';

import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
}

const globalForPg = globalThis as typeof globalThis & {
    pgPool?: Pool;
};

const pool =
    globalForPg.pgPool ??
    new Pool({
        connectionString,
    });

if (process.env.NODE_ENV !== "production") {
    globalForPg.pgPool = pool;
}

export default pool;