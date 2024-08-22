import { FastifyInstance } from "fastify";
import { createTaskHandler } from "./task.controller";

const taskRoutes = async (fastify: FastifyInstance) => {
    fastify.post("/create-task", createTaskHandler)
}

export default taskRoutes;