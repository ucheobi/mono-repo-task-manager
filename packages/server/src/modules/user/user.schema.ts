import { z } from "zod";

const CreateUser = {
    email: z.string({
        required_error: "Email is required"
    }),
    username: z.string(),
    password: z.string({
        required_error: "Password is required"
    })
}

export const CreateUserSchema = z.object({
    ...CreateUser
});

export const CreateUserResponseSchema = z.object({
    id: z.number(),
    ...CreateUser
})

export type CreateUserInputType = z.infer<typeof CreateUserSchema>;
export type CreateUserResponseType = z.infer<typeof CreateUserResponseSchema>;