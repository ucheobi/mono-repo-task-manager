"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInInput = exports.AccountResponseSchema = exports.CreateAccountSchema = void 0;
const zod_1 = require("zod");
const BaseAccount = {
    email: zod_1.z.string({
        required_error: "Email is required"
    }),
    username: zod_1.z.string(),
};
exports.CreateAccountSchema = zod_1.z.object(Object.assign(Object.assign({}, BaseAccount), { password: zod_1.z.string().min(6) }));
exports.AccountResponseSchema = zod_1.z.object(Object.assign({ id: zod_1.z.number(), password: zod_1.z.string() }, BaseAccount));
exports.SignInInput = exports.CreateAccountSchema.pick({ email: true, password: true });
