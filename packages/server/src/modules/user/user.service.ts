import { PrismaClient } from "@prisma/client";
import { CreateUserInputType, CreateUserResponseType } from "./user.schema";

export interface IUserService {
    createUser: (createUserInput: CreateUserInputType) => Promise<CreateUserResponseType>;
}

export class UserService implements IUserService {
    constructor(private prismaClient = new PrismaClient()) {}

    async createUser(createUserInput: CreateUserInputType): Promise<CreateUserResponseType> {
        try {
            const user = await this.prismaClient.user.create({
                data: createUserInput
            });
            
            return user;
        } catch(error) {
            console.error("Unable to create user")
            throw error;
        }
    }
}