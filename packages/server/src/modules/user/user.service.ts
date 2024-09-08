import { PrismaClient } from "@prisma/client";
import { CreateAccountInputType, AccountResponseType } from "./user.schema";

export interface IUserService {
    createAccount: (createAccountInput: CreateAccountInputType) => Promise<AccountResponseType>;
    findUser: (email: string) => AccountResponseType
}

export class UserService implements IUserService {
    constructor(private prismaClient = new PrismaClient()) {}
    
    async createAccount(createUserInput: CreateAccountInputType): Promise<AccountResponseType> {
        const { email, username, password } = createUserInput;

        try {
            const existingUser = await this.prismaClient.user.findUnique({ where: { email }});

            if(existingUser) {
                throw new Error("User already exist!");
            }

            const user = await this.prismaClient.user.create({
                data: {
                    email,
                    username,
                    password
                }
            });     
            
            return user;
        } catch(error) {
            console.error("Unable to create user")
            throw error;
        }
    }

    findUser(email: string): AccountResponseType {
        const user = this.prismaClient.user.findUnique({
            where: { email },
        });

        return user as unknown as AccountResponseType;
    }
}