import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "./entities/user.entity";
import AdminService from "./services/admin.service";
import UserService from "./services/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, AdminService],
    exports: [UserService, AdminService],
})
export class UserModule {}
