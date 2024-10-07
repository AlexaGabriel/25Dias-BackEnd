import Fastify from "fastify"
import cors from "@fastify/cors";

const app = Fastify({
    logger: true
})

app.register(cors, {
  origin: '*', 
});

let lista = []

const gerarId = () => Math.random().toString(36).substring(2, 9);

app.post('/enviar', async (request, reply) => {
  const {name} = request.body
  const id = gerarId();
  const itemComId = { id, name }; 

  lista.push(itemComId);

  reply.code(201).send({mensages: "dados recebidos", itemComId})
})

app.delete('/apagar/:id', async(request, reply) => {
  const {id} = request.params
  const index = lista.findIndex(u => u.id == id);

  if (index === -1) {
    return reply.code(404).send({ message: 'Usuário não encontrado' });
  }

  lista.splice(index, 1); 
  reply.code(200).send({ message: `Usuário com ID ${id} deletado com sucesso` });
})
  
app.get('/', async (request, reply) => {
  return lista
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