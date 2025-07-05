import bcrypt from "bcrypt";
import { User } from "../../domine/entities/User";
import { AuthenticationError } from "../../errors/AuthenticationError";
import { IUserRepository } from "../../domine/repositories/IUserRepositories";

export class LoginUserUseCase {
  constructor(private userRepo: IUserRepository) {}
  async execute(identifier: string, password: string): Promise<User> {
    const normalizedInput = identifier.toLocaleLowerCase();

    let user = await this.userRepo.findOneByUsername(normalizedInput);

    if (!user) {
      user = await this.userRepo.findOneByEmail(identifier);
    }

    if (!user) {
      throw new AuthenticationError("Invalid credentials");
    }

    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) {
      throw new AuthenticationError("Invalid credentials");
    }

    return user;
  }
}
