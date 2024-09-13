import { PrismaClient } from "@prisma/client";
import { AccountGetAllResponseType, AccountResponseType, CreateAccountInputType } from "./user.schema";

export interface IUserService {
    createAccount: (createAccountInput: CreateAccountInputType) => Promise<AccountResponseType>;
    findUser: (email: string) => AccountResponseType;
    getAllUsers: () => Promise<Array<AccountGetAllResponseType>>;
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

    async getAllUsers(): Promise<Array<AccountGetAllResponseType>> {
        const user = await this.prismaClient.user.findMany({
            select: {
                id:  true,
                email:  true,
                username:  true, 
            }
        })

        return user;
    }
}