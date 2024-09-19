import { FastifyReply, FastifyRequest } from "fastify";
import { TaskService } from "./task.service";
import { TaskInputType } from "./task.schema";

const taskService = new TaskService();

export const createTaskHandler = async (request: FastifyRequest<{Body: TaskInputType}>, reply: FastifyReply) =>  {

    try {
        const newTask = await taskService.createTask(request.body);

        return reply.status(201).send(newTask);
    } catch (error) {
        console.log("An error occured while creating the a task: ", error);
       return reply.status(500).send(error); 
    }
}

export const getTaskHandler = async (request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) => {
    const taskId = parseInt(request.params.id, 10)
    const task = await taskService.findTask(taskId);

    if(!task) {
        return reply.status(401).send({
            message: "This task does not exist!"
        })
    }

    return reply.status(200).send({task})
}

export const getAllTasksHandlers = async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
        const tasks = await taskService.getAllTask();

        return reply.status(200).send({tasks});
    } catch (error) {
        console.error("Something went wrong: ", error);
        reply.status(500).send(error);
    }
}