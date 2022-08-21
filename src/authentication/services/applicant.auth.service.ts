import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import User, { userPrivateFields, UserRole } from "src/modules/user/entities/user.entity";
import * as bcrypt from "bcrypt";
import { omit } from "lodash";
import { PostgresErrorCode } from "src/common/constants";
import ApplicantService from "src/modules/user/services/applicant.service";
import { SendOtpDto } from "../dtos/applicant/sendOtp.dto";

@Injectable()
export default class ApplicantAuthenticationService {
    constructor(private readonly applicantService: ApplicantService) {}
    async registerEmployer(sendOtpDto: SendOtpDto): Promise<User> {
        try {
            const createdUser = await this.applicantService.createApplicant(sendOtpDto);

            return omit(createdUser, userPrivateFields);
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException(
                    "User with that phone already exists",
                    HttpStatus.BAD_REQUEST,
                );
            }
            throw new HttpException("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
