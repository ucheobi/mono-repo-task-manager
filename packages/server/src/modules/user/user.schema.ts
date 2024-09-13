import { z } from "zod";

const BaseAccount = {
    email: z.string({
        required_error: "Email is required"
    }),
    username: z.string(),
}

export const CreateAccountSchema = z.object({
    ...BaseAccount,
    password: z.string().min(6),
});

export const AccountResponseSchema = z.object({
    id: z.number(),
    password: z.string(),
    ...BaseAccount
});

export const AccountGetAllResponse = AccountResponseSchema.omit({
    password: true
})

export const SignInInput = CreateAccountSchema.pick({ email: true, password: true });

export type CreateAccountInputType = z.infer<typeof CreateAccountSchema>;
export type AccountResponseType = z.infer<typeof AccountResponseSchema> | null;
export type SignInInputType = z.infer<typeof SignInInput>;
export type AccountGetAllResponseType = z.infer<typeof AccountGetAllResponse>;