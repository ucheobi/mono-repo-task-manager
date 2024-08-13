"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify = (0, fastify_1.default)();
// fastify.register(plugin, {
//     host: "localhost",
//     port: 3306,
//     type: "mysql",
//     database: "task_manager",
//     username: "task_user",
//     password: 'taske_secrete_passworde',
//     entities: ["src/entities/*.ts"],
// })
// .ready();
fastify.listen({ port: 3000 }, err => {
    if (err)
        throw err;
    console.log("server listening on port 3000");
});
