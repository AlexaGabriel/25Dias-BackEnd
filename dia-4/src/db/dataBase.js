import sqlite3 from "sqlite3";
import { open } from "sqlite";

const newDb = async () => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database,
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS task (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );
    `);
    
    return db;
};

export default newDb;
