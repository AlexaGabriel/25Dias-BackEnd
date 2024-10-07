import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Database } from 'sqlite'; 
import productsSchema from '../schema/schemaProducts';

  interface Product {
    name: string;
    price: number;
    quantity: number;
    categories: string;
  }
  interface Options {
    db: Database; 
}
interface Identifier {
    id: number,
}

export default async function productsRoutes(app: FastifyInstance, options: Options) {
    const { db } = options;
    //Post
    app.post("/add-products", async(request: FastifyRequest, reply : FastifyReply) => {
        const result = productsSchema.safeParse(request.body)
            if (!result.success) {
                const formattedErrors = result.error.format()
                return reply.status(400).send({
                    message:'erro de validação',
                    errors : formattedErrors
                });
            }
          const product: Product = result.data
          try {
            const R = await db.run("INSERT INTO products (name, price, quantity, categories) VALUES (?, ?, ?, ?)", [product.name, product.price, product.quantity, product.categories])
            reply.code(201).send({ message: "dados recebidos", R });
          } catch (error) {
            reply.code(500).send({message: 'Erro ao adicionar produto', error: (error as Error).message})
          }
    })
    //get
    app.get("/", async(request: FastifyRequest, reply : FastifyReply) => {
        try {
            const prods = await db.all('SELECT * FROM products');
            reply.send(prods);
        } catch (error) {
            reply.code(500).send({ error: (error as Error).message || 'Erro desconhecido' });
        }
    })

    app.get("/low-products", async(request: FastifyRequest, reply : FastifyReply) => {
        try {
            const lowProds = await db.all('SELECT * FROM products WHERE quantity < 10');
            reply.send(lowProds);
        } catch (error) {
            reply.code(500).send({ error: (error as Error).message || 'Erro desconhecido' });
        }
    })
    app.get("/products/:categories", async(request: FastifyRequest, reply: FastifyReply) => {
        const {categories} = request.params as Product;
        try {
            const categoriesProduct = await db.all('SELECT * FROM products WHERE categories = ?', [categories])
            reply.send(categoriesProduct)
        } catch (error) {
            reply.code(500).send({error: (error as Error).message})
        }
    })
    //delete
    app.delete("/delete-products/:id", async(request: FastifyRequest, reply : FastifyReply) => {
        const { id } = request.params as Identifier;
        try {
            await db.run('DELETE FROM products WHERE id = ?', [id])
        } catch (error) {
            reply.code(500).send({ error: (error as Error).message });
        }
    })

    //update

    app.put("/edit-products/:id", async(request: FastifyRequest, reply : FastifyReply) => {
        const {id} = request.params as Identifier
        const {name, price, quantity, categories} = request.body as Product
        
        try {
            let edit = db.run('UPDATE products SET name = ?, price = ?, quantity = ?, categories = ? WHERE id = ?', [name, price, quantity, categories, id])
            reply.code(201).send({ message: "dados editados", edit });
        } catch (error) {
            reply.code(500).send({ error: (error as Error).message  });
        }
    })
    
}