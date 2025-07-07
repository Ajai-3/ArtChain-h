import { User } from "../../1-domine/entities/User";
import { AuthenticationError } from "../../errors/AuthenticationError";
import { IUserRepository } from "../../1-domine/repositories/IUserRepositories";

export class ResetPasswordUseCase {
    constructor(private userRepo: IUserRepository) {}

    async execute (email: string, newPassword: string) {
        const user = await this.userRepo.findOneByEmail(email);
        if (!user) {
            throw new AuthenticationError("User not found.");
        }
    }    
}