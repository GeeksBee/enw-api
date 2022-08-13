import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import CreateAdminDto from "src/modules/user/dtos/admin/createAdmin.dto";
import User, { userPrivateFields } from "src/modules/user/entities/user.entity";
import * as bcrypt from "bcrypt";
import { omit } from "lodash";
import { PostgresErrorCode } from "src/common/constants";
import AdminService from "../../modules/user/services/admin.service";
import RegisterAdminDto from "../dtos/admin/registerAdmin.dto";

@Injectable()
export default class AdminAuthenticationService {
    constructor(private readonly adminService: AdminService) {}
    async registerAdmin(registerAdminInput: RegisterAdminDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(registerAdminInput.password, 10);

        try {
            const createdUser = await this.adminService.createAdmin({
                ...registerAdminInput,
                password: hashedPassword,
                isEmailConfirmed: true,
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
