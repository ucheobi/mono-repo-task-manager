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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("@fastify/jwt"));
const fastify_1 = __importDefault(require("fastify"));
const task_route_1 = __importDefault(require("./modules/task/task.route"));
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const fastify = (0, fastify_1.default)({
    logger: {
        transport: {
            target: "pino-pretty"
        }
    }
});
fastify.register(jwt_1.default, {
    secret: "9hQs32aQf017rl8qxfpzl-IkHnzceVFgPD1ejsCecnM"
});
fastify.decorate("authenticate", function (request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield request.jwtVerify();
        }
        catch (error) {
            reply.send();
        }
    });
});
// fastify.addHook("onRequest", async (request, reply) => {
//   try {
//     await request.jwtVerify()
//   } catch (err) {
//     reply.send(err)
//   }
// });
// fastify.register(fCookie, {
//   secret: process.env.COOKIE_SECRET,
//   hook: "preHandler"
// })
fastify.register(user_route_1.default, { prefix: "api/users" });
fastify.register(task_route_1.default, { prefix: "api/tasks" });
fastify.listen({ port: 3000 }, err => {
    if (err)
        throw err;
    console.log("server listening on port 3000");
});
