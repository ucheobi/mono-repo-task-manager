import { PrismaClient } from "@prisma/client";
import { CreateTaskInputType, CreateTaskResponseType } from "./task.schema";

export interface ITaskService {
    createTask: (createTaskInput: CreateTaskInputType) => Promise<CreateTaskResponseType>;
    getAllTask: () => Promise<CreateTaskResponseType[]>
}

export class TaskService implements ITaskService {

    constructor(private prismaClient = new PrismaClient()) {}

    async createTask(createTaskInput: CreateTaskInputType): Promise<CreateTaskResponseType> {
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

    async getAllTask(): Promise<CreateTaskResponseType[]> {
        const tasks = await this.prismaClient.task.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                userId: true,
                status: true,
            }
        });

        return tasks;
    }

    async disconnect() {
        await this.prismaClient.$disconnect();
    }
} 