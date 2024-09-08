import { JWT } from "@fastify/jwt";

declare module 'fastify' {
    export interface FastifyRequest {
        jwt: JWT;
		user: any;
    }

    export interface FastifyInstance {
		authenticate: any;
	}
}

type UserPayload = {
	id: string
	email: string
	username: string
}

declare module '@fastify/jwt' {
	interface FastifyJWT {
		user: UserPayload
	}
}
