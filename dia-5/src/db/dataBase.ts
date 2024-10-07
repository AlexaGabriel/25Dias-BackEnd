import sqlite3 from "sqlite3";
import { open } from "sqlite";

const newDb = async () => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database,
    });
    try {
        await db.exec(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                quantity INTEGER NOT NULL,
                categories TEXT NOT NULL
            );
        `);
        console.log("Tabela 'products' criada ou atualizada com sucesso.");
    } catch (error) {
        console.error("Erro ao criar a tabela 'products':", error);
    }

    return db;
};

export default newDb;
