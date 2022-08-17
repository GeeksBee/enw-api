import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import User, { userPrivateFields, UserRole } from "src/modules/user/entities/user.entity";
import * as bcrypt from "bcrypt";
import { omit } from "lodash";
import { PostgresErrorCode } from "src/common/constants";
import RequestSignUPDto from "../dtos/employer/requestSignUp.dto";
import EmployerService from "src/modules/user/services/employer.service";

@Injectable()
export default class EmployerAuthenticationService {
    constructor(private readonly employerService: EmployerService) {}
    async registerEmployer(requestSignUPInput: RequestSignUPDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(requestSignUPInput.password, 10);

        try {
            const createdUser = await this.employerService.createEmployer({
                ...requestSignUPInput,
                password: hashedPassword,
                role: UserRole.EMPLOYER,
            });

            return omit(createdUser, userPrivateFields);
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException(
                    "User with that email already exists",
                    HttpStatus.BAD_REQUEST,
                );
            }
            console.log(error.message);
            throw new HttpException("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
