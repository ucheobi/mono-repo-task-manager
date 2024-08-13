import Fastify from 'fastify';

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty"
    }
  }
});

fastify.listen({ port: 3000 }, err => {
  if (err) throw err
  console.log("server listening on port 3000")
})