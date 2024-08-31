import { z } from "zod";

const CreateTask = {
    title: z.string({
        required_error: "Title is required to create a task",
        invalid_type_error: "Title must be a string"
    }),
    description: z.string(), 
    userId: z.number(),
    status: z.string()
}

const CreateTaskPartialResponse = {
    id: z.number(),
}

const CreateTaskResponseSchema = z.object({
    ...CreateTaskPartialResponse,
    ...CreateTask,
})

const CreateTaskSchema = z.object({
    ...CreateTask
})

export type CreateTaskInputType = z.infer<typeof CreateTaskSchema>;
export type CreateTaskResponseSchema = z.infer<typeof CreateTaskResponseSchema>;