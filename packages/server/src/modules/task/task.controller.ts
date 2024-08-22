import { FastifyReply, FastifyRequest } from "fastify";
import { TaskService } from "./task.service";
import { CreateTaskInputProps } from "./task.schema";


export const createTaskHandler = async (request: FastifyRequest<{Body: CreateTaskInputProps}>, reply: FastifyReply) =>  {
    const taskService = new TaskService();
    
    const body = request.body;

    try {
        const newTask = await taskService.createTask(body);

        return reply.status(201).send(newTask);
    } catch (error) {
        console.log("An error occured while creating the a task: ", error);
       return reply.status(500).send(error); 
    }
}