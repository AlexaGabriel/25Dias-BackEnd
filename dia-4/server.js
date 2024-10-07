import Fastify from "fastify"
import cors from "@fastify/cors"
import task from "./src/routes/taskRoutes.js";
import newDb from "./src/db/dataBase.js";

const app = Fastify({
    logger: true
})

app.register(cors, {
    origin: '*', 
});
const db = await newDb();
app.register(task, {db})


const start = async () => {
    try {
      await app.listen({ port: 3000 })
    } catch (err) {
      app.log.error(err)
      process.exit(1)
    }
  }
  start()