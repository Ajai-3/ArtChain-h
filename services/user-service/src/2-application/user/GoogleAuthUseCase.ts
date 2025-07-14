import { User } from "../../1-domine/entities/User";
import { IUserRepository } from "../../1-domine/repositories/IUserRepositories";
import { ERROR_MESSAGES } from "../../constants/errorMessages";
import { ForbiddenError } from "../../errors";

export class GoogleAuthUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(email: string, name: string): Promise<{ user: User; isNewUser: boolean }> {
    const normalizedEmail = email.toLowerCase();
    let normalizedUsername = name.trim().toLowerCase().replace(/\s+/g, '_');

    const user = await this.userRepo.findOneByEmail(normalizedEmail);
    const existUserName = await this.userRepo.findOneByUsername(normalizedUsername);

    if (existUserName) {
      normalizedUsername += Math.floor(Math.random() * 1000).toString();
      console.log(normalizedUsername)
    }

    if (!user) {
      const newUser = await this.userRepo.create({
        id: null,
        name,
        email: normalizedEmail,
        username: normalizedUsername,
        phone: "",
        password: "",
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
      return { user: newUser, isNewUser: true };
    }

    if (user.role !== "user" && user.role !== "artist") {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }

    if (user.status !== "active") {
      throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN);
    }

    return { user, isNewUser: false };
  }
}