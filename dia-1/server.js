import Fastify from "fastify"
import cors from "@fastify/cors";

const app = Fastify({
    logger: true
})
app.register(cors, {
  origin: '*', 
});

app.get('/', async (request, reply) => {
    return { hello: 'Hello world' }
  })
  

const start = async () => {
    try {
      await app.listen({ port: 3000 })
    } catch (err) {
      app.log.error(err)
      process.exit(1)
    }
  }
  start()