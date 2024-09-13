import { FastifyInstance } from "fastify";
import { signUpHandler, signInHandler, getAllUsersHandlers } from "./user.controller";

const userRoutes = async (fastify: FastifyInstance) => {
    fastify
        .post("/register-user", signUpHandler)
        .post("/signin", await signInHandler)
        .get("/get-all-users", getAllUsersHandlers)
}

export default userRoutes;