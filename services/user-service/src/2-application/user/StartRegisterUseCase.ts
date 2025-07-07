import { UnauthorizedError } from "../../errors";
import { ERROR_MESSAGES } from "../../constants/errorMessages";
import { IUserRepository } from "../../1-domine/repositories/IUserRepositories";

export class StartRegisterUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(name: string, username: string, email: string) {
    const normalizedEmail = email.toLocaleLowerCase();
    const existingUser = await this.userRepo.findOneByEmail(normalizedEmail);
    if (existingUser) {
      throw new UnauthorizedError(ERROR_MESSAGES.DUPLICATE_EMAIL);
    }
    const normalizedUsername = username.toLocaleLowerCase();
    const existingUserByUsername = await this.userRepo.findOneByUsername(
      normalizedUsername
    );
    if (existingUserByUsername) {
      throw new UnauthorizedError(ERROR_MESSAGES.DUPLICATE_USERNAME);
    }
    return {
      name,
      username: normalizedUsername,
      email: normalizedEmail,
    };
  }
}
