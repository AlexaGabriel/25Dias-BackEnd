import {z} from "zod"

const productsSchema = z.object({
    name: z.string().min(1, "o nome do produto é obrigatorio"),
    price: z.number(),
    quantity: z.number().int(),
    categories: z.string(),
})

export default productsSchema