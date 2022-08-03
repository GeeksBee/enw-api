import { Inject, Injectable } from "@nestjs/common";
import CreateAdminDto from "../dtos/admin/createAdmin.dto";
import User, { UserRole } from "../entities/user.entity";
import { AdminServiceInterface } from "../interfaces/admin.service.interface";
import { UserRepositoryInterface } from "../interfaces/user.repository.interface";

@Injectable()
export default class AdminService implements AdminServiceInterface {
    constructor(
        @Inject("UserRepositoryInterface") private readonly userRepository: UserRepositoryInterface,
    ) {}
    public createAdmin(createAdminDto: CreateAdminDto): Promise<User> {
        return this.userRepository.create({ createAdminDto, role: UserRole.ADMIN });
    }
    public getAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }
    public getById(id: number): Promise<User> {
        return this.userRepository.findOneById(id);
    }
    public getByEmail(email: string): Promise<User> {
        return this.userRepository.findByCondition({ email });
    }
    public async updateById(data: any, id: number): Promise<User> {
        try {
            const admin = await this.userRepository.findOneById(id);
            if (admin.role === UserRole.SUPERADMIN) {
                throw new Error("Cannot update SUPERADMIN");
            }
            await this.userRepository.update({ ...admin, ...data });
            return admin;
        } catch (error) {
            throw error;
        }
    }
    public async delete(id: number): Promise<User> {
        try {
            const admin = await this.userRepository.findOneById(id);
            if (admin.role === UserRole.SUPERADMIN) {
                throw new Error("Cannot delete SUPERADMIN");
            }
            await this.userRepository.remove(id);
            return admin;
        } catch (error) {
            throw error;
        }
    }
}
