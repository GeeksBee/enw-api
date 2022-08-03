import CreateAdminDto from "../dtos/admin/createAdmin.dto";
import UpdateAdminDto from "../dtos/admin/updateAdmin.dto";
import { User } from "../entities/user.entity";

export interface AdminServiceInterface {
    createAdmin(createAdminInput: CreateAdminDto): Promise<User>;
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User>;
    getByEmail(email: string): Promise<User>;
    updateById(updateAdminInput: UpdateAdminDto, id: number): Promise<User>;
    delete(id: number): Promise<User>;
}
