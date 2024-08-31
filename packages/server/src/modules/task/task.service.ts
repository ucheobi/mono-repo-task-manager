import { PrismaClient } from "@prisma/client";
import { CreateTaskInputType, CreateTaskResponseSchema } from "./task.schema";

export interface ITaskService {
    createTask: (createTaskInput: CreateTaskInputType) => Promise<CreateTaskResponseSchema>;
}

export class TaskService implements ITaskService {

    constructor(private prismaClient = new PrismaClient()) {}

    async createTask(createTaskInput: CreateTaskInputType): Promise<CreateTaskResponseSchema> {
        console.log(createTaskInput)
        try {
            const task = await this.prismaClient.task.create({
                data: createTaskInput
            })
            return task;
        } catch (error) {
            console.error("Unable to create task")
            throw error;
        }
    }

    async disconnect() {
        await this.prismaClient.$disconnect();
    }
} 