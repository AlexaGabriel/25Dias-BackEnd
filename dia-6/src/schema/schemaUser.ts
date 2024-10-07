import {z} from "zod"

const schemaUser = z.object({
    id: z.number(),
    email: z.string().email("digite um email valido"),
    name: z.string().min(1, "escreva um nome valido"),
    password: z.string().min(8, "sua senha deve ter ao menos 8 caracters")
})

export default schemaUser