import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export default async function contactRoute(app: FastifyInstance) {
    app.get("/", async(request: FastifyRequest, reply: FastifyReply) => {
        reply.send({message : "rodando"})
    })
}