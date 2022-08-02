import { Inject, Injectable } from "@nestjs/common";
import CreateUserDto from "./dtos/createUser.dto";
import User from "./entities/user.entity";
import { UserRepositoryInterface } from "./interfaces/user.repository.interface";
import { UserServiceInterface } from "./interfaces/user.service.interface";

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(
        @Inject("UserRepositoryInterface") private readonly userRepository: UserRepositoryInterface,
    ) {}

    public create(createUserInput: CreateUserDto): Promise<User> {
        return this.userRepository.create(createUserInput);
    }

    public getById(id: number): Promise<User> {
        return this.userRepository.findOneById(id);
    }

    public getByEmail(email: string): Promise<User> {
        return this.userRepository.findByCondition({ email });
    }

    public getByPhone(phone: string): Promise<User> {
        return this.userRepository.findByCondition({ phone });
    }

    public getUserIfRefreshTokenMatches(
        refreshToken: string,
        userId: number,
    ): Promise<User | null> {
        return this.userRepository.findOneById(userId);
    }
}

export default UserService;
