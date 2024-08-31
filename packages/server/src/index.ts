import Fastify from 'fastify';
import taskRoutes from './modules/task/task.route';
import userRoutes from './modules/user/user.route';

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty"
    }
  }
});

fastify.register(userRoutes, {prefix: "api/users"});
fastify.register(taskRoutes, { prefix: "api/tasks"});

fastify.listen({ port: 3000 }, err => {
  if (err) throw err
  console.log("server listening on port 3000")
});