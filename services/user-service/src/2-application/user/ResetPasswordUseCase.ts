import { NotFoundError } from "../../errors";
import { IUserRepository } from "../../1-domine/repositories/IUserRepositories";
import { ERROR_MESSAGES } from "../../constants/errorMessages";

export class ResetPasswordUseCase {
    constructor(private userRepo: IUserRepository) {}

    async execute (email: string, newpassword: string) {
        const user = await this.userRepo.findOneByEmail(email);
        if (!user) {
            throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND)
        }
    }    
}