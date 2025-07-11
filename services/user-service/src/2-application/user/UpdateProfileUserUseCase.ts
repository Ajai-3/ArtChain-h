import { User } from "../../1-domine/entities/User";
import { ERROR_MESSAGES } from "../../constants/errorMessages";
import { IUserRepository } from "../../1-domine/repositories/IUserRepositories";
import { ConflictError, NotFoundError, UnauthorizedError } from "../../errors";

export class UpdateProfileUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute( username: string,
    updateData: {
      name?: string;
      username?: string;
      country?: string;
      profileImage?: string;
      bannerImage?: string;
      backgroundImage?: string;
      bio?: string;
    }
  ): Promise<User> {
    const user = await this.userRepo.findOneByUsername(username);
    if (!user) {
      throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    if (updateData.name !== undefined) user.name = updateData.name;

    if (
      updateData.username !== undefined &&
      updateData.username !== user.username
    ) {
      const existingUserByUsername = await this.userRepo.findOneByUsername(
        updateData.username
      );
      if (existingUserByUsername && existingUserByUsername.id !== userId) {
        throw new ConflictError(ERROR_MESSAGES.DUPLICATE_USERNAME);
      }
      user.username = updateData.username;
    }
    if (updateData.country !== undefined) user.country = updateData.country;
    if (updateData.profileImage !== undefined)
      user.profileImage = updateData.profileImage;
    if (updateData.bannerImage !== undefined)
      user.bannerImage = updateData.bannerImage;
    if (updateData.backgroundImage !== undefined)
      user.backgroundImage = updateData.backgroundImage;
    if (updateData.bio !== undefined) user.bio = updateData.bio;

    return this.userRepo.save(user);
  }
}
