// import { IAdminRepository } from "../../1-domine/repositories/IAdminRepositories";
// import { UserStatus } from "../../domine/enums/userStatus.enum";
// import { USER_MESSAGES } from "../../constants/userMessages";

// export class ChangeUserStatusUseCase {
//   constructor(private readonly adminRepository: IAdminRepository) {}

//   async execute(userId: string, status: UserStatus): Promise<User> {
//     const user = await this.adminRepository.findOneById(userId);
    
//     if (!user) {
//       throw new Error(USER_MESSAGES.USER_NOT_FOUND);
//     }

//     if (user.status === status) {
//       throw new Error(USER_MESSAGES.STATUS_ALREADY_SET);
//     }

//     return this.adminRepository.updateUserStatus(userId, status);
//   }
// }