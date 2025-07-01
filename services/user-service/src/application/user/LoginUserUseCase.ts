import bcrypt from "bcrypt";
import { User } from "../../domine/entities/User";
import { IUserRepository } from "../../domine/repositories/IUserRepositories";

export class LoginUserUseCase {
    constructor(private userRepo: IUserRepository) {}
    async execute(usernameOrEmail:string, password: string): Promise<User> {
        const normalizedInput = usernameOrEmail.toLocaleLowerCase();

        let user = await this.userRepo.findOneByUsername(normalizedInput) 

        if (!user) {
            user = await this.userRepo.findOneByEmail(usernameOrEmail);
        }

        if (!user) {
            throw new Error("Invalid credentials")
        }

        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
            throw new Error("Invalid credentials")
        }

        return user;
    }
}