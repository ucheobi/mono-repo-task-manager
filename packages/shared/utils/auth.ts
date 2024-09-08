import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashPassword = async (userPassword: string): Promise<string> => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(userPassword, salt);  

    return hashedPassword;
};

export const comparePassword = async (password: string, encryptedPassword: string) => {
    return await bcrypt.compare(password, encryptedPassword);
}