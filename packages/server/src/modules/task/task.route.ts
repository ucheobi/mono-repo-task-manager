import { FastifyInstance } from "fastify";
import { createTaskHandler, getAllTasksHandlers, getTaskHandler } from "./task.controller";

const taskRoutes = async (fastify: FastifyInstance) => {
    
    fastify.post("/create-task", await createTaskHandler)
    fastify.get("/all-tasks", await getAllTasksHandlers)
    fastify.get("/task/:id", await getTaskHandler)
}

export default taskRoutes;