import { User } from "../../user/entities/User";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findOneByUsername(username: string): Promise<User | undefined>;
  findOneByEmail(email: string): Promise<User | undefined>;
}
