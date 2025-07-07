import bcrypt from "bcrypt"
import { NotFoundError } from "../../errors";
import { IUserRepository } from "../../1-domine/repositories/IUserRepositories";
import { ERROR_MESSAGES } from "../../constants/errorMessages";

export class ResetPasswordUseCase {
    constructor(private userRepo: IUserRepository) {}

    async execute (identifier: string, newPassword: string) {
        const user = await this.userRepo.findOneByEmail(identifier);
        if (!user) {
            throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND)
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        
        await this.userRepo.save(user);
    }    
}