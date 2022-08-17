import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CreateEmployerDto from "../dtos/employer/createEmployer.dto";
import User from "../entities/user.entity";

@Injectable()
export default class EmployerService {
    constructor(@InjectRepository(User) protected readonly userRepository: Repository<User>) {}

    public createEmployer(createEmployerDto: CreateEmployerDto): Promise<User> {
        const employer = this.userRepository.create(createEmployerDto);
        return this.userRepository.save(employer);
    }
}
