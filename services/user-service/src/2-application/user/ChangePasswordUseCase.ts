import bcrypt from "bcrypt";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../../errors";
import { ERROR_MESSAGES } from "../../constants/errorMessages";
import { IUserRepository } from "../../1-domine/repositories/IUserRepositories";

export class ChangePasswordUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.userRepo.findOneById(userId);
    if (!user) {
      throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const isValid = bcrypt.compareSync(currentPassword, user.password);
    if (!isValid) {
      throw new UnauthorizedError(ERROR_MESSAGES.INCORRECT_CURRENT_PASSWORD);
    }

    const isSamePassword = bcrypt.compareSync(newPassword, user.password);
    if (isSamePassword) {
      throw new BadRequestError(
        ERROR_MESSAGES.NEW_PASSWORD_IS_SAME_AS_CURRENT
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await this.userRepo.save(user);
  }
}
