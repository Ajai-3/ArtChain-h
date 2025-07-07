import bcrypt from "bcrypt";
import { User } from "../../1-domine/entities/User";
import { AuthenticationError } from "../../errors/AuthenticationError";
import { IUserRepository } from "../../1-domine/repositories/IUserRepositories";

export class RegisterUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(
    name: string,
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    const normalizedEmail = email.toLowerCase();
    const normalizedUsername = username.toLowerCase();

    const existingUserByUsername = await this.userRepo.findOneByUsername(
      normalizedUsername
    );
    if (existingUserByUsername) {
      throw new AuthenticationError("Username already exists");
    }

    const existingUserByEmail = await this.userRepo.findOneByEmail(
      normalizedEmail
    );
    if (existingUserByEmail) {
      throw new AuthenticationError("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepo.create({
      id: null,
      name,
      email: normalizedEmail,
      username: normalizedUsername,
      phone: "",
      password: hashedPassword,
      isVerified: false,
      profileImage: "",
      bannerImage: "",
      backgroundImage: "",
      bio: "",
      country: "",
      role: "user",
      plan: "free",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return user;
  }
}
