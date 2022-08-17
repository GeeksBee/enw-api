import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CreateAdminDto from "../dtos/admin/createAdmin.dto";
import User, { UserRole } from "../entities/user.entity";

@Injectable()
export default class AdminService {
    constructor(@InjectRepository(User) protected readonly userRepository: Repository<User>) {}

    public createAdmin(createAdminDto: CreateAdminDto): Promise<User> {
        const admin = this.userRepository.create({ ...createAdminDto, role: UserRole.ADMIN });
        return this.userRepository.save(admin);
    }
}
