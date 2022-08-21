import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CreateApplicantDto from "../dtos/applicant/createApplicant.dto";
import User, { UserRole } from "../entities/user.entity";
import { nanoid } from "nanoid";

@Injectable()
export default class ApplicantService {
    constructor(@InjectRepository(User) protected readonly userRepository: Repository<User>) {}

    public createApplicant(createApplicantDto: CreateApplicantDto): Promise<User> {
        const applicant = this.userRepository.create({
            ...createApplicantDto,
            name: `applicant-${nanoid(4)}`,
            role: UserRole.APPLICANT,
        });
        return this.userRepository.save(applicant);
    }
}
