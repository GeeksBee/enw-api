import CreateUserDto from "../../modules/user/dtos/createUser.dto";
import User from "../../modules/user/entities/user.entity";

export default interface AuthenticationServiceInterface {
    createUser(createUserInput: CreateUserDto): Promise<User>;
}
