import { FastifyInstance } from "fastify";
import { createTaskHandler, getAllTasksHandlers } from "./task.controller";

const taskRoutes = async (fastify: FastifyInstance) => {
    fastify
        .post("/create-task", createTaskHandler)
        .get("/get-all-tasks", getAllTasksHandlers)
}

export default taskRoutes;