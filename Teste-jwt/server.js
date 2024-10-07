import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';

const app = Fastify({
    logger: true
});

// Configurando o plugin JWT com uma chave secreta
app.register(fastifyJwt, {
  secret: 'supersecret' // Chave secreta para gerar/verificar o token
});

// Rota para gerar um token JWT
app.post('/login', async (request, reply) => {
  const { username, password } = request.body;

  if (username === 'user' && password === 'password') {
    const token = app.jwt.sign({ username });
    reply.send({ token });
  } else {
    reply.status(401).send({ message: 'Credenciais inválidas' });
  }
});

// Middleware para proteger rotas
app.decorate("authenticate", async function(request, reply) {
  try {
    await request.jwtVerify(); // Verifica o token JWT
  } catch (err) {
    reply.send(err); // Envia o erro se o token for inválido
  }
});

// Rota protegida (somente acessível com JWT válido)
app.get('/protected', { preHandler: [app.authenticate] }, async (request, reply) => {
  return { message: `Olá, ${request.user.username}. Você acessou uma rota protegida!` };
});

// Iniciar o servidor
const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log('Servidor rodando na porta 3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
