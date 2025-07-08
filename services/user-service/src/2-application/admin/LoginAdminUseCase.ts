import bcrypt from "bcrypt";
import { UnauthorizedError } from "../../errors";
import { User } from "../../1-domine/entities/User";
import { ERROR_MESSAGES } from "../../constants/errorMessages";
import { IAdminRepository } from './../../1-domine/repositories/IAdminRepositories';

export class LoginAdminUseCase {
    constructor(private adminRepo: IAdminRepository) {}

    async execute(identifier: string, password: string): Promise<User> {
        const normalizedInput = identifier.toLowerCase();

        let admin = await this.adminRepo.findOneByUsername(normalizedInput);
        if (!admin) {
            admin = await this.adminRepo.findOneByEmail(normalizedInput);
        }

        if (!admin) {
            throw new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED);
        }

        if (admin.role !== "admin") {
            throw new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED);
        }

        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) {
            throw new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED);
        }

        return admin;
    }
}