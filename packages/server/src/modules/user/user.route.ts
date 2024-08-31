import { FastifyInstance } from "fastify";
import { createUserHandler } from "./user.controller";

const userRoutes = async (fastify: FastifyInstance) => {
    fastify.post("/create-user", createUserHandler)
}

export default userRoutes;