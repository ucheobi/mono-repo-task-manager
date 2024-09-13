import fCookie from "@fastify/cookie";
import fjwt, { FastifyJWT } from "@fastify/jwt";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import taskRoutes from "./modules/task/task.route";
import userRoutes from "./modules/user/user.route";


const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty"
    }
  }
});

fastify.register(fjwt, {
  secret: "9hQs32aQf017rl8qxfpzl-IkHnzceVFgPD1ejsCecnM",
});

fastify.addHook('preHandler', (req, res, next) => {
  req.jwt = fastify.jwt
  return next()
});

fastify.register(fCookie, {
  secret: process.env.COOKIE_SECRET,
  hook: "preHandler"
})

fastify.register(userRoutes, {prefix: "api/users"});
fastify.register(taskRoutes, { prefix: "api/tasks"});

fastify.listen({ port: 3000 }, err => {
  if (err) throw err
  console.log("server listening on port 3000")
});