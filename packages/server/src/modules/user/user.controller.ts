import { comparePassword, hashPassword } from "shared/utils/auth";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateAccountInputType, SignInInputType } from "./user.schema";
import { UserService } from "./user.service";

const userService = new UserService();

export const signUpHandler = async (request: FastifyRequest<{Body: CreateAccountInputType}>, reply: FastifyReply) => {
    
    const { email,username, password } = request.body;

    const hashedPassword = await hashPassword(password);
    try {
        const user = await userService.createAccount({
            email,
            username,
            password: hashedPassword
        });


        return reply.status(201).send({ user });
    } catch (error) {
        console.log("An error occured while creating the a new user: ", error);
       return reply.status(500).send(error); 
    }
}

export const signInHandler = (request: FastifyRequest<{Body: SignInInputType}>, reply: FastifyReply) => {
    const { email, password } = request.body;

    const user = userService.findUser(email);

    if(!user) {
        return reply.status(401).send({
            message: "User does not exist!"
        })
    }

    // verify password
    const isMatch = comparePassword(password, user.password);

    if (!isMatch) {
        return reply.send("Email or password is incorrect!");
    }

    const { username, id} = user;

    const payload = {
        id,
        email: user.email, 
        username
    };

    const token = request.jwt.sign(payload);

    reply.setCookie("access_token", token, {
        path: "/",
        httpOnly: true,
        secure: true
    });

    return { accessToken: token };
}