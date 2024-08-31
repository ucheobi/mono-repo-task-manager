import { FastifyReply, FastifyRequest } from "fastify";
import { TaskService } from "./task.service";
import { CreateTaskInputType } from "./task.schema";



export const createTaskHandler = async (request: FastifyRequest<{Body: CreateTaskInputType}>, reply: FastifyReply) =>  {
    const taskService = new TaskService();

    try {
        const newTask = await taskService.createTask(request.body);

        return reply.status(201).send(newTask);
    } catch (error) {
        console.log("An error occured while creating the a task: ", error);
       return reply.status(500).send(error); 
    }
}