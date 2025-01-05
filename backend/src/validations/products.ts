import { z } from "zod"

export const requiredProduct = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    stock: z.number(),
    category: z.string(),
    images: z.array(
        z.object({
            url : z.string()
        })
    )
})