import {  fastifyPlugin } from 'fastify-plugin';
import { FastifyInstance, FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt';

const authPlugin: FastifyPluginCallback = (
  fastify: FastifyInstance,
  undefined,
  done
) => {
  fastify.register(fastifyJwt, {
    secret: '3ihfeieh90y[49rr8gf832bcuyyf3f8yc83rdcbucd82383r0y9083dfcgoe82'
  });

  fastify.decorate('authenticate', async ( 
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  done();
};

export default fastifyPlugin(authPlugin);
