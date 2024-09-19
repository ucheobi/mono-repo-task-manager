import { PrismaClient, Status } from "@prisma/client";
import { TaskInputType, TaskResponseType } from "./task.schema";

export interface ITaskService {
    createTask: (createTaskInput: TaskInputType) => Promise<TaskResponseType>;
    getAllTask: () => Promise<TaskResponseType[]>;
    findTask: (id: number) => TaskResponseType | null;
}

export class TaskService implements ITaskService {

    constructor(private prismaClient = new PrismaClient()) {}

    async createTask(taskInput: TaskInputType): Promise<TaskResponseType> {

        try {
            const task = await this.prismaClient.task.create({
                data: {
                    title: taskInput.title,
                    description: taskInput.description,
                    userId: taskInput.userId,
                    //status: Status.todo
                }
            })
            
            return task;
        } catch (error) {
            console.error("Unable to create task")
            throw error;
        }
    }

    async getAllTask(): Promise<TaskResponseType[]> {
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

    findTask(id: number): TaskResponseType | null {
        const tasks = this.prismaClient.task.findUnique({
            where: { id }
        });

        return tasks as unknown as TaskResponseType;
    }

    async disconnect() {
        await this.prismaClient.$disconnect();
    }
} 