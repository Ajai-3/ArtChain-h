import { User } from "../../1-domine/entities/User";
import { IAdminRepository } from "../../1-domine/repositories/IAdminRepositories";
import {
  PaginationOptions,
  PaginatedResult,
} from "../../1-domine/common/types";
import { USER_MESSAGES } from "../../constants/userMessages";

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IAdminRepository) {}

  async execute(
    options?: Partial<PaginationOptions>
  ): Promise<PaginatedResult<User>> {
    const { page = 1, limit = 10 } = options || {};

    if (page < 1) throw new Error(USER_MESSAGES.INVALID_PAGE);
    if (limit < 1) throw new Error(USER_MESSAGES.INVALID_LIMIT);

    const result = await this.userRepository.getAllUsers({
      page,
      limit,
      ...options,
    });

    if (page > result.meta.totalPages && result.meta.totalPages > 0) {
      throw new Error(USER_MESSAGES.OUT_OF_RANGE);
    }

    return result;
  }
}
