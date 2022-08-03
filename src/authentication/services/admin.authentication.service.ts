import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import CreateAdminDto from "src/modules/user/dtos/admin/createAdmin.dto";
import User, { userPrivateFields } from "src/modules/user/entities/user.entity";
import { AdminAuthenticationServiceInterface } from "../interfaces/admin.authentication.service.interface";
import * as bcrypt from "bcrypt";
import { AdminServiceInterface } from "src/modules/user/interfaces/admin.service.interface";
import { omit } from "lodash";
import { PostgresErrorCode } from "src/common/constants";

export default class AdminAuthenticationService implements AdminAuthenticationServiceInterface {
    constructor(
        @Inject("AdminServiceInterface") private readonly adminService: AdminServiceInterface,
    ) {}
    async registerAdmin(createAdminInput: CreateAdminDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createAdminInput.password, 10);
        try {
            const createdUser = await this.adminService.createAdmin({
                ...createAdminInput,
                password: hashedPassword,
            });
            return omit(createdUser, userPrivateFields);
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException(
                    "User with that email already exists",
                    HttpStatus.BAD_REQUEST,
                );
            }
            throw new HttpException("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
