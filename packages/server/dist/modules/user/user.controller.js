"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInHandler = exports.signUpHandler = void 0;
const auth_1 = require("shared/utils/auth");
const user_service_1 = require("./user.service");
const userService = new user_service_1.UserService();
const signUpHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = request.body;
    const hashedPassword = yield (0, auth_1.hashPassword)(password);
    try {
        const user = yield userService.createAccount({
            email,
            username,
            password: hashedPassword
        });
        const token = request.jwt.sign({ user });
        return reply.status(201).send({ token });
    }
    catch (error) {
        console.log("An error occured while creating the a new user: ", error);
        return reply.status(500).send(error);
    }
});
exports.signUpHandler = signUpHandler;
const signInHandler = (request, reply) => {
    const { email, password } = request.body;
    const user = userService.findUser(email);
    if (!user) {
        return reply.status(401).send({
            message: "User does not exist!"
        });
    }
    // verify password
    const isMatch = (0, auth_1.comparePassword)(password, user.password);
    if (!isMatch) {
        return reply.send("Email or password is incorrect!");
    }
    return reply.send({ user });
    // const { username, id} = user;
    // const payload = {
    //     id,
    //     email: user.email, 
    //     username
    // };
    // const token = request.jwt.sign(payload);
    // reply.setCookie("access_token", token, {
    //     path: "/",
    //     httpOnly: true,
    //     secure: true
    // });
    // return { accessToken: token };
};
exports.signInHandler = signInHandler;
