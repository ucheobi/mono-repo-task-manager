import { FastifyReply, FastifyRequest } from "fastify";
import { TaskService } from "./task.service";
import { CreateTaskInputType } from "./task.schema";

const taskService = new TaskService();

export const createTaskHandler = async (request: FastifyRequest<{Body: CreateTaskInputType}>, reply: FastifyReply) =>  {

    try {
        const newTask = await taskService.createTask(request.body);

        return reply.status(201).send(newTask);
    } catch (error) {
        console.log("An error occured while creating the a task: ", error);
       return reply.status(500).send(error); 
    }
}

export const getAllTasksHandlers = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const tasks = await taskService.getAllTask();

        return tasks;
    } catch (error) {
        console.error("Something went wrong: ", error);
        reply.status(500).send(error);
    }
}