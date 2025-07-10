import bcrypt from "bcrypt";
import { ForbiddenError, UnauthorizedError } from "../../errors";
import { User } from "../../1-domine/entities/User";
import { ERROR_MESSAGES } from "../../constants/errorMessages";
import { IUserRepository } from "../../1-domine/repositories/IUserRepositories";

export class LoginUserUseCase {
  constructor(private userRepo: IUserRepository) {}
  async execute(identifier: string, password: string): Promise<User> {
    const normalizedInput = identifier.toLocaleLowerCase();

    let user = await this.userRepo.findOneByUsername(normalizedInput);

    if (!user) {
      user = await this.userRepo.findOneByEmail(normalizedInput);
    }

    if (!user) {
      throw new UnauthorizedError(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    if (user.role !== "user" && user.role !== "artist") {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN)
    }

    if (user.status !== "active") {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }

    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) {
        throw new UnauthorizedError(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    return user;
  }
}
