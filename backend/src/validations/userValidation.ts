import { z } from "zod"

const requiredSignup = z.object({
    name: z.string().min(6).max(30),
    email: z.string().min(6).max(320).email(),
    password: z.string().min(8).max(30),
    phone_no: z.string().min(10).max(10),
    address: z.array(
        z.object({
            street: z.string(),
            country: z.string(),
            state: z.string(),
            area: z.string(),
            landmark: z.string()
        })
    )
});

const requiredSignin = z.object({
    email: z.string().max(320).email(),
    password: z.string().min(8).max(30)

})


const adminSignup = requiredSignup.extend({
    role: z.enum(["admin", "seller"])
})


export { requiredSignup, requiredSignin, adminSignup }