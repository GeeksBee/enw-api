import CreateAdminDto from "../../modules/user/dtos/admin/createAdmin.dto";
import User from "../../modules/user/entities/user.entity";

export interface AdminAuthenticationServiceInterface {
    registerAdmin(data: CreateAdminDto): Promise<User>;
}

export default AdminAuthenticationServiceInterface;
