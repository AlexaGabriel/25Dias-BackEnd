async function routes(app, options) {
    const db = options.db;  // Acesso à instância do banco de dados

    app.post('/enviar', async (request, reply) => {
        const { name, age } = request.body;

        try {
            const result = await db.run('INSERT INTO users (name, age) VALUES (?, ?)', [name, age]);
            reply.code(201).send({ message: "dados recebidos", result });
        } catch (error) {
            reply.code(500).send({ error: error.message });
        }
    });

    app.delete('/apagar/:id', async (request, reply) => {
        const { id } = request.params;

        try {
            await db.run('DELETE FROM users WHERE id = ?', [id]);
            reply.send({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            reply.code(500).send({ error: error.message });
        }
    });

    app.get('/', async (request, reply) => {
        try {
            const users = await db.all('SELECT * FROM users');
            reply.send(users);
        } catch (error) {
            reply.code(500).send({ error: error.message });
        }
    });
}

export default routes;
