import { z } from "zod";

const createTaskSchema = z.object({
    title: z.string({
        required_error: "Title is required to create a task",
        invalid_type_error: "Title must be a string"
    }),
    description: z.string({}), 
    userId: z.number(),
    status: z.string()
})

export type CreateTaskInputProps = z.infer<typeof createTaskSchema>;

