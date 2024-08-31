import  { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "./user.service";
import { CreateUserInputType } from "./user.schema";

export const createUserHandler = async (request: FastifyRequest<{Body: CreateUserInputType}>, reply: FastifyReply) => {
    const userService = new UserService();

    try {
        const user = await userService.createUser(request.body);

        return reply.status(201).send(user);
    } catch (error) {
        console.log("An error occured while creating the a new user: ", error);
       return reply.status(500).send(error); 
    }
}