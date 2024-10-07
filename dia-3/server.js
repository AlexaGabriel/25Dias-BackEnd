import Fastify from "fastify"
import cors from "@fastify/cors";
import routes from "./src/routes.js";
import initDb from "./src/dataBase.js";

const app = Fastify({
    logger: true
})

app.register(cors, {
  origin: '*', 
});
const db = await initDb();
app.register(routes, {db})


const start = async () => {
    try {
      await app.listen({ port: 3000 })
    } catch (err) {
      app.log.error(err)
      process.exit(1)
    }
  }
  start()