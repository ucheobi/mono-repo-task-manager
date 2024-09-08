import { FastifyInstance } from "fastify";
import { signUpHandler, signInHandler } from "./user.controller";

const userRoutes = async (fastify: FastifyInstance) => {
    fastify.post("/register-user", signUpHandler);
    fastify.post("/signin", signInHandler);
}

export default userRoutes;