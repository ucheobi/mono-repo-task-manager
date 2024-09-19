import { z } from "zod";

const Task = {
    title: z.string({
        required_error: "Title is required to create a task",
        invalid_type_error: "Title must be a string"
    }),
    description: z.string(), 
    userId: z.number(),
    status: z.enum(["todo", "in_progress", "done"]).default("todo")
}

const TaskPartialResponse = {
    id: z.number(),
}

const TaskResponseSchema = z.object({
    ...TaskPartialResponse,
    ...Task,
})

const TaskSchema = z.object({
    ...Task
})

export type TaskInputType = z.infer<typeof TaskSchema>;
export type TaskResponseType = z.infer<typeof TaskResponseSchema>;