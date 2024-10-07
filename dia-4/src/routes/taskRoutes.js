async function task(app, options) {
    const db = options.db; 

    //post 
    app.post("/taskAdd", async (request, reply) => {
        const {name} = request.body

        try {
            const result = await db.run("INSERT INTO task (name) VALUES (?)", [name])
            reply.code(201).send({ message: "dados recebidos", result });
        } catch (error) {
            reply.code(500).send({ error: error.message });
        }
    })

    //get
    app.get('/task', async(request, reply) => {
        try {
            const tasks = await db.all('SELECT * FROM task');
            reply.send(tasks);
        } catch (error) {
            reply.code(500).send({ error: error.message });
        }
    })
    //delete
    app.delete('/taskDelet/:id', async(request, reply) => {
        const {id} = request.params
        try {
            await db.run('DELETE FROM task WHERE id = ?', [id])
            reply.code(204).send();
        } catch (error) {
            reply.code(500).send({ error: error.message });
        }
    })
    app.put('/taskUpdate/:id', async(request, reply) => {
        const {id} = request.params
        const {name} = request.body
        
        try {
            let edit = db.run('UPDATE task SET name = ? WHERE id = ?', [name, id])
            reply.code(201).send({ message: "dados editados", edit });
        } catch (error) {
            reply.code(500).send({ error: error.message });
        }
    })
}
export default task