import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initDb = async () => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database,
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL
        );
    `);
    
    return db;
};

export default initDb;
