import { User } from "../../domine/entities/User";
import { AuthenticationError } from "../../errors/AuthenticationError";
import { IUserRepository } from "../../domine/repositories/IUserRepositories";

export class StartRegisterUseCase {
    constructor(private userRepo: IUserRepository) {}

    async execute (name: string, username: string, email: string) {
        const normalizedEmail = email.toLocaleLowerCase();
        const existingUser = await this.userRepo.findOneByEmail(normalizedEmail);
        if (existingUser) {
            throw new AuthenticationError("Email already registered.");
        }
        const normalizedUsername = username.toLocaleLowerCase();
        const existingUserByUsername = await this.userRepo.findOneByUsername(normalizedUsername);
        if (existingUserByUsername) {
            throw new AuthenticationError("Username already taken.");
        }
        return {
            name,
            username: normalizedUsername,
            email: normalizedEmail,
        }
    }
}