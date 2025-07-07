import { UnauthorizedError } from "../../errors";
import { User } from "../../1-domine/entities/User";
import { ERROR_MESSAGES } from "../../constants/errorMessages";
import { IUserRepository } from "../../1-domine/repositories/IUserRepositories";

export class ForgotPasswordUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(identifier: string): Promise<User> {
    const normalizedInput = identifier.toLocaleLowerCase();

    let user = await this.userRepo.findOneByUsername(normalizedInput);

    if (!user) {
      user = await this.userRepo.findOneByEmail(identifier);
    }

    if (!user) {
      throw new UnauthorizedError(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    return user
  }
}
