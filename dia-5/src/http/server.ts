import Fastify from "fastify";
import cors from "@fastify/cors";
import productsRoutes from "../routes/productsRoutes";
import newDb from '../db/dataBase';

const app = Fastify({
    logger: true
})

app.register(cors, {
    origin:'*',
})


const startServer = async () => {
    try {
        const db = await newDb();
        app.register(productsRoutes, { db });
        await app.listen({ port: 3000 });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};


startServer();
