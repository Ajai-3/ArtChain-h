import bcrypt from "bcrypt";
import { IUserRepository } from "../../domine/repositories/IUserRepositories";

export class RegisterUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(
    name: string,
    username: string,
    email: string,
    password: string
  ) {
    const existingUserByUsername = await this.userRepo.findOneByUsername(
      username
    );
    if (existingUserByUsername) {
      throw new Error("Username already exists");
    }

    const existingUserByEmail = await this.userRepo.findOneByEmail(email);
    if (existingUserByEmail) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepo.create({
      name,
      username,
      email,
      phone: "",
      password: hashedPassword,
      isVerified: false,
      profileImage: "",
      bannerImage: "",
      backroundImage: "",
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
