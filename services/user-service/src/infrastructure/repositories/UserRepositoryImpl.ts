import { User } from "../../domine/entities/User";
import { IUserRepository } from "../../domine/repositories/IUserRepositories";

export class UserRepositoryImpl implements IUserRepository {
  async findOneByUsername(username: string): Promise<User | undefined> {
    // Implement logic to find a user by their username
    return undefined;
  }
  async findOneByEmail(email: string): Promise<User | undefined> {
    // Implement logic to find a user by their email
    return undefined;
  }
  async create(user: User): Promise<User> {
    // Implement logic to create a new user in the database
    return user;
  }
}
