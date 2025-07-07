import { User } from "../../1-domine/entities/User";
import { AuthenticationError } from "../../errors/AuthenticationError";
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
      throw new AuthenticationError("User not found. Please check your credentials.");
    }

    return user
  }
}
