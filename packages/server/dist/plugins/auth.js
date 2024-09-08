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
const fastify_plugin_1 = require("fastify-plugin");
const jwt_1 = __importDefault(require("@fastify/jwt"));
const authPlugin = (fastify, undefined, done) => {
    fastify.register(jwt_1.default, {
        secret: '3ihfeieh90y[49rr8gf832bcuyyf3f8yc83rdcbucd82383r0y9083dfcgoe82'
    });
    fastify.decorate('authenticate', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield request.jwtVerify();
        }
        catch (err) {
            reply.send(err);
        }
    }));
    done();
};
exports.default = (0, fastify_plugin_1.fastifyPlugin)(authPlugin);
