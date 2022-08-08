import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CreateAdminDto from "../dtos/admin/createAdmin.dto";
import User, { UserRole } from "../entities/user.entity";

import UserService from "./user.service";

@Injectable()
export default class AdminService extends UserService {
    constructor(@InjectRepository(User) protected readonly userRepository: Repository<User>) {
        super(userRepository);
    }

    public createAdmin(createAdminDto: CreateAdminDto): Promise<User> {
        console.log(createAdminDto);
        const admin = this.userRepository.create({ ...createAdminDto, role: UserRole.ADMIN });
        return this.userRepository.save(admin);
    }
}
