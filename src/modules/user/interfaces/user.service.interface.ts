import CreateUserDto from "../dtos/createUser.dto";
import User from "../entities/user.entity";

export interface UserServiceInterface {
    create(createUserInput: CreateUserDto): Promise<User>;

    getById(id: number): Promise<User>;

    getByEmail(email: string): Promise<User>;

    getByPhone(phone: string): Promise<User>;

    getUserIfRefreshTokenMatches(refreshToken: string, userId: number): Promise<User | null>;
}
