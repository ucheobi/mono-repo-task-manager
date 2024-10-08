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
exports.UserService = void 0;
const client_1 = require("@prisma/client");
class UserService {
    constructor(prismaClient = new client_1.PrismaClient()) {
        this.prismaClient = prismaClient;
    }
    createAccount(createUserInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, username, password } = createUserInput;
            try {
                const existingUser = yield this.prismaClient.user.findUnique({ where: { email } });
                if (existingUser) {
                    throw new Error("User already exist!");
                }
                const user = yield this.prismaClient.user.create({
                    data: {
                        email,
                        username,
                        password
                    }
                });
                return user;
            }
            catch (error) {
                console.error("Unable to create user");
                throw error;
            }
        });
    }
    findUser(email) {
        const user = this.prismaClient.user.findUnique({
            where: { email },
        });
        return user;
    }
}
exports.UserService = UserService;
