import { Inject, Injectable } from "@nestjs/common";
import CreateUserDto from "src/modules/user/dtos/createUser.dto";
import User from "src/modules/user/entities/user.entity";
import { UserServiceInterface } from "src/modules/user/interfaces/user.service.interface";
import AuthenticationServiceInterface from "./interfaces/authentication.service.interface";

@Injectable()
export default class AuthenticationService implements AuthenticationServiceInterface {
    constructor(
        @Inject("UserServiceInterface") private readonly userService: UserServiceInterface,
    ) {}

    createUser(createUserInput: CreateUserDto): Promise<User> {
        return this.userService.create(createUserInput);
    }
}
