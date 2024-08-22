import { PrismaClient } from "@prisma/client";
import { title } from "process";
import { CreateTaskInputProps } from "./task.schema";

export interface ITaskService {
    createTask: (createTaskInput: CreateTaskInputProps) => Promise<Task>
}

type Task = {
    id: number;
    title: string;
    description: string; 
    userId: number;
    status: string
}

export class TaskService implements ITaskService {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient();
    }

    async createTask(createTaskInput: CreateTaskInputProps): Promise<Task> {
        const { title, description, userId, status } = createTaskInput;
        try {
            const task = await this.prismaClient.task.create({
                data: {
                    title,
                    description,
                    userId,
                    status
                }
            })
            return task;
        } catch (error) {
            throw new Error("Unable to create task")
        }
    }

    async disconnect() {
        await this.prismaClient.$disconnect();
    }
} 