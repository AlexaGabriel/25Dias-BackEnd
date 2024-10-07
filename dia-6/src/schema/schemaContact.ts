import {z} from "zod"

const schemaContact = z.object({
    id: z.number(),
    name: z.string().min(1, "escreva um nome valido"),
    telephone: z.number().min(8, "digite um número valido"),
    userId: z.number()
})

export default schemaContact