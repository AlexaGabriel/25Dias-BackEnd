import Fastify from "fastify";
import Cors from "@fastify/cors";
import userRoute from "../routes/userRoute";

const app = Fastify({
    logger: true
})

app.register(Cors, {
    origin: "*",
})

app.register(userRoute)

const startServer = async () => {
    try {
        await app.listen({ port: 3000 });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};


startServer();